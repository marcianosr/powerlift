import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") return; // code below should not execute on e.g GET requests

	const data = req.body;
	const { email, displayName, weightClass, club, password } = data;
	const mandatoryFields = ["email", "displayName", "weightClass", "password"];

	const invalidFields = mandatoryFields.filter((key) => !data[key] && key);

	console.log("invalidFields", invalidFields);

	if (invalidFields.length > 0)
		return res.status(422).json({
			message: "Form fields empty.",
			fields: invalidFields,
		});

	const client = await connect();
	const db = client.db();

	const userExists = await db.collection("users").findOne({ email: email }); // Search for the email key field with the email value (value = from the input)

	if (userExists) {
		res.status(422).json({ message: "User exists" });
		client.close();
		return;
	}

	const result = await db.collection("users").insertOne({
		email,
		displayName,
		weightClass,
		club,
		password: await hashPassword(password),
	});

	// Do some error handling for mongoDB
	client.close();

	return res
		.status(201)
		.json({ message: `User ${email} is created succesfully!` });
};

export default handler;
