import { FC } from "react";

import styles from "./Layout.module.scss";
import Navigation from "./Navigation/Navigation";
import Sidebar from "./Sidebar/Sidebar";

const Layout: FC = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Navigation />
			<div className={styles.center}>{children}</div>
			<Sidebar />
		</div>
	);
};

export default Layout;
