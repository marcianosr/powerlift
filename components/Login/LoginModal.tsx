import React, { Dispatch, FC, SetStateAction, useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import styles from "./styles.module.css";

type LoginModalProps = {
	setShowModal: Dispatch<SetStateAction<boolean>>;
};

const LoginModal: FC<LoginModalProps> = ({ setShowModal }) => {
	const [toggleContent, setToggleContent] = useState("login");

	return (
		<Modal onClickBackdrop={() => setShowModal(false)}>
			{toggleContent === "login" ? (
				<LoginModalContent setToggleContent={setToggleContent} />
			) : (
				<SignupModalContent setToggleContent={setToggleContent} />
			)}
		</Modal>
	);
};

export default LoginModal;

type ModalContentProps = {
	setToggleContent: (state: string) => void;
};

const LoginModalContent: FC<ModalContentProps> = ({ setToggleContent }) => (
	<section className={styles.loginModalContent}>
		<h1>Log in</h1>
		<span className={styles.description}>
			Log in om jouw lifts toe te voegen op het SBD bord.
		</span>
		<LoginForm />
		<section className={styles.createAccountText}>
			<span className={styles.description}>Nog geen account?</span>
			<Button variant="flat" onClick={() => setToggleContent("signup")}>
				Maak er dan hier een aan!
			</Button>
		</section>
	</section>
);

const SignupModalContent: FC<ModalContentProps> = ({ setToggleContent }) => (
	<section className={styles.loginModalContent}>
		<h1>Maak account aan op ...</h1>
		<SignupForm />
		<section className={styles.createAccountText}>
			<span className={styles.description}>Heb je al een account?</span>
			<Button variant="flat" onClick={() => setToggleContent("login")}>
				Log hier in
			</Button>
		</section>
	</section>
);
