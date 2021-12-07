import React, { FC } from "react";
import Button from "../Button";
import styles from "./styles.module.css";

const FilterBar: FC = () => (
	<aside className={styles.filterbar}>
		<h3 className={styles.filterTitle}>Algemene filters</h3>
		<ul className={styles.filterList}>
			<li>
				<Button isActive={true} variant="flatBig">
					meest recent
				</Button>
			</li>
		</ul>
		<h3 className={styles.filterTitle}>Lift filters</h3>
		<ul className={styles.filterList}>
			<li>
				<Button variant="flatBig">beste squat</Button>
			</li>
			<li>
				<Button variant="flatBig">beste bench press</Button>
			</li>
			<li>
				<Button variant="flatBig">beste deadlift</Button>
			</li>
			<li>
				<Button variant="flatBig">beste totaal</Button>
			</li>
		</ul>
	</aside>
);

export default FilterBar;
