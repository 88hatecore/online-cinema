import dynamic from "next/dynamic";
import { FC } from "react";

import PopularMovies from "./PopularMovies";

const DynamicTextEditor = dynamic(
	() => import("./FavoriteMovies/FavoriteMovies"),
	{
		ssr: false,
	}
);

const MovieContainer: FC = () => {
	return (
		<div>
			<PopularMovies />
			<DynamicTextEditor />
		</div>
	);
};

export default MovieContainer;
