import React, { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/client";
import LiftsFormContainer from "../components/LiftsFormContainer";
import LaneContainer from "../components/LaneContainer";
import { UserResponse } from "../types";
import LaneHeader from "../components/LaneHeader";
import { dehydrate, QueryClient, useQuery } from "react-query";

export type LiftsProps = {
	users: UserResponse[];
	cookie: string;
};

const Home: NextPage<LiftsProps> = ({ cookie, ...rest }) => {
	const [session, loading] = useSession();
	const [showModal, setShowModal] = useState(false);
	const { data, error, status, isLoading, isFetching } = useQuery(
		"users",
		() => getLiftsFromUsers(cookie),
		{
			onSuccess: () => console.log("data fetched"),
			onError: (e) => console.log("error:", e),
		}
	);

	console.log({ isFetching, isLoading });

	return (
		<>
			<main style={{ maxWidth: "1200px", marginTop: "5rem" }}>
				<LaneHeader setShowModal={setShowModal} />
				{status === "loading" && <p>Loading...</p>}
				{status === "success" && <LaneContainer users={data} />}
				<LiftsFormContainer
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			</main>
		</>
	);
};

export default Home;

export const getLiftsFromUsers = async (cookie: string | undefined) => {
	const response = await fetch("api/lift/get-lifts", {
		headers: {
			Cookie: cookie || "",
		},
	});

	const userLifts = (await response.json()) as UserResponse;

	return userLifts.data;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req: req }); // look into the req, gets the session cookie en checks if it is valid
	const cookie = req.headers.cookie;

	if (!session) {
		return {
			redirect: {
				destination: "/signup",
				permanent: false, // Only this time, because the user is not logged in.
			},
		};
	}

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery("users", async () =>
		getLiftsFromUsers(cookie)
	);

	return {
		props: { dehydratedState: dehydrate(queryClient), cookie },
	};
};
