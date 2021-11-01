import React from "react";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import classNames from "classnames";

type FormGroupProps = {
	name: string;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
	values: {
		weight?: string;
		sets?: string;
		reps?: string;
	};
	hasError: boolean;
};
const FormGroup: React.VFC<FormGroupProps> = ({
	name,
	onChange,
	values,
	hasError,
}) => {
	const formName = name.toLowerCase().split(" ").join("");
	return (
		<fieldset
			className={classNames(styles.fieldsetContainer, {
				[styles.fieldsetContainerError]: hasError,
			})}
		>
			<legend className={styles.formTitle}>{name}</legend>

			<section className={styles.inputContainer}>
				<div className={styles.inputAndLabel}>
					<label htmlFor={`${formName}-weight`}>gewicht</label>
					<input
						name={`${formName}-weight`}
						id={`${formName}-weight`}
						type="number"
						value={values.weight || ""}
						onChange={onChange}
						placeholder="200"
					/>
					<FontAwesomeIcon icon={faWeightHanging} />
				</div>

				<div className={styles.inputAndLabel}>
					<label htmlFor={`${formName}-sets`}>sets</label>
					<input
						name={`${formName}-sets`}
						id={`${formName}-sets`}
						type="number"
						value={values.sets || ""}
						onChange={onChange}
						placeholder="5"
					/>
				</div>

				<div className={styles.inputAndLabel}>
					<label htmlFor={`${formName}-reps`}>reps</label>
					<input
						name={`${formName}-reps`}
						id={`${formName}-reps`}
						type="number"
						value={values.reps || ""}
						onChange={onChange}
						placeholder="5"
					/>
				</div>
			</section>
			{/* <p>{invalid && `${formName} is niet helemaal ingevuld`}</p> */}
		</fieldset>
	);
};

export default FormGroup;
