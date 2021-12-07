import React, { Dispatch, FC, SetStateAction } from "react";
import Button from "../Button";
import DateLine from "../DateLine";
import styles from "./styles.module.css";

type LaneHeaderProps = {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	date?: string;
};

const LaneHeader: FC<LaneHeaderProps> = ({ setShowModal, date }) => (
	<section className={styles.laneHeaderContainer}>
		<DateLine date={date} />
		<Button variant="primary" onClick={() => setShowModal(true)}>
			Voeg jouw lifts toe
		</Button>
	</section>
);

export default LaneHeader;
