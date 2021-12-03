import React, { FC, useRef, useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import Button from "../Button";

const LoginForm: FC = () => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();
	const [error, setError] = useState({ message: "" });

	const onLogin = async (e?: React.MouseEvent) => {
		e?.preventDefault();

		const result = await signIn("credentials", {
			email: emailRef?.current?.value,
			password: passwordRef?.current?.value,
			redirect: false,
		}); // Promise will always resolve, never rejected.

		console.log("res", result);

		if (result?.error) {
			setError({
				message:
					"Je inloggegevens kloppen niet helemaal. Wil je ze controleren?",
			});
		}

		if (!result?.error) {
			router.replace("/");
		}
	};

	return (
		<form className={styles.loginForm}>
			<fieldset className={styles.fieldset}>
				<div className={styles.inputContainer}>
					{error.message && (
						<p className={styles.error}>{error.message}</p>
					)}
					<label htmlFor="login-email">Email</label>
					<input
						type="email"
						id="login-email"
						required
						ref={emailRef}
					/>
				</div>
				<div className={styles.inputContainer}>
					<label htmlFor="login-password">Wachtwoord</label>
					<input
						type="password"
						id="login-password"
						required
						ref={passwordRef}
					/>
				</div>
			</fieldset>
			<Button
				variant="primary"
				type="submit"
				onClick={(e?: React.MouseEvent) => onLogin(e)}
			>
				Log in
			</Button>
		</form>
	);
};

export default LoginForm;
