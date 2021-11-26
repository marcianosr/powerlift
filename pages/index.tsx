import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/client";
import { UserResponse } from "../types";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Wrapper from "../components/LaneContainer/Wrapper";
import { format, parse, isValid } from "date-fns";
import { nl } from "date-fns/locale";

export type LiftsProps = {
	users: UserResponse[];
	cookie: string;
};

const Home: NextPage<LiftsProps> = ({ cookie }) => {
	const [session, loading] = useSession();
	const { data, error, status, isLoading, isFetching } = useQuery(
		"users",
		() => getLiftsFromUsers(cookie),
		{
			onSuccess: () => console.log("data fetched"),
			onError: (e) => console.log("error:", e),
		}
	);

	return (
		<>
			<main style={{ maxWidth: "1200px", marginTop: "5rem" }}>
				{data && <Wrapper data={data} status={status} />}
			</main>
		</>
	);
};

export default Home;

export const getLiftsFromUsers = async (
	cookie: string | undefined,
	date?: string
) => {
	const today = new Date();
	const formattedTodaysDate = format(today, "dd-MM-yyyy");

	const response = await fetch("http://localhost:3000/api/lift/get-lifts", {
		headers: {
			Cookie: cookie || "",
			"Content-Type": "application/json",
		},
		method: "POST",
		body: date ? JSON.stringify(date) : JSON.stringify(formattedTodaysDate),
	});

	if (!response.ok) {
		const error = await response.json();
	}
	const result = (await response.json()) as UserResponse;

	// console.log("result", result);

	return result.data;
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
