import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { getSession, signIn } from "next-auth/client";
import router, { useRouter } from "next/router";

const createUser = async (
	email: string,
	displayName: string,
	password: string
) => {
	const response = await fetch("api/auth/signup", {
		method: "POST",
		body: JSON.stringify({ email, displayName, password }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Something went wrong!");
	}

	return data;
};

const Login: React.FC = () => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();

	const onLogin = async (e: React.MouseEvent) => {
		e.preventDefault();

		const result = await signIn("credentials", {
			email: emailRef?.current?.value,
			password: passwordRef?.current?.value,
			redirect: false,
		}); // Promise will always resolve, never rejected.

		if (!result?.error) {
			router.replace("/");
		}
	};

	return (
		<>
			<h1>Login</h1>
			<form>
				<label>Email</label>
				<input type="email" id="login-email" required ref={emailRef} />

				<label>Password</label>
				<input
					type="password"
					id="login-password"
					required
					ref={passwordRef}
				/>
				<button type="submit" onClick={onLogin}>
					Login
				</button>
			</form>
		</>
	);
};

const Signup: NextPage = () => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const displayNameRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getSession().then((session) => {
			if (session) {
				router.replace("/");
			} else {
				setIsLoading(false);
			}
		});
	}, [router]);

	if (isLoading) {
		return <p>Checking if you are logged in</p>;
	}

	const onSignUp = async (e: React.MouseEvent) => {
		e.preventDefault();
		const emailValue = emailRef?.current?.value || "";
		const displayNameValue = displayNameRef?.current?.value || "";
		const passwordValue = passwordRef?.current?.value || "";

		// TODO: ADD VALIDATION

		try {
			const result = await createUser(
				emailValue,
				displayNameValue,
				passwordValue
			);

			console.log("RESULT ", result);
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<section>
			<Login />
			<form>
				<label>Email</label>
				<input type="email" id="email" required ref={emailRef} />

				<label>Display name</label>
				<input
					type="text"
					id="displayName"
					required
					ref={displayNameRef}
				/>

				<label>Password</label>
				<input
					type="password"
					id="password"
					required
					ref={passwordRef}
				/>

				<button type="submit" onClick={onSignUp}>
					Create
				</button>
			</form>
		</section>
	);
};

export default Signup;
