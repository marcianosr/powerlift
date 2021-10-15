import { Lifts } from "../../types";

export const createLift = async (lifts: Lifts) => {
	const response = await fetch("api/lift/add-lift", {
		method: "POST",
		body: JSON.stringify({ lifts }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Something went wrong!");
	}

	return data;
};
