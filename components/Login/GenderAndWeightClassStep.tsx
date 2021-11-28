import React, { FC, useState } from "react";
import classNames from "classnames";
import Button from "../Button";
import { onChange, SetSignupData, SignupData, Steps } from "./SignupForm";
import styles from "./styles.module.css";

type GenderAndWeightClassSelectStepProps = {
	setSteps: (step: number) => void;
	signupData: SignupData;
	setSignupData: SetSignupData;
};

const GenderAndWeightClassSelectStep: FC<GenderAndWeightClassSelectStepProps> =
	({ setSteps, signupData, setSignupData }) => {
		const [selectedGender, setSelectedGender] = useState("male");

		const weightClassFormRules = signupData.weightClass.length > 0;

		return (
			<>
				<fieldset
					className={classNames(
						styles.fieldset,
						styles.genderWeightClassContainer
					)}
				>
					<legend>
						Stap 2: Selecteer je geslacht en bijbehorende
						gewichtsklasse
					</legend>
					<span className={styles.description}>
						Je geslacht wordt uitsluitend gebruikt om je de juiste
						gewichtsklassen te tonen. Dit wordt verder nergens
						vastgelegd.
					</span>

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
									onChange={(
										e: React.FormEvent<HTMLSelectElement>
									) =>
										onChange(e, {
											signupData,
											setSignupData,
										})
									}
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
									onChange={(
										e: React.FormEvent<HTMLSelectElement>
									) =>
										onChange(e, {
											signupData,
											setSignupData,
										})
									}
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
				</fieldset>
				<Button
					variant="primary"
					type="submit"
					onClick={() => setSteps(Steps.ClubSelect)}
					disabled={!weightClassFormRules}
				>
					Volgende stap
				</Button>
			</>
		);
	};

export default GenderAndWeightClassSelectStep;
