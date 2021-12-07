import React, { useState, FC } from "react";
import LaneContainer from ".";
import { User } from "../../types";
import FilterBar from "../FilterBar";
import LaneHeader from "../LaneHeader";
import LiftsFormContainer from "../LiftsFormContainer";
import styles from "./styles.module.css";

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
			<section className={styles.wrapper}>
				{data.length > 0 && status === "success" ? (
					<>
						<FilterBar />
						<LaneContainer users={data} />
					</>
				) : (
					<p>
						Er zijn vandaag nog geen lifts toegevoegd! Ben jij de
						eerste?
					</p>
				)}
			</section>
			<LiftsFormContainer
				showModal={showModal}
				setShowModal={setShowModal}
				date={date}
			/>
		</>
	);
};

export default Wrapper;
