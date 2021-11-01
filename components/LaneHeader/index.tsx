import React, { Dispatch, FC, SetStateAction } from "react";
import Button from "../Button";
import DateLine from "../DateLine";
import styles from "./styles.module.css";

type LaneHeaderProps = {
	setShowModal: Dispatch<SetStateAction<boolean>>;
};

const LaneHeader: FC<LaneHeaderProps> = ({ setShowModal }) => (
	<section className={styles.laneHeaderContainer}>
		<DateLine />
		<Button variant="primary" onClick={() => setShowModal(true)}>
			Lifts toevoegen
		</Button>
	</section>
);

export default LaneHeader;
