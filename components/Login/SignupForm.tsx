import React, { useState, FC } from "react";
import { createUser } from "../../api";
import Button from "../Button";
import AccountInformationStep from "./AccountInformationStep";
import ClubSelectStep from "./ClubSelectStep";
import GenderAndWeightClassSelectStep from "./GenderAndWeightClassStep";
import styles from "./styles.module.css";

export const onChange = (
	e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>,
	{
		signupData,
		setSignupData,
	}: { signupData: SignupData; setSignupData: SetSignupData }
) => {
	const field = e.currentTarget.id;
	const value = e.currentTarget.value;

	setSignupData({
		...signupData,
		[field]: value,
	});
};

export type SignupData = {
	email: string;
	password: string;
	displayName: string;
	weightClass: string;
	club: string;
};
export type SetSignupData = (data: SignupData) => void;

export type SignupError = {
	message: string;
	fields: any;
};

export enum Steps {
	AccountInfo,
	GenderAndWeightClass,
	ClubSelect,
}

const stepMapping = [
	AccountInformationStep,
	GenderAndWeightClassSelectStep,
	ClubSelectStep,
];

const SignupForm: FC = () => {
	const [steps, setSteps] = useState(Steps.AccountInfo);
	const [signupData, setSignupData] = useState({
		email: "",
		displayName: "",
		password: "",
		weightClass: "",
		club: "",
	});
	const [errors, setErrors] = useState<SignupError>();

	const onSignUp = async (e?: React.MouseEvent) => {
		e?.preventDefault();

		try {
			const result = await createUser(signupData);

			console.log("Sign up result: ", result);
		} catch (error) {
			setErrors(error as SignupError);
		}
	};

	const StepTemplate = stepMapping[steps];
	return (
		<form className={styles.loginForm}>
			<StepTemplate
				setSteps={setSteps}
				signupData={signupData}
				setSignupData={setSignupData}
			/>
			{errors?.message === "User exists" && (
				<>
					<span>Een aantal velden zijn helaas niet valide.</span>

					<ul className={styles.errorMessageContainer}>
						<li>Deze gebruiker bestaat al!</li>
					</ul>
				</>
			)}
			{steps === Steps.ClubSelect && (
				<Button
					variant="primary"
					type="submit"
					onClick={(e?: React.MouseEvent) => onSignUp(e)}
				>
					Maak account aan
				</Button>
			)}
		</form>
	);
};

export default SignupForm;
