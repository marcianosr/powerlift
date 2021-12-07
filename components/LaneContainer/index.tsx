import React, { FC } from "react";
import { User } from "../../types";
import Lane from "../Lane";
import styles from "./styles.module.css";
import laneStyles from "../Lane/styles.module.css";

type LaneContainerProps = {
	users: User[]; // Refactor with user model from next auth
};

const LaneContainer: FC<LaneContainerProps> = ({ users }) => {
	return (
		<section className={styles.laneContainer}>
			<Lane title="Squat" users={users} />
			<Lane title="Bench press" users={users} />
			<Lane title="Deadlift" users={users} />
			<Lane title="Lift totaal" users={users} />
		</section>
	);
};

export default LaneContainer;
