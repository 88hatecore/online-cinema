import dynamic from "next/dynamic";
import { FC } from "react";

import Banner from "@/components/ui/banner/Banner";
import Gallery from "@/components/ui/gallery/Gallery";
import SubHeading from "@/components/ui/heading/SubHeading";

import Meta from "@/utils/meta/Meta";

import { IMoviePage } from "../../../../pages/movie/[slug]";

import Content from "./Content/Content";
import { useUpdateCountOpened } from "./useUpdateCountOpened";

const DynamicPlayer = dynamic(
	() => import("@/components/ui/video-player/VideoPlayer"),
	{
		ssr: false,
	}
);

const DynamicRating = dynamic(() => import("./Content/RateMovie/RateMovie"), {
	ssr: false,
});

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	useUpdateCountOpened(movie.slug);
	return (
		<Meta title={movie.title} description={`Watch ${movie.title}`}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			<DynamicPlayer slug={movie.slug} videoSource={movie.videoUrl} />

			<div className="mt-12">
				<SubHeading title="Similar" />
				<Gallery items={similarMovies} />
			</div>

			<DynamicRating slug={movie.slug} id={movie._id} />
		</Meta>
	);
};

export default SingleMovie;
