import { getAdminUrl } from "config/url.config";
import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface";

import { useDebounce } from "@/hooks/useDebounce";

import { GenreService } from "@/services/genre.service";

import { toastError } from "@/utils/toast-error";

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		["gemre list", debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genre/edit/${genre._id}`),
						items: [genre.name, genre.slug],
					})
				),

			onError: (error) => {
				toastError(error, "Gemre list");
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		"delete list",
		(genreId: string) => GenreService.delete(genreId),
		{
			onError: (error) => {
				toastError(error, "Delete genre");
			},
			onSuccess: () => {
				toastr.success("Delete genre", "delete was successfull");
				queryData.refetch();
			},
		}
	);

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
		}),
		[queryData, searchTerm, deleteAsync]
	);
};
