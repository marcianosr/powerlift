import { Lifts } from "../../types";

export const createLift = async (lifts: Lifts) => {
	const response = await fetch("/api/lift/add-lifts", {
		method: "POST",
		body: JSON.stringify({ lifts }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(
			JSON.stringify({ message: data.message, fields: data.fields }) ||
				"Something went wrong!"
		);
	}

	return data;
};
