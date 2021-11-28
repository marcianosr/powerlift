import React, { FC } from "react";
import Button from "../Button";
import { onChange, SetSignupData, SignupData, Steps } from "./SignupForm";
import styles from "./styles.module.css";

type AccountInformationStepProps = {
	setSteps: (step: number) => void;
	signupData: SignupData;
	setSignupData: SetSignupData;
};

const AccountInformationStep: FC<AccountInformationStepProps> = ({
	setSteps,
	signupData,
	setSignupData,
}) => {
	const accountInfoFormRules =
		signupData.email.length > 2 &&
		signupData.email.match(
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		) &&
		signupData.displayName.length > 2 &&
		signupData.password.length > 7;

	return (
		<>
			<fieldset className={styles.fieldset}>
				<legend>Stap 1: Account gegevens</legend>
				<span className={styles.description}>
					Deze minimale basis informatie hebben we nodig om je account
					te kunnen maken.
				</span>

				<div className={styles.inputContainer}>
					<label>Email</label>
					<input
						type="email"
						id="email"
						placeholder="naam@email.nl"
						required
						onChange={(e: React.FormEvent<HTMLInputElement>) =>
							onChange(e, { signupData, setSignupData })
						}
					/>
				</div>

				<div className={styles.inputContainer}>
					<label>Gebruikersnaam</label>
					<input
						type="text"
						id="displayName"
						placeholder="Kies een gebruikersnaam"
						required
						onChange={(e: React.FormEvent<HTMLInputElement>) =>
							onChange(e, { signupData, setSignupData })
						}
					/>
				</div>
				<div className={styles.inputContainer}>
					<label>Password</label>
					<input
						type="password"
						id="password"
						placeholder="Kies een sterk wachtwoord"
						required
						onChange={(e: React.FormEvent<HTMLInputElement>) =>
							onChange(e, { signupData, setSignupData })
						}
					/>
				</div>
			</fieldset>
			<Button
				variant="primary"
				type="submit"
				onClick={() => setSteps(Steps.GenderAndWeightClass)}
				disabled={!accountInfoFormRules}
			>
				Volgende stap
			</Button>
		</>
	);
};

export default AccountInformationStep;
