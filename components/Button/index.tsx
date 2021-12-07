import React, { FC } from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

type ButtonProps = {
	variant: "primary" | "flat" | "flatBig";
	type?: "button" | "submit";
	onClick?: (e?: React.MouseEvent) => void;
	disabled?: boolean;
	isActive?: boolean;
};

const Button: FC<ButtonProps> = ({
	variant,
	type = "button",
	onClick,
	disabled,
	isActive,
	children,
}) => {
	return (
		<button
			type={type}
			className={classNames(styles.button, styles[variant], {
				[styles.disabled]: disabled,
				[styles.active]: isActive,
			})}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
