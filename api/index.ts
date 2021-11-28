import { format } from "date-fns";
import { Lifts, UserResponse } from "../types";

export const getLiftsFromUsers = async (
	cookie: string | undefined,
	date?: string
) => {
	const today = new Date();
	const formattedTodaysDate = format(today, "dd-MM-yyyy");

	const response = await fetch("http://localhost:3000/api/lift/get-lifts", {
		headers: {
			Cookie: cookie || "",
			"Content-Type": "application/json",
		},
		method: "POST",
		body: date ? JSON.stringify(date) : JSON.stringify(formattedTodaysDate),
	});

	if (!response.ok) {
		const error = await response.json();
	}
	const result = (await response.json()) as UserResponse;

	// console.log("result", result);

	return result.data;
};

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

export const createUser = async ({
	email,
	displayName,
	gender,
	weightClass,
	club,
	password,
}: any) => {
	const response = await fetch("api/auth/signup", {
		method: "POST",
		body: JSON.stringify({
			email,
			displayName,
			gender,
			weightClass,
			club,
			password,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw { message: data.message, fields: data.fields };
	}

	return data;
};
