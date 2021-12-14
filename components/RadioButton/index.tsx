import classNames from "classnames";
import React, { FC } from "react";
import styles from "./styles.module.scss";

type RadioButtonProps = {
	id: string;
	value: string;
	name: string;
	color: string;
	onChange: () => void;
	checked?: boolean;
};

const RadioButton: FC<RadioButtonProps> = ({
	id,
	value,
	name,
	color,
	onChange,
	checked,
}) => {
	return (
		<div className={styles.container}>
			<input
				className={styles.radioButton}
				type="radio"
				value={value}
				id={id}
				name={name}
				onChange={onChange}
				checked={checked}
			/>
			<label
				className={classNames(styles.label, styles[color])}
				htmlFor={id}
			>
				{value}
			</label>
		</div>
	);
};

export default RadioButton;
