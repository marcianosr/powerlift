import classNames from "classnames";
import React, { FC } from "react";
import { User } from "../../types";
import styles from "./styles.module.css";

type CardProps = {
	user: User;
	excersise: string;
};

const Card: FC<CardProps> = ({ user, excersise }) => {
	return (
		<section
			className={classNames(styles.card, {
				[styles.noResult]: !user.lifts[excersise],
			})}
		>
			{user.lifts[excersise] ? (
				<div className={styles.cardInnerContainer}>
					<span>{user.displayName}</span>

					<section className={styles.infoContainer}>
						<div className={styles.info}>
							<div className={styles.weight}>
								<span>{user.lifts[excersise]?.weight}</span>
								<span>kg</span>
							</div>
						</div>

						<div className={styles.info}>
							<div className={styles.details}>
								<span className={styles.title}>
									{user.lifts[excersise]?.sets}
								</span>
								<span className={styles.kg}>set</span>
							</div>

							<div className={styles.details}>
								<span className={styles.title}>
									{user.lifts[excersise]?.reps}
								</span>
								<span className={styles.kg}>reps</span>
							</div>
						</div>
					</section>
				</div>
			) : (
				<p>No lift today</p>
			)}
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
