import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { format } from "date-fns";
import { connect } from "../../../lib/db";

type ValidationRules = {
	squat: { min: number; max: number };
	benchpress: { min: number; max: number };
	deadlift: { min: number; max: number };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") return;

	const session = await getSession({ req }); // Look into the request if session tokken cookie is part of the request

	if (!session) {
		// Protect api requests for people not logged in
		res.status(401).json({ message: "Not authenticated." });
		return;
	}

	const email = session.user?.email;
	const displayName = session.user?.displayName;
	const weightClass = session.user?.weightClass;
	const club = session.user?.club;

	const client = await connect();
	const usersCollection = await client.db().collection("users");
	const user = await usersCollection.findOne({ email });

	if (!user) {
		res.status(404).json({ message: "User not found." });
		client.close();
		return;
	}

	const liftsCollections = await client.db().collection("lifts");

	const data = req.body;
	const { lifts } = data;
	const today = format(new Date(), "dd/MM/yyyy");
	const dateTime = format(new Date(), "HH:mm:ss");
	const milliseconds = new Date();

	const excersiseKeys = Object.keys(lifts);
	const requiredFields = ["weight", "sets", "reps"];

	const VALIDATION_RULES: ValidationRules = {
		squat: { min: 20, max: Math.ceil(+weightClass * 3.5) },
		benchpress: { min: 20, max: Math.ceil(+weightClass * 2.5) },
		deadlift: { min: 30, max: Math.ceil(+weightClass * 3.75) },
	};

	//////////////////////////////////
	// Simplify these two monstrosities later
	const mappedInputFieldsToBoolean = excersiseKeys.map((excersise) =>
		requiredFields.map((field) => {
			if (lifts[excersise][field] !== null) {
				return true;
			}

			return false;
		})
	);
	//
	//
	const validatedInputFields = mappedInputFieldsToBoolean.map((fields) => {
		const isEveryFieldValid = fields.every((f) => f);
		const areSomeFieldsValid = fields.some((f) => f);

		if (!isEveryFieldValid && areSomeFieldsValid) {
			return false;
		}

		if (isEveryFieldValid) {
			return true;
		}
	});
	// The end
	//////////////////////////////////

	const isInvalid = validatedInputFields.includes(false);

	console.log("isInvalid", isInvalid);

	if (isInvalid) {
		client.close();
		return res.status(422).json({
			message: "EMPTY",
			fields: excersiseKeys
				.map((excersise) => {
					return requiredFields.map((field) => {
						return lifts[excersise][field] === null
							? `${excersise}:${field}`
							: null;
					});
				})
				.flat(),
		});
	}

	const validateWeights = Object.entries(lifts).map(([key, value]) => {
		if (
			value.weight >= VALIDATION_RULES[key].max ||
			(value.weight && value.weight <= VALIDATION_RULES[key].min)
		) {
			return false;
		}
	});

	if (!isInvalid && validateWeights.includes(false)) {
		return res.status(422).json({
			message: "NEEDS_CONFIRMATION",
			fields: Object.entries(lifts)
				.map(([key, value]) => {
					return value.weight >= VALIDATION_RULES[key].max ||
						(value.weight &&
							value.weight <= VALIDATION_RULES[key].min)
						? key
						: null;
				})
				.filter((f) => f !== null),
		});
	}

	const recordFound = await liftsCollections.findOne({ email, date: today });

	if (recordFound) {
		const result = await liftsCollections.updateOne(
			{ email, date: today },
			{
				$set: {
					lifts: {
						...recordFound.lifts,
						...lifts,
					},
				},
			},
			{
				upsert: true,
			}
		);

		return res.status(201).json({ message: `UPDATE_SUCCES` });
	}

	const result = await liftsCollections.insertOne({
		email,
		displayName,
		weightClass,
		club,
		lifts: {
			...lifts,
		},
		date: today,
		dateTime,
		milliseconds,
	});

	client.close();

	return res.status(201).json({ message: `ADD_SUCCES` });
};

export default handler;
