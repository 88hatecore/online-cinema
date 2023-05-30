import { getAdminUrl } from "config/url.config";
import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface";

import { useDebounce } from "@/hooks/useDebounce";

import { MovieService } from "@/services/movie.service";

import { getGenresList } from "@/utils/movie/getGenresList";
import { toastError } from "@/utils/toast-error";

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		["movie list", debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					})
				),

			onError: (error) => {
				toastError(error, "Movie list");
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		"delete list",
		(movieId: string) => MovieService.deleteMovie(movieId),
		{
			onError: (error) => {
				toastError(error, "Delete movie");
			},
			onSuccess: () => {
				toastr.success("Delete movie", "delete was successfull");
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
