import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connect } from "../../../lib/db";

const changePassword = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "PATCH") return;

	const session = await getSession({ req }); // Look into the request if session tokken cookie is part of the request

	if (!session) {
		// Protect api requests for people not logged in
		res.status(401).json({ message: "Not authenticated." });
		return;
	}

	const email = session.user?.email;
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;

	const client = await connect();
	const usersCollection = await client.db().collection("users");
	const user = await usersCollection.findOne({ email });

	if (!user) {
		res.status(404).json({ message: "User not found." });
		client.close();
	}

	const currentPassword = user?.password;

	const passwordsAreEqual = await verifyPassword(
		oldPassword,
		currentPassword
	);

	if (!passwordsAreEqual) {
		res.status(403).json({
			message:
				"You are authenticated, but not authorized to perform this action.",
		});

		client.close();
		return;
	}
	const newHashedPassword = await hashPassword(newPassword);
	const result = await usersCollection.updateOne(
		{ email },
		{ $set: { password: newHashedPassword } }
	);

	// Do some error handling

	client.close();
	res.status(200).json({ message: "Password updated!" });
};

export default changePassword;
