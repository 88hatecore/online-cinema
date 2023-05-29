import { FC } from "react";

import styles from "../Admin.module.scss";

import CountUsers from "./CountUsers";
import PopularMovie from "./PopularMovie";

const Statistics: FC = () => {
	return (
		<div className={styles.statistics}>
			<CountUsers />
			<PopularMovie />
		</div>
	);
};

export default Statistics;
