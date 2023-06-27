import { useQuery } from "react-query";

import { UserService } from "@/services/user.service";

export const useFavorites = () => {
	const {
		isLoading,
		data: favoritesMovies,
		refetch,
	} = useQuery("Favorite movies", () => UserService.getFavorites(), {
		select: ({ data }) => data,
	});

	return { isLoading, favoritesMovies, refetch };
};
