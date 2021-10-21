import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Button from "../Button";
import Modal from "../Modal";
import { createLift } from "./createLift";
import FormGroup from "./FormGroup";

import styles from "./styles.module.css";

type LiftsFormProps = {
	hideModal: () => void;
};

const LiftsForm: React.VFC<LiftsFormProps> = ({ hideModal }) => {
	const [lifts, setLifts] = useState<any>({});
	const [errorMessage, setErrorMessage] = useState({
		message: "",
		empty: false,
		fields: [],
	});

	console.log("errormessage", errorMessage);

	const [hasAlreadySubmittedToday, setHasAlreadySubmittedToday] =
		useState(false);

	const checkForSubmittedLiftsToday = async () => {
		const response = await fetch("api/lift/check-lifts");

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || "Something went wrong!");
		}

		if (data.submitted) {
			setHasAlreadySubmittedToday(true);
		}

		return data;
	};

	const onChange = (e: React.FormEvent<HTMLInputElement>) => {
		const liftName = e.currentTarget.name.split("-")[0];
		const liftField = e.currentTarget.name.split("-")[1];

		setLifts({
			...lifts,
			[liftName]: {
				...lifts[liftName],
				[liftField]: e.currentTarget.value,
			},
		});
	};

	useEffect(() => {
		checkForSubmittedLiftsToday();
	}, []);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		createLift(lifts)
			.then((value) => {
				console.log("Value", value);
				hideModal();

				clearForm();
			})
			.catch((error) => {
				const invalidFields = JSON.parse(error.message)?.fields;
				// console.log("e", JSON.parse(error.message).fields);

				if (invalidFields) {
					return setErrorMessage({
						...errorMessage,
						fields: invalidFields,
					});
				}

				return setErrorMessage({ ...errorMessage, empty: true });
			});
	};

	const clearForm = () => setLifts({});

	return (
		<Modal onClickBackdrop={hideModal}>
			<h2 className={styles.formHeaderTitle}>
				Lifts van vandaag toevoegen
			</h2>
			<span
				className={classNames(styles.description, {
					[styles.error]: errorMessage.empty,
				})}
			>
				Vul tenminste 1 lift in om hem op het scoreboard te plaatsen.
			</span>
			<form className={styles.form} onSubmit={onSubmit}>
				<FormGroup
					name="Squat"
					onChange={onChange}
					values={{ ...lifts.squat }}
					hasError={errorMessage.fields.includes("squat")}
				/>

				<FormGroup
					name="Bench press"
					onChange={onChange}
					values={{ ...lifts.benchpress }}
					hasError={errorMessage.fields.includes("benchpress")}
				/>
				<FormGroup
					name="Deadlift"
					onChange={onChange}
					values={{ ...lifts.deadlift }}
					hasError={errorMessage.fields.includes("deadlift")}
				/>
				<Button type="submit" variant="primary">
					Plaatsen
				</Button>
			</form>
		</Modal>
	);
};

export default LiftsForm;
