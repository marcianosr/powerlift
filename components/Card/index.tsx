import classNames from "classnames";
import React, { FC } from "react";
import { User } from "../../types";
import styles from "./styles.module.css";

type CardProps = {
	user: User;
	laneTitle: string;
};

type SmallCardProps = {
	user: User;
};

export const SmallCard: FC<SmallCardProps> = ({ user }) => {
	const total =
		Number(user?.lifts?.squat?.weight) +
		Number(user?.lifts?.benchpress?.weight) +
		Number(user?.lifts?.deadlift?.weight);

	return (
		<section className={styles.card}>
			<div className={styles.cardInnerContainer}>
				<section className={styles.userContainer}>
					<span>{user.displayName}</span>
					<div className={styles.userInnerContainer}>
						<span>{user.weightClass}.0kg</span>
						<span> - {user.club}</span>
					</div>
				</section>

				<section className={styles.infoContainer}>
					<div className={styles.info}>
						<div className={styles.weight}>
							<span>{total}</span>
							<span>kg</span>
						</div>
					</div>
				</section>
			</div>
		</section>
	);
};
const Card: FC<CardProps> = ({ user, laneTitle }) => {
	console.log("user", user);
	return (
		<section
			className={classNames(styles.card, {
				[styles.noResult]: !user.lifts[laneTitle],
			})}
		>
			<div className={styles.cardInnerContainer}>
				<section className={styles.userContainer}>
					<span>{user.displayName}</span>
					<div className={styles.userInnerContainer}>
						<span>{user.weightClass}.0kg</span>
						<span> - {user.club}</span>
					</div>
				</section>

				<section className={styles.infoContainer}>
					<div className={styles.info}>
						<div className={styles.weight}>
							<span>{user.lifts[laneTitle]?.weight}</span>
							<span>kg</span>
						</div>
					</div>

					<div className={styles.info}>
						<div className={styles.details}>
							<span className={styles.title}>
								{user.lifts[laneTitle]?.sets}
							</span>
							<span className={styles.kg}>set</span>
						</div>

						<div className={styles.details}>
							<span className={styles.title}>
								{user.lifts[laneTitle]?.reps}
							</span>
							<span className={styles.kg}>reps</span>
						</div>
					</div>
				</section>
			</div>
		</section>
	);
	// return (
	// 	<section className={styles.card}>
	// 		<div className={styles.userContainer}>
	// 			<span>Marciano</span>
	// 			<span>-93kg</span>
	// 		</div>
	// 		<div className={styles.infoContainer}>
	// 			{/* <div className={styles.platesContainer}>
	// 				<div className={styles.silver}></div>
	// 				<div className={styles.yellow}></div>
	// 				<div className={styles.red}></div>
	// 				<div className={styles.red}></div>
	// 				<div className={styles.red}></div>
	// 			</div> */}

	// 			<div className={styles.info}>
	// 				<div className={styles.weight}>
	// 					<span>202,5</span>
	// 					<span>kg</span>
	// 					{/* <div className={styles.pb}>personal best</div> */}
	// 				</div>
	// 			</div>

	// 			{/* <div className={styles.platesContainer}>
	// 				<div className={styles.red}></div>
	// 				<div className={styles.red}></div>
	// 				<div className={styles.red}></div>
	// 				<div className={styles.yellow}></div>
	// 				<div className={styles.silver}></div>
	// 			</div> */}

	// 			<div className={styles.info}>
	// 				<div className={styles.details}>
	// 					<span className={styles.title}>1</span>
	// 					<span className={styles.kg}>set</span>
	// 				</div>
	// 				<div className={styles.details}>
	// 					<span className={styles.title}>3</span>
	// 					<span className={styles.kg}>reps</span>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</section>
	// );
};

export default Card;
