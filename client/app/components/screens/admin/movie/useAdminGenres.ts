import { useQuery } from "react-query";

import { GenreService } from "@/services/genre.service";

import { toastError } from "@/utils/toast-error";

import { IOptions } from "../../../ui/select/select.interface";

export const useAdminGenres = () => {
	const queryData = useQuery("List of genre", () => GenreService.getAll(), {
		select: ({ data }) =>
			data.map(
				(genre): IOptions => ({
					label: genre.name,
					value: genre._id,
				})
			),
		onError: (error) => {
			toastError(error, "Genre list");
		},
	});

	return queryData;
};
