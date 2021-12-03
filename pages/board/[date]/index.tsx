import React, { FC } from "react";
import format from "date-fns/format";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { GetServerSideProps } from "next";
import Wrapper from "../../../components/LaneContainer/Wrapper";
import { useRouter } from "next/router";
import { isValid, parse } from "date-fns";
import { nl } from "date-fns/locale";
import { getLiftsFromUsers } from "../../../api";
import { useSession } from "next-auth/client";

type BoardOverviewProps = {
	cookie: string;
	date: string;
};

const BoardOverview: FC<BoardOverviewProps> = ({ cookie, date }) => {
	const { isReady } = useRouter();
	const [session] = useSession();

	const { data, error, status, isLoading, isFetching } = useQuery(
		"users",
		() => getLiftsFromUsers(cookie, date),
		{
			onSuccess: (data) => console.log("data fetched", data),
			onError: (error) => console.log("error:", error),

			enabled: isReady,
		}
	);

	// The order of this and the query above goes against the react hooks rules @ TODO
	if (!session) {
		return (
			<p>Om de lifts per dag te kijken moet je een account aanmaken!</p>
		);
	}

	return (
		<>
			{isLoading && <p>Haalt zware lifts op...</p>}
			{data && <Wrapper status={status} data={data} date={date} />}
		</>
	);
};

export default BoardOverview;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const cookie = req.headers.cookie;
	const date = query.date as string; // the source of evil

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
