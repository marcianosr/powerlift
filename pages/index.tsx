import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/client";
import LiftsForm from "../components/LiftsForm";
import LaneContainer from "../components/LaneContainer";
import DateLine from "../components/DateLine";
import fetch from "node-fetch";
import { UserLiftsResponse } from "../types";

export type LiftsProps = {
	users: UserLiftsResponse;
};

const Home: NextPage<LiftsProps> = ({ users }) => {
	const [session, loading] = useSession();

	return (
		<>
			<main style={{ maxWidth: "1200px" }}>
				<h1>Powerlift gymboard</h1>
				<DateLine />
				<LaneContainer users={users} />
				<LiftsForm />
			</main>
		</>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req: req }); // look into the req, gets the session cookie en checks if it is valid

	if (!session) {
		return {
			redirect: {
				destination: "/signup",
				permanent: false, // Only this time, because the user is not logged in.
			},
		};
	}

	const response = await fetch("http://localhost:3000/api/lift/get-lifts", {
		headers: {
			Cookie: req.headers.cookie || "",
		},
	});

	const userLifts = (await response.json()) as LiftsResponse;

	return {
		props: { users: userLifts.data },
	};
};
