import React, { FC } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

type ModalProps = {
	onClickBackdrop: () => void;
	withCloseButton?: boolean;
};

const Modal: FC<ModalProps> = ({
	onClickBackdrop,
	withCloseButton = true,
	children,
}) => {
	return (
		<>
			<div onClick={onClickBackdrop} className={styles.backdrop}></div>
			<section className={styles.modalContainer}>
				{withCloseButton && (
					<FontAwesomeIcon
						icon={faXmark}
						size="1x"
						className={styles.close}
						onClick={onClickBackdrop}
					/>
				)}
				{children}
			</section>
		</>
	);
};

export default Modal;
