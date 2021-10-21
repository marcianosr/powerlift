import React, { FC } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

type ModalProps = {
	onClickBackdrop: () => void;
};

const Modal: FC<ModalProps> = ({ onClickBackdrop, children }) => {
	return (
		<>
			<div onClick={onClickBackdrop} className={styles.backdrop}></div>
			<section className={styles.modalContainer}>
				<FontAwesomeIcon
					icon={faXmark}
					size="1x"
					className={styles.close}
					onClick={onClickBackdrop}
				/>
				{children}
			</section>
		</>
	);
};

export default Modal;
