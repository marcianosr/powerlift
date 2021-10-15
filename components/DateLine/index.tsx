import React from "react";
import { format, getISOWeek } from "date-fns";
import styles from "./styles.module.css";

const DateLine = () => (
	<h2 className={styles.dateLine}>
		Vandaag {format(Date.now(), "dd/MM/yyyy")} (week{" "}
		{getISOWeek(Date.now())})
	</h2>
);

export default DateLine;
