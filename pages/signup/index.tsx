import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { getSession, signIn } from "next-auth/client";
import router, { useRouter } from "next/router";

const createUser = async (
	email: string,
	displayName: string,
	gender: string,
	weightClass: string,
	club: string,
	password: string
) => {
	const response = await fetch("api/auth/signup", {
		method: "POST",
		body: JSON.stringify({
			email,
			displayName,
			gender,
			weightClass,
			club,
			password,
		}),
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
	const genderRef = useRef<HTMLInputElement | null>(null);
	const weightRef = useRef<HTMLSelectElement | null>(null);
	const clubRef = useRef<HTMLSelectElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const [isLoading, setIsLoading] = useState(false);
	const [selectedGender, setSelectedGender] = useState("male");

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
		const genderValue = genderRef?.current?.value || "";
		const weightValue = weightRef?.current?.value || "";
		const clubValue = clubRef?.current?.value || "";
		const passwordValue = passwordRef?.current?.value || "";

		// TODO: ADD VALIDATION

		try {
			const result = await createUser(
				emailValue,
				displayNameValue,
				genderValue,
				weightValue,
				clubValue,
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

				<label htmlFor="male">Male</label>
				<input
					type="radio"
					id="male"
					value="male"
					name="gender"
					onChange={(e) => setSelectedGender(e.currentTarget.value)}
					required
					checked
					ref={genderRef}
				/>

				<label htmlFor="female">Female</label>
				<input
					type="radio"
					id="female"
					value="female"
					name="gender"
					onChange={(e) => setSelectedGender(e.currentTarget.value)}
					required
					ref={genderRef}
				/>

				<label>Weight class</label>
				{selectedGender === "female" && (
					<select name="weightClass" id="weightClass" ref={weightRef}>
						<option value="">-- Select your weight class --</option>
						<option value="47">47kg</option>
						<option value="52">52kg</option>
						<option value="57">57kg</option>
						<option value="63">63kg</option>
						<option value="69">69kg</option>
						<option value="76">76kg</option>
						<option value="84">84kg</option>
						<option value="84+">84+kg</option>
					</select>
				)}

				{selectedGender === "male" && (
					<select name="club" id="club" ref={clubRef}>
						<option value="">-- Select your club --</option>
						<option value="SportcentrumTopFit">
							Sportcentrum TopfFit
						</option>
					</select>
				)}

				<select name="weightClass" id="weightClass" ref={weightRef}>
					<option value="">--Select your weight class--</option>
					<option value="59">59kg</option>
					<option value="66">66kg</option>
					<option value="74">74kg</option>
					<option value="83">83kg</option>
					<option value="93">93kg</option>
					<option value="105">105kg</option>
					<option value="120">120kg</option>
					<option value="120+">120+kg</option>
				</select>

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
