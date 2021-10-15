import React from "react";

type FormGroupProps = {
	name: string;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
	values: {
		weight?: number;
		sets?: number;
		reps?: number;
	};
};
const FormGroup: React.VFC<FormGroupProps> = ({ name, onChange, values }) => {
	const formName = name.toLowerCase().split(" ").join("");

	return (
		<>
			<h3>{name}</h3>

			<label htmlFor={`${formName}-weight`}>weight</label>
			<input
				name={`${formName}-weight`}
				id={`${formName}-weight`}
				type="number"
				value={values.weight || ""}
				onChange={onChange}
			/>

			<label htmlFor={`${formName}-sets`}>sets</label>
			<input
				name={`${formName}-sets`}
				id={`${formName}-sets`}
				type="number"
				value={values.sets || ""}
				onChange={onChange}
			/>

			<label htmlFor={`${formName}-reps`}>reps</label>
			<input
				name={`${formName}-reps`}
				id={`${formName}-reps`}
				type="number"
				value={values.reps || ""}
				onChange={onChange}
			/>
		</>
	);
};

export default FormGroup;
