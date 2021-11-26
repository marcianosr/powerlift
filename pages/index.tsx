import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/client";
import { UserResponse } from "../types";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Wrapper from "../components/LaneContainer/Wrapper";
import { getLiftsFromUsers } from "../api";

export type LiftsProps = {
	users: UserResponse[];
	cookie: string;
};

const Home: NextPage<LiftsProps> = ({ cookie }) => {
	const [session, loading] = useSession();
	const { data, status } = useQuery(
		"users",
		() => getLiftsFromUsers(cookie),
		{
			onSuccess: () => console.log("data fetched"),
			onError: (e) => console.log("error:", e),
		}
	);

	return <>{data && <Wrapper data={data} status={status} />}</>;
};

export default Home;

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
