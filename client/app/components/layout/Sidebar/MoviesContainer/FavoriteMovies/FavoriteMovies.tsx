import { FC } from "react";

import { useFavorites } from "@/components/screens/favorites/useFavorites";
import SkeletonLoader from "@/components/ui/SkeletonLoader";

import { useAuth } from "@/hooks/useAuth";

import MovieList from "../MovieList";

import NotAuthFavorites from "./NotAuthFavorites";

const FavoriteMovies: FC = () => {
	const { favoritesMovies, isLoading } = useFavorites();
	const { user } = useAuth();

	if (!user) return <NotAuthFavorites />;

	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MovieList
			list={{
				link: "/favorites",
				movies: favoritesMovies?.slice(0, 3) || [],
				title: "Favorites",
			}}
		/>
	);
};

export default FavoriteMovies;
