import { format } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { connect } from "../../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") return;

	const session = await getSession({ req }); // Look into the request if session tokken cookie is part of the request

	if (!session) {
		// Protect api requests for people not logged in
		res.status(401).json({ message: "Not authenticated." });
		return;
	}

	const email = session.user?.email;

	const client = await connect();
	const usersCollection = await client.db().collection("users");
	const user = await usersCollection.findOne({ email });

	if (!user) {
		res.status(404).json({ message: "User not found." });
		client.close();
	}

	const liftsCollections = await client.db().collection("lifts");
	const today = format(new Date(), "dd/MM/yyyy");

	// Get the last updated lifts.
	const lifts = await liftsCollections
		.find({
			date: today,
		})
		.toArray();

	const sortedLifts = [...lifts];

	sortedLifts.sort((a, b) => {
		const dateA = new Date(a.dateTime);
		const dateB = new Date(b.dateTime);
		return dateA > dateB ? 1 : -1;
	});

	client.close();

	return res
		.status(201)
		.json({ message: `Succesfully fetched lifts`, data: sortedLifts });
};

export default handler;
