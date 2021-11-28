import React, { FC } from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

type ButtonProps = {
	variant: "primary" | "flat";
	type?: "button" | "submit";
	onClick?: (e?: React.MouseEvent) => void;
	disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
	variant,
	type = "button",
	onClick,
	disabled,
	children,
}) => {
	return (
		<button
			type={type}
			className={classNames(styles.button, styles[variant], {
				[styles.disabled]: disabled,
			})}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
