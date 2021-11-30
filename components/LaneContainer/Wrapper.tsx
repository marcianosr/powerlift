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
			{data.length > 0 && status === "success" ? (
				<LaneContainer users={data} />
			) : (
				<p>
					Er zijn vandaag nog geen lifts toegevoegd! Ben jij de
					eerste?
				</p>
			)}
			<LiftsFormContainer
				showModal={showModal}
				setShowModal={setShowModal}
			/>
		</>
	);
};

export default Wrapper;
