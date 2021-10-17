import React, { FC } from "react";
import { User } from "../../types";
import Lane from "../Lane";
import styles from "./styles.module.css";
import laneStyles from "../Lane/styles.module.css";

type LaneContainerProps = {
	users: User[]; // Refactor with user model from next auth
};

const LaneContainer: FC<LaneContainerProps> = ({ users }) => {
	console.log("users", users);
	return (
		<section className={styles.laneContainer}>
			{/* <div className={laneStyles.lane}>
				<h1>Naam</h1>

				{users.map((user) => (
					<div key={user._id} className={styles.userContainer}>
						<>
							<span>{user.displayName}</span>
							<section className={styles.metaData}>
								<span>93kg</span>
								<span>-</span>
								<span>Sportcentrum TopFit</span>
							</section>
						</>
					</div>
				))}
			</div> */}
			<Lane title="Squat" users={users} />
			<Lane title="Bench press" users={users} />
			<Lane title="Deadlift" users={users} />
		</section>
	);
};

export default LaneContainer;
