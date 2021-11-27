import classNames from "classnames";
import React, { useRef, useState, FC, MutableRefObject } from "react";
import { createUser } from "../../api";
import Button from "../Button";
import styles from "./styles.module.css";

type AccountInformationStepProps = {
	emailRef: MutableRefObject<HTMLInputElement | null>;
	passwordRef: MutableRefObject<HTMLInputElement | null>;
	displayNameRef: MutableRefObject<HTMLInputElement | null>;
	setSteps: (step: number) => void;
};

const AccountInformationStep: FC<AccountInformationStepProps> = ({
	emailRef,
	passwordRef,
	displayNameRef,
	setSteps,
}) => (
	<>
		<fieldset className={styles.fieldset}>
			<legend>Stap 1: Account gegevens</legend>

			<div className={styles.inputContainer}>
				<label>Email</label>
				<input type="email" id="email" required ref={emailRef} />
			</div>

			<div className={styles.inputContainer}>
				<label>Gebruikersnaam</label>
				<input
					type="text"
					id="displayName"
					required
					ref={displayNameRef}
				/>
			</div>
			<div className={styles.inputContainer}>
				<label>Password</label>
				<input
					type="password"
					id="password"
					required
					ref={passwordRef}
				/>
			</div>
		</fieldset>
		<Button variant="primary" type="submit" onClick={() => setSteps(2)}>
			Volgende stap
		</Button>
	</>
);

type GenderAndWeightClassSelectStepProps = {
	selectedGender: string;
	setSelectedGender: (gender: string) => void;
	genderRef: MutableRefObject<HTMLInputElement | null>;
	weightRef: MutableRefObject<HTMLSelectElement | null>;
	setSteps: (step: number) => void;
};

const GenderAndWeightClassSelectStep: FC<GenderAndWeightClassSelectStepProps> =
	({ selectedGender, setSelectedGender, genderRef, weightRef, setSteps }) => (
		<>
			<fieldset
				className={classNames(
					styles.fieldset,
					styles.genderWeightClassContainer
				)}
			>
				<legend>
					Stap 2: Selecteer je geslacht en bijbehorende gewichtsklasse
				</legend>
				<div
					className={classNames(
						styles.inputContainer,
						styles.genderContainer
					)}
				>
					<div className={styles.genderRadioButtonGroup}>
						<input
							type="radio"
							id="male"
							value="male"
							name="gender"
							onChange={(e) =>
								setSelectedGender(e.currentTarget.value)
							}
							required
							checked={selectedGender === "male"}
							ref={genderRef}
						/>
						<label htmlFor="male">Man</label>
						<input
							type="radio"
							id="female"
							value="female"
							name="gender"
							onChange={(e) =>
								setSelectedGender(e.currentTarget.value)
							}
							required
							checked={selectedGender === "female"}
							ref={genderRef}
						/>
						<label htmlFor="female">Vrouw</label>
					</div>
					<hr className={styles.divider} />
					<div className={styles.selectWeightClassContainer}>
						<label>Gewichtsklasse</label>
						{selectedGender === "female" && (
							<select
								className={styles.selectBox}
								name="weightClass"
								id="weightClass"
								ref={weightRef}
							>
								<option value="">
									Selecteer je gewichtsklasse
								</option>
								<option value="47">47kg</option>
								<option value="52">52kg</option>
								<option value="57">57kg</option>
								<option value="63">63kg</option>
								<option value="69">69kg</option>
								<option value="76">76kg</option>
								<option value="84">84kg</option>
								<option value="84+">84kg+</option>
							</select>
						)}
						{selectedGender === "male" && (
							<select
								className={styles.selectBox}
								name="weightClass"
								id="weightClass"
								ref={weightRef}
							>
								<option value="">
									Selecteer je gewichtsklasse
								</option>
								<option value="59">59kg</option>
								<option value="66">66kg</option>
								<option value="74">74kg</option>
								<option value="83">83kg</option>
								<option value="93">93kg</option>
								<option value="105">105kg</option>
								<option value="120">120kg</option>
								<option value="120+">120kg+</option>
							</select>
						)}
					</div>
				</div>
				<span className={styles.description}>
					* Je geslacht wordt uitsluitend gebruikt om je de juiste
					gewichtsklassen te tonen.
				</span>
			</fieldset>
			<Button variant="primary" type="submit" onClick={() => setSteps(3)}>
				Volgende stap
			</Button>
		</>
	);

type ClubSelectStepProps = {
	clubRef: MutableRefObject<HTMLSelectElement | null>;
	onSignUp: (e: React.MouseEvent) => Promise<void>;
};

const ClubSelectStep: FC<ClubSelectStepProps> = ({ clubRef, onSignUp }) => (
	<>
		<fieldset className={styles.fieldset}>
			<legend>Stap 3: Kies je krachtsportvereniging</legend>

			<select
				className={styles.selectBox}
				name="club"
				id="club"
				ref={clubRef}
			>
				<option value="">-- Select your club --</option>
				<option value="Sportcentrum TopFit">Sportcentrum TopFit</option>
				<option value="TSKV Spartacus">TSKV Spartacus</option>
			</select>
			<span className={styles.description}>
				* Als je niks invult kun je het altijd later nog wijzigen.
			</span>
		</fieldset>
		<Button
			variant="primary"
			type="submit"
			onClick={(e?: React.MouseEvent) => onSignUp(e)}
		>
			Maak account aan
		</Button>
	</>
);

const SignupForm: FC = () => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const displayNameRef = useRef<HTMLInputElement | null>(null);
	const genderRef = useRef<HTMLInputElement | null>(null);
	const weightRef = useRef<HTMLSelectElement | null>(null);
	const clubRef = useRef<HTMLSelectElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const [steps, setSteps] = useState(1);
	const [selectedGender, setSelectedGender] = useState("male");

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
		<form className={styles.loginForm}>
			{steps === 1 && (
				<AccountInformationStep
					emailRef={emailRef}
					displayNameRef={displayNameRef}
					passwordRef={passwordRef}
					setSteps={setSteps}
				/>
			)}
			{steps === 2 && (
				<GenderAndWeightClassSelectStep
					genderRef={genderRef}
					selectedGender={selectedGender}
					setSelectedGender={setSelectedGender}
					weightRef={weightRef}
					setSteps={setSteps}
				/>
			)}
			{steps === 3 && (
				<ClubSelectStep clubRef={clubRef} onSignUp={onSignUp} />
			)}
		</form>
	);
};

export default SignupForm;
