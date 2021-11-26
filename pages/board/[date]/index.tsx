import React, { FC } from "react";
import format from "date-fns/format";
import { getSession } from "next-auth/client";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { GetServerSideProps } from "next";
import Wrapper from "../../../components/LaneContainer/Wrapper";
import { getLiftsFromUsers } from "../..";
import { useRouter } from "next/router";
import { isValid, parse } from "date-fns";
import { nl } from "date-fns/locale";

type BoardOverviewProps = {
	cookie: string;
	date: string;
};

const BoardOverview: FC<BoardOverviewProps> = ({ cookie, date }) => {
	const { isReady } = useRouter();

	const { data, error, status, isLoading, isFetching } = useQuery(
		"users",
		() => getLiftsFromUsers(cookie, date),
		{
			onSuccess: (data) => console.log("data fetched", data),
			onError: (error) => console.log("error:", error),

			enabled: isReady,
		}
	);

	return <>{data && <Wrapper status={status} data={data} date={date} />}</>;
};

export default BoardOverview;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const session = await getSession({ req: req }); // look into the req, gets the session cookie en checks if it is valid
	const cookie = req.headers.cookie;
	const date = query.date as string;

	if (!session) {
		return {
			redirect: {
				destination: "/signup",
				permanent: false, // Only this time, because the user is not logged in.
			},
		};
	}

	const parsedDate = date && parse(date, "P", new Date(), { locale: nl });
	const today = new Date();
	const formattedToday = format(today, "dd-MM-yyyy");
	const isInputDateValid = isValid(parsedDate); // if false, redirect to today.

	if (!isInputDateValid) {
		return {
			redirect: {
				destination: `/board/${formattedToday}`,
				permanent: false,
			},
		};
	}
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery("users", async () =>
		getLiftsFromUsers(cookie, date)
	);

	return {
		props: { dehydratedState: dehydrate(queryClient), cookie, date },
	};
};
