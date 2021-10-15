import React, { useEffect, useState } from "react";
import { createLift } from "./createLift";
import FormGroup from "./FormGroup";

const LiftsForm: React.VFC = () => {
	const [lifts, setLifts] = useState<any>({});
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
		createLift(lifts);
		clearForm();
	};

	const clearForm = () => setLifts({});

	return (
		<section>
			<form onSubmit={onSubmit}>
				<FormGroup
					name="Squat"
					onChange={onChange}
					values={{ ...lifts.squat }}
				/>
				<FormGroup
					name="Bench press"
					onChange={onChange}
					values={{ ...lifts.benchpress }}
				/>
				<FormGroup
					name="Deadlift"
					onChange={onChange}
					values={{ ...lifts.deadlift }}
				/>
				<button type="submit">Delen</button>
			</form>
		</section>
	);
};

export default LiftsForm;
