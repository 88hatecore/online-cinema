import { FC } from "react";

import AdminNavigation from "@/components/ui/admin-navigation/AdminNavigation";
import AdminHeader from "@/components/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/components/ui/admin-table/AdminTable/AdminTable";
import Heading from "@/components/ui/heading/Heading";

import Meta from "@/utils/meta/Meta";

import { useActors } from "./useActors";

const ActorList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } =
		useActors();

	return (
		<Meta title="Actors">
			<AdminNavigation />
			<Heading title="Actors" />

			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={["Email", "Date register"]}
				tableItems={data || []}
			/>
		</Meta>
	);
};

export default ActorList;
