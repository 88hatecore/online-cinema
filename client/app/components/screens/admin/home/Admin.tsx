import { FC } from "react";

import AdminNavigation from "@/components/ui/admin-navigation/AdminNavigation";
import Heading from "@/components/ui/heading/Heading";

import Meta from "@/utils/meta/Meta";

import Statistics from "./Statistics/Staticstics";

const Admin: FC = () => {
	return (
		<Meta title="Admin panel">
			<AdminNavigation />
			<Heading title="Some statistics" />
			<Statistics />
		</Meta>
	);
};

export default Admin;
