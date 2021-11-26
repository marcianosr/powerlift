import React, { useState, FC } from "react";
import LaneContainer from ".";
import { User } from "../../types";
import LaneHeader from "../LaneHeader";
import LiftsFormContainer from "../LiftsFormContainer";

type WrapperProps = {
	status: string;
	data: User[];
	date?: string;
};

const Wrapper: FC<WrapperProps> = ({ status, data, date }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<LaneHeader setShowModal={setShowModal} date={date} />
			{status === "loading" && <p>Loading...</p>}
			{status === "success" && <LaneContainer users={data} />}
			<LiftsFormContainer
				showModal={showModal}
				setShowModal={setShowModal}
			/>
		</>
	);
};

export default Wrapper;
