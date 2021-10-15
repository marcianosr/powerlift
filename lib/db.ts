import { MongoClient } from "mongodb";
require("dotenv").config();

export const connect = async () => {
	const client = await MongoClient.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uwbaj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
	);
	return client;
};
