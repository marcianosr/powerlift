import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { format } from "date-fns";
import { connect } from "../../../lib/db";

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

	const client = await connect();
	const usersCollection = await client.db().collection("users");
	const user = await usersCollection.findOne({ email });

	if (!user) {
		res.status(404).json({ message: "User not found." });
		client.close();
	}

	const liftsCollections = await client.db().collection("lifts");

	const data = req.body;
	const { lifts } = data;
	const today = format(new Date(), "dd/MM/yyyy");

	const excersiseKeys = Object.keys(lifts);
	const requiredFields = ["weight", "sets", "reps"];

	if (excersiseKeys.length === 0)
		return res.status(422).json({ message: "Form fields empty" });

	const fields = Object.values(lifts)
		.map((lift) =>
			requiredFields.map((field) => Object.keys(lift).includes(field))
		)
		.flat();

	const isNotValid = fields.includes(false);

	if (isNotValid)
		return res.status(422).json({ message: "Form fields empty" });

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

		return res.status(201).json({ message: `Lifts updated succesfully!` });
	}

	const result = await liftsCollections.insertOne({
		email,
		displayName,
		lifts: {
			squat: lifts.squat,
			benchpress: lifts.benchpress,
			deadlift: lifts.deadlift,
		},
		date: today,
	});

	client.close();

	return res.status(201).json({ message: `Lifts added succesfully!` });
};

export default handler;
