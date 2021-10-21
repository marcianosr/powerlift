import React, { FC } from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

type ButtonProps = {
	variant: "primary";
	type?: "button" | "submit";
	onClick?: () => void;
};

const Button: FC<ButtonProps> = ({
	variant,
	type = "button",
	onClick,
	children,
}) => {
	return (
		<button
			type={type}
			className={classNames(styles.button, styles[variant])}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
