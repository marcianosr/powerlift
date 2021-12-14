import React, { FC, useState } from "react";
import { Lifts } from "../../types";
import Label from "../Label";
import RadioButton from "../RadioButton";
import styles from "./styles.module.scss";

type RPE = {
	color:
		| "green"
		| "red"
		| "yellow"
		| "orange"
		| "purple"
		| "olive"
		| "darkyellow"
		| "darkorange"
		| "darkred";
	value: string;
};

const RPEs: RPE[] = [
	{
		color: "green",
		value: "6",
	},
	{
		color: "olive",
		value: "6.5",
	},
	{
		color: "yellow",
		value: "7",
	},
	{
		color: "darkyellow",
		value: "7.5",
	},
	{
		color: "orange",
		value: "8",
	},
	{
		color: "darkorange",
		value: "8.5",
	},
	{
		color: "red",
		value: "9",
	},
	{
		color: "darkred",
		value: "9.5",
	},
	{
		color: "purple",
		value: "10",
	},
];

type RPEContainerProps = {
	excersiseName: string;
	lifts: Lifts;
	setLifts: (lifts: Lifts) => void;
};

const RPEContainer: FC<RPEContainerProps> = ({
	excersiseName,
	lifts,
	setLifts,
}) => {
	const key = excersiseName.split(" ").join("").toLowerCase();

	return (
		<div className={styles.rpeContainer}>
			<div>
				{/* <h3 className={styles.title}>RPE</h3> */}
				<p className={styles.description}>
					Selecteer een <strong>RPE</strong> score op basis van je{" "}
					{excersiseName.toLowerCase()}.
				</p>
			</div>
			<div className={styles.buttonContainer}>
				{RPEs.map((rpe) => (
					<RadioButton
						key={rpe.value}
						id={`${excersiseName}-${rpe.value}`}
						name={`RPE-${excersiseName}`}
						value={rpe.value}
						color={rpe.color}
						checked={lifts[key].RPE === rpe.value}
						onChange={() => {
							setLifts({
								...lifts,
								[key]: {
									...lifts[key],
									RPE: rpe.value,
								},
							});
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default RPEContainer;
