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
			<h1>{laneTitle}</h1>

			{users.map((user) => {
				if (laneTitle === "totaal")
					return <SmallCard key={user._id} user={user} />;

				return (
					user.lifts[laneTitle] && (
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
