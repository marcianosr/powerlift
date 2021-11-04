import React, { Dispatch, SetStateAction, useState, VFC } from "react";
import classNames from "classnames";
import Modal from "../Modal";
import Button from "../Button";
import { createLift } from "./createLift";
import FormGroup from "./FormGroup";
import styles from "./styles.module.css";
import { Lifts } from "../../types";

type LiftsFormProps = {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	lifts: Lifts;
	isLoading: boolean;
	showUpdateModal: boolean;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
	clearForm: () => void;
};

type ErrorMessage = {
	message: string;
	status: string;
	empty: boolean;
	fields: string[];
};

const INITIAL_ERROR_STATE: ErrorMessage = {
	message: "",
	status: "",
	empty: false,
	fields: [],
};

const ERROR_MESSAGES = {
	["NEEDS_CONFIRMATION"]: "Weet je zeker dat de gewichten kloppen?",
	["EMPTY"]: "De invoervelden zijn leeg! Vul tenminste 1 lift volledig in.",
};

const LiftsForm: VFC<LiftsFormProps> = ({
	setShowModal,
	isLoading,
	showUpdateModal,
	lifts,
	onChange,
	clearForm,
}) => {
	const [errorMessage, setErrorMessage] =
		useState<ErrorMessage>(INITIAL_ERROR_STATE);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		createLift(lifts)
			.then((value) => {
				setShowModal(false);
				// clearForm();
				setErrorMessage(INITIAL_ERROR_STATE);
			})
			.catch((error) => {
				const invalidFields = JSON.parse(error.message)?.fields;
				const messageType = JSON.parse(error.message)?.message;

				if (invalidFields) {
					return setErrorMessage({
						...errorMessage,
						message: ERROR_MESSAGES[messageType],
						fields: invalidFields,
					});
				}

				return setErrorMessage({ ...errorMessage, empty: true });
			});
	};

	return (
		<Modal
			onClickBackdrop={() => setShowModal(false)}
			withCloseButton={!isLoading}
		>
			<h2 className={styles.formHeaderTitle}>
				{!showUpdateModal
					? "Lifts van vandaag toevoegen"
					: "Bewerk je lifts van vandaag"}
			</h2>
			<span
				className={classNames(styles.description, {
					[styles.error]: errorMessage.empty,
				})}
			>
				Vul tenminste 1 lift in om hem op het scoreboard te plaatsen.
			</span>
			{errorMessage.message && (
				<span
					className={classNames(styles.errorMessage, {
						[styles.error]: errorMessage.empty,
					})}
				>
					{errorMessage.message}
				</span>
			)}
			{isLoading ? (
				<p className={styles.loadingMessage}>
					Al jouw zware lifts laden...
				</p>
			) : (
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
						{!showUpdateModal ? "Plaatsen" : "Bewerken"}
					</Button>
				</form>
			)}
		</Modal>
	);
};

export default LiftsForm;
