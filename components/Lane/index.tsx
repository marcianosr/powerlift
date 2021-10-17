import React from "react";
import { User } from "../../types";
import Card from "../Card";
import styles from "./styles.module.css";

type LaneProps = {
	title: string;
	users: User[];
};

const Lane: React.VFC<LaneProps> = ({ title, users }) => {
	const excersise = title.split(" ").join("").toLowerCase();

	return (
		<section className={styles.lane}>
			<h1>{excersise}</h1>

			{users.map((user) => {
				return (
					user.lifts[excersise] && (
						<Card
							key={user._id}
							user={user}
							excersise={excersise}
						/>
					)
				);
			})}
		</section>
	);
};

export default Lane;
