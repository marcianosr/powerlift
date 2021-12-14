import React from "react";
import styles from "./styles.module.css";

const Slider = () => {
	const onChange = (e: React.ChangeEvent) => {
		console.log(e.target);
	};

	return (
		<div className={styles.sliderContainer}>
			<input
				className={styles.slider}
				type="range"
				max={RPEs.reduce((acc, rpe) => {
					return Math.max(acc, +rpe.value);
				}, +RPEs[0].value)}
				min={RPEs.reduce((acc, rpe) => {
					return Math.min(acc, +rpe.value);
				}, +RPEs[0].value)}
				id="slider"
				name="volume"
				step={0.5}
				onChange={onChange}
			/>
		</div>
	);
};

export default Slider;
