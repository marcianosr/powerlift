import React, { FC } from "react";
import { format, getISOWeek, parse } from "date-fns";
import styles from "./styles.module.css";
import { nl } from "date-fns/locale";

type DateLineProps = {
	date?: string;
};

const DateLine: FC<DateLineProps> = ({ date }) => (
	<h2 className={styles.dateLine}>
		{date ? (
			<>
				Vandaag {date} (week{" "}
				{getISOWeek(parse(date, "P", new Date(), { locale: nl }))})
			</>
		) : (
			<>
				Vandaag {format(Date.now(), "dd/MM/yyyy")} (week{" "}
				{getISOWeek(Date.now())})
			</>
		)}
	</h2>
);

export default DateLine;
