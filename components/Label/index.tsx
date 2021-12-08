import React, { FC } from "react";
import styles from "./styles.module.css";

type LabelProps = {
	value: string;
};

const Label: FC<LabelProps> = ({ value }) => (
	<div className={styles.container}>
		<span className={styles.value}>{value}</span>
	</div>
);

export default Label;
