import { FC } from "react";

import AdminNavigation from "@/components/ui/admin-navigation/AdminNavigation";
import AdminHeader from "@/components/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/components/ui/admin-table/AdminTable/AdminTable";
import Heading from "@/components/ui/heading/Heading";

import Meta from "@/utils/meta/Meta";

import { useActors } from "./useActors";

const ActorList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		createAsync,
		deleteAsync,
	} = useActors();

	return (
		<Meta title="Actors">
			<AdminNavigation />
			<Heading title="Actors" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={["Name", "Count movies"]}
				tableItems={data || []}
			/>
		</Meta>
	);
};

export default ActorList;
