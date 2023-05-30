import { getAdminUrl } from "config/url.config";
import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface";

import { useDebounce } from "@/hooks/useDebounce";

import { UserService } from "@/services/user.service";

import { converMongoDate } from "@/utils/date/convertMongoDate";
import { toastError } from "@/utils/toast-error";

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		["user list", debouncedSearch],
		() => UserService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editUrl: getAdminUrl(`user/edit/${user._id}`),
						items: [user.email, converMongoDate(user.createdAt)],
					})
				),

			onError: (error) => {
				toastError(error, "User list");
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		"delete list",
		(userId: string) => UserService.deleteUser(userId),
		{
			onError: (error) => {
				toastError(error, "Delete user");
			},
			onSuccess: () => {
				toastr.success("Delete user", "delete was successfull");
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
