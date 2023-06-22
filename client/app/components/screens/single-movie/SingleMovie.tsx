import { FC } from "react";

import Banner from "@/components/ui/banner/Banner";
import Gallery from "@/components/ui/gallery/Gallery";
import SubHeading from "@/components/ui/heading/SubHeading";

import Meta from "@/utils/meta/Meta";

import { IMoviePage } from "../../../../pages/movie/[slug]";

import Content from "./Content/Content";

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	return (
		<Meta title={movie.title} description={`Watch ${movie.title}`}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			{/* vid player */}

			<div className="mt-12">
				<SubHeading title="Similar" />
				<Gallery items={similarMovies} />
			</div>

			{/* raiting */}
		</Meta>
	);
};

export default SingleMovie;
