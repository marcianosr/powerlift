import classNames from "classnames";
import React, { FC } from "react";
import styles from "./styles.module.scss";

type LabelProps = {
	value: string;
	variant?: "default" | "rounded";
	size?: "small" | "large";
	color: "red" | "yellow" | "green" | "orange" | "purple";
	isActive?: boolean;
};

const Label: FC<LabelProps> = ({
	value,
	variant = "default",
	size = "small",
	color,
	isActive,
}) => (
	<div
		className={classNames(styles.container, styles[size], {
			[styles.rounded]: variant === "rounded",
		})}
	>
		<span
			className={classNames(styles.value, styles[color], {
				[styles.active]: isActive,
			})}
		>
			{value}
		</span>
	</div>
);

export default Label;
