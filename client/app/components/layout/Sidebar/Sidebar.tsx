import { FC } from "react";

import MovieContainer from "./MoviesContainer/MoviesContainer";
import Search from "./Search/Search";
import styles from "./Sidebar.module.scss";

const Sidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<Search />
			<MovieContainer />
		</div>
	);
};

export default Sidebar;
