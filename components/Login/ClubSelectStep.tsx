import React, { FC } from "react";
import Button from "../Button";
import { onChange, SetSignupData, SignupData } from "./SignupForm";
import styles from "./styles.module.css";

type ClubSelectStepProps = {
	signupData: SignupData;
	setSignupData: SetSignupData;
};

const ClubSelectStep: FC<ClubSelectStepProps> = ({
	signupData,
	setSignupData,
}) => (
	<>
		<fieldset className={styles.fieldset}>
			<legend>Stap 3: Kies je krachtsportvereniging</legend>
			<span className={styles.description}>
				Als je dit veld leeglaat, wordt je ingedeeld onder "Algemeen".
				Dit kun je later wel altijd nog wijzigen.
			</span>

			<select
				className={styles.selectBox}
				name="club"
				id="club"
				onChange={(e: React.FormEvent<HTMLSelectElement>) =>
					onChange(e, { signupData, setSignupData })
				}
			>
				<option value="">-- Selecteer jouw vereniging --</option>
				<option value="Sportcentrum TopFit">Sportcentrum TopFit</option>
				<option value="TSKV Spartacus">TSKV Spartacus</option>
			</select>
		</fieldset>
	</>
);

export default ClubSelectStep;
