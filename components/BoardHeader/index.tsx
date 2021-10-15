import React from "react";
import styles from "./styles.module.css";

const BoardHeader = () => (
	<ul className={styles.list}>
		<li className={styles.listItem}>Naam</li>
		<li className={styles.listItem}>Squat</li>
		<li className={styles.listItem}>Bench press</li>
		<li className={styles.listItem}>Deadlift</li>
	</ul>
);

export default BoardHeader;
