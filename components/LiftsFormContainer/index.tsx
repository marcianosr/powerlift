import { format } from "date-fns";
import { useSession } from "next-auth/client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Lifts } from "../../types";
import LoginSignUpModal from "../Login/LoginSignUpModal";
import LiftsForm from "./LiftsForm";

type LiftsFormContainerProps = {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	date?: string;
};

const LiftsFormContainer: React.VFC<LiftsFormContainerProps> = ({
	showModal,
	setShowModal,
	date,
}) => {
	const [session] = useSession();

	if (!session && showModal) {
		return (
			<LoginSignUpModal setShowModal={setShowModal} modalType="login" />
		);
	}

	const [lifts, setLifts] = useState<Lifts>({
		squat: { weight: null, sets: null, reps: null, RPE: null },
		benchpress: { weight: null, sets: null, reps: null, RPE: null },
		deadlift: { weight: null, sets: null, reps: null, RPE: null },
	});

	console.log("lifts", lifts);

	const [isLoading, setIsLoading] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);

	const checkForSubmittedLiftsToday = async () => {
		const today = new Date();
		const formattedTodaysDate = format(today, "dd-MM-yyyy");

		const response = await fetch("/api/lift/check-lifts", {
			method: "POST",
			body: date ? date : formattedTodaysDate, // somehow I don't need stringify here because it's applying quotes on the string?
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || "Something went wrong!");
		}

		if (data.lifts?.lifts) {
			console.log("data", data.lifts);
			setShowUpdateModal(true);

			setLifts({
				...data.lifts.lifts,
			});
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
				[liftField]:
					e.currentTarget.value !== "" ? e.currentTarget.value : null,
			},
		});
	};

	useEffect(() => {
		setIsLoading(true);
		checkForSubmittedLiftsToday()
			.then((value) => {
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				console.log(error);
			});
	}, []);

	const clearForm = () => setLifts({});

	return showModal ? (
		<LiftsForm
			setShowModal={setShowModal}
			lifts={lifts}
			setLifts={setLifts}
			isLoading={isLoading}
			showUpdateModal={showUpdateModal}
			clearForm={clearForm}
			onChange={onChange}
		/>
	) : null;
};

export default LiftsFormContainer;
