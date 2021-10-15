import React from "react";
import classnames from "classnames";
import { Member } from "../../types";
import { GymData } from "../../types";
import styles from "./styles.module.css";
import { useSession } from "next-auth/client";

const MemberList: React.FC<GymData> = ({ data }) => {
	const [session, loading] = useSession();

	return (
		<ul className={styles.list}>
			{data.gym.members.map((member: Member) => (
				<div key={member.name} className={styles.listItem}>
					<li>
						<span className={styles.large}>{member.name}</span>
						<span>-{member.weightClass}kg</span>
					</li>
					<li>
						<div className={styles.weight}>
							<span>{member.lifts.squat.weight}</span>
							<span className={styles.small}>kg</span>
						</div>
						<div className={styles.setsAndReps}>
							<div className={styles.sets}>
								<span>{member.lifts.squat.sets}</span>
								<span className={styles.small}>sets</span>
							</div>
							<div className={styles.reps}>
								<span>{member.lifts.squat.reps}</span>
								<span className={styles.small}>reps</span>
							</div>
						</div>
					</li>
					<li>
						<div className={styles.weight}>
							<span>{member.lifts.benchpress.weight}</span>
							<span className={styles.small}>kg</span>
						</div>
						<div className={styles.setsAndReps}>
							<div className={styles.sets}>
								<span>{member.lifts.benchpress.sets}</span>
								<span className={styles.small}>sets</span>
							</div>
							<div className={styles.reps}>
								<span>{member.lifts.benchpress.reps}</span>
								<span className={styles.small}>reps</span>
							</div>
						</div>
					</li>
					<li>
						<div className={styles.weight}>
							<span>{member.lifts.deadlift.weight}</span>
							<span className={styles.small}>kg</span>
						</div>
						<div className={styles.setsAndReps}>
							<div className={styles.sets}>
								<span>{member.lifts.deadlift.sets}</span>
								<span className={styles.small}>sets</span>
							</div>
							<div className={styles.reps}>
								<span>{member.lifts.deadlift.reps}</span>
								<span className={styles.small}>reps</span>
							</div>
						</div>
					</li>
				</div>
			))}
		</ul>
	);
};

export default MemberList;
