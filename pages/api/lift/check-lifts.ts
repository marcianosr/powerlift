import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { format, parse } from "date-fns";
import { connect } from "../../../lib/db";
import { nl } from "date-fns/locale";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") return;

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
	const parsedDate = parse(req.body, "P", new Date(), { locale: nl }); // Refactor this in a reusable piece

	const formattedIncomingDate = format(new Date(parsedDate), "dd-MM-yyyy");
	const hasResultAlready = await liftsCollections.findOne({
		email,
		date: formattedIncomingDate, // => Should be the date of route request
	});

	console.log("hasResultAlready", hasResultAlready);
	if (hasResultAlready) {
		client.close();

		return res.status(201).json({
			message: "Already submitted lifts today.",
			lifts: hasResultAlready,
			submitted: true,
		});
	}

	client.close();

	return res
		.status(201)
		.json({ message: `Lifts can be added today`, submitted: false });
};

export default handler;
