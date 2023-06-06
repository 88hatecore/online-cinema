import { useQuery } from "react-query";

import { ActorService } from "@/services/actor.service";

import { toastError } from "@/utils/toast-error";

import { IOptions } from "../../../ui/select/select.interface";

export const useAdminActors = () => {
	const queryData = useQuery("List of actor", () => ActorService.getAll(), {
		select: ({ data }) =>
			data.map(
				(actor): IOptions => ({
					label: actor.name,
					value: actor._id,
				})
			),
		onError: (error) => {
			toastError(error, "Actor list");
		},
	});

	return queryData;
};
