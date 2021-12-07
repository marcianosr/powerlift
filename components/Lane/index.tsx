import React from "react";
import { User } from "../../types";
import Card, { SmallCard } from "../Card";
import styles from "./styles.module.css";

type LaneProps = {
	title: string;
	users: User[];
};

const Lane: React.VFC<LaneProps> = ({ title, users }) => {
	const laneTitle = title.split(" ").join("").toLowerCase();

	return (
		<section className={styles.lane}>
			<section className={styles.titleContainer}>
				<h1>{title}</h1>
				<span className={styles.description}>
					Wat is je hoogste <strong>{title.toLowerCase()}</strong>{" "}
					voor vandaag?
				</span>
			</section>

			{users.map((user) => {
				if (laneTitle === "lifttotaal")
					return <SmallCard key={user._id} user={user} />;

				return (
					// Fix this with type schema. This is caused by the Lifts type and it should have a string index key.
					// https://basarat.gitbook.io/typescript/type-system/index-signatures
					user.lifts[laneTitle] &&
					user.lifts[laneTitle].weight !== null && (
						<Card
							key={user._id}
							user={user}
							laneTitle={laneTitle}
						/>
					)
				);
			})}
		</section>
	);
};

export default Lane;
