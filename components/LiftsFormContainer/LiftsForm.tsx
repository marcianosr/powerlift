import React, { Dispatch, SetStateAction, useState, VFC } from "react";
import classNames from "classnames";
import Modal from "../Modal";
import Button from "../Button";
import FormGroup from "./FormGroup";
import styles from "./styles.module.css";
import { Lifts } from "../../types";
import { useMutation, useQueryClient } from "react-query";
import { createLift } from "../../api";

type LiftsFormProps = {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	lifts: Lifts;
	setLifts: (lifts: Lifts) => void;
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
	setLifts,
	onChange,
	clearForm,
}) => {
	const [errorMessage, setErrorMessage] =
		useState<ErrorMessage>(INITIAL_ERROR_STATE);

	const queryClient = useQueryClient();

	const { mutate } = useMutation(createLift, {
		onSuccess: () => {
			setShowModal(false);
			setErrorMessage(INITIAL_ERROR_STATE);
			queryClient.invalidateQueries("users"); // Invalidate the data to reflect the new data in the UI. Improve with https://www.youtube.com/watch?v=XI0SN5AI6YA&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2&index=23&ab_channel=Codevolution
		},
		onError: (error) => {
			const invalidFields = JSON.parse(error.message)?.fields;
			const messageType = JSON.parse(error.message)?.message;

			if (invalidFields) {
				return setErrorMessage({
					...errorMessage,
					message: ERROR_MESSAGES[messageType],
					fields: invalidFields,
				});
			}

			setErrorMessage({ ...errorMessage, empty: true });
		},
	});

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutate(lifts);
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
						lifts={lifts}
						values={{ ...lifts.squat }}
						setLifts={setLifts}
						hasError={errorMessage.fields.includes("squat")}
					/>

					<FormGroup
						name="Bench press"
						onChange={onChange}
						lifts={lifts}
						values={{ ...lifts.benchpress }}
						setLifts={setLifts}
						hasError={errorMessage.fields.includes("benchpress")}
					/>
					<FormGroup
						name="Deadlift"
						onChange={onChange}
						lifts={lifts}
						values={{ ...lifts.deadlift }}
						setLifts={setLifts}
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
