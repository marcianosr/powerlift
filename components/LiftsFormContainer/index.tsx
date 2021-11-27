import { useSession } from "next-auth/client";
import React, {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import LoginModal from "../Login/LoginModal";
import LiftsForm from "./LiftsForm";

type LiftsFormContainerProps = {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
};

const LiftsFormContainer: React.VFC<LiftsFormContainerProps> = ({
	showModal,
	setShowModal,
}) => {
	const [session] = useSession();

	if (!session && showModal) {
		return <LoginModal setShowModal={setShowModal} />;
	}

	const [lifts, setLifts] = useState<any>({
		squat: { weight: null, sets: null, reps: null },
		benchpress: { weight: null, sets: null, reps: null },
		deadlift: { weight: null, sets: null, reps: null },
	});
	const [isLoading, setIsLoading] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);

	const checkForSubmittedLiftsToday = async () => {
		const response = await fetch("/api/lift/check-lifts");

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
			isLoading={isLoading}
			showUpdateModal={showUpdateModal}
			clearForm={clearForm}
			onChange={onChange}
		/>
	) : null;
};

export default LiftsFormContainer;
