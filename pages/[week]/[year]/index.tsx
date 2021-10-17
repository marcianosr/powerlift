import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import path from "path";
import fs from "fs/promises";
import BoardHeader from "../../../components/BoardHeader";
import MemberList from "../../../components/MemberList";
import { GymData } from "../../../types";
import styles from "../styles.module.css";
import { getSession, useSession } from "next-auth/client";
import Link from "next/link";

const WeekOverview: React.FC<GymData> = ({ data }) => {
	const [session, loading] = useSession();

	if (loading) {
		return <p>loading...</p>;
	}

	if (!session?.user) {
		return (
			<>
				<p>Log in om deze pagina te kunnen zien</p>
				<Link href="/signup">Log in</Link>
			</>
		);
	}

	return (
		<section>
			<span className={styles.week}>Week {data.week}</span>

			<BoardHeader />
			<MemberList data={data} />
		</section>
	);
};

export default WeekOverview;

// for static pages
// export const getStaticProps: GetStaticProps = async ({ params }) => {
// 	const filePath = path.join(
// 		process.cwd(),
// 		"data",
// 		`lifts-${params?.week}-${params?.year}.json`
// 	);
// 	const data = await fs.readFile(filePath, "utf-8");
// 	const lifts = JSON.parse(data);
// 	return { props: { data: lifts }, revalidate: 200 }; // regenerate the page every 10 seconds
// };

// for dynamic pages
// export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
// 	return {
// 		paths: [], //indicates that no page needs be created at build time
// 		fallback: "blocking", //indicates the type of fallback
// 	};
// };

export const getServerSideProps: GetServerSideProps = async ({
	params,
	req,
}) => {
	// find out if the user is logged in or not
	// page will only render if we are authenticated
	const session = await getSession({ req: req }); // look into the req, gets the session cookie en checks if it is valid

	// console.log(session, "/week/37");

	if (!session) {
		return {
			redirect: {
				destination: "/signup",
				permanent: false, // Only this time, because the user is not logged in.
			},
		};
	}

	const filePath = path.join(
		process.cwd(),
		"data",
		`lifts-${params?.week}-${params?.year}.json`
	);
	const data = await fs.readFile(filePath, "utf-8");
	const lifts = JSON.parse(data);
	// return { props: { data: lifts }, revalidate: 200 }; // regenerate the page every 10 seconds

	return {
		props: { session, data: lifts },
	};
};
