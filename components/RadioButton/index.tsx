import React, { FC } from "react";
import styles from "./styles.module.css";

type RadioButtonProps = {
	label: string;
	id: string;
	value: string;

	name: string;
};

const RadioButton: FC<RadioButtonProps> = ({ id, label, value, name }) => (
	<div className={styles.container}>
		<input
			className={styles.radioButton}
			type="radio"
			value={value}
			id={id}
			name={name}
		/>
		<label className={styles.label} htmlFor={id}>
			RPE {label}
		</label>
	</div>
);

export default RadioButton;
