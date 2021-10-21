import React, { FC } from "react";
import Button from "../Button";
import DateLine from "../DateLine";
import styles from "./styles.module.css";

type LaneHeaderProps = {
	setShowModal: () => void;
};
const LaneHeader: FC<LaneHeaderProps> = ({ setShowModal }) => (
	<section className={styles.laneHeaderContainer}>
		<DateLine />
		<Button variant="primary" onClick={setShowModal}>
			Lifts toevoegen
		</Button>
	</section>
);

export default LaneHeader;
