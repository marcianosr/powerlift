import React, { FC } from "react";
import Button from "../Button";
import styles from "./styles.module.css";

const FilterBar: FC = () => (
	<section className={styles.filterbarContainer}>
		<h3 className={styles.filterTitle}>Filters</h3>
		<aside className={styles.filterbar}>
			<ul className={styles.filterList}>
				<li>
					<Button isActive={true} variant="flatBig">
						meest recent
					</Button>
				</li>
			</ul>
			{/* <ul className={styles.filterList}>
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
			</ul> */}
		</aside>
	</section>
);

export default FilterBar;
