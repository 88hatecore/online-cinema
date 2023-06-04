import { FC } from "react";

import AdminNavigation from "@/components/ui/admin-navigation/AdminNavigation";
import AdminHeader from "@/components/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/components/ui/admin-table/AdminTable/AdminTable";
import Heading from "@/components/ui/heading/Heading";

import Meta from "@/utils/meta/Meta";

import { useGenres } from "./useGenres";

const GenreList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		createAsync,
		deleteAsync,
	} = useGenres();

	return (
		<Meta title="Genres">
			<AdminNavigation />
			<Heading title="Genres" />

			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={["Name", "Slug"]}
				tableItems={data || []}
			/>
		</Meta>
	);
};

export default GenreList;
