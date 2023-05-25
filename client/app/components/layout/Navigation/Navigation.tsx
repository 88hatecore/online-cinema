import { FC } from "react";

import Logo from "./Logo";
import MenuContainer from "./MenuContainer/MenuCotainer";
import styles from "./Navigation.module.scss";
import MenuItem from "./MenuContainer/MenuItem";

const Navigation: FC = () => {
	return (
		<div className={styles.navigation}>
			<Logo />
			<MenuContainer />
		</div>
	);
};

export default Navigation;
