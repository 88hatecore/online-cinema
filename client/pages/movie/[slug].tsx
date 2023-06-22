import { getMovieUrl } from "config/url.config";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import SingleMovie from "@/components/screens/single-movie/SingleMovie";
import { IGalleryItem } from "@/components/ui/gallery/gallery.interface";

import { IMovie } from "@/shared/types/movie.types";

import { MovieService } from "@/services/movie.service";

import Error404 from "../404";

export interface IMoviePage {
	movie: IMovie;
	similarMovies: IGalleryItem[];
}

const MoviePage: NextPage<IMoviePage> = ({ movie, similarMovies }) => {
	return movie ? (
		<SingleMovie movie={movie} similarMovies={similarMovies || []} />
	) : (
		<Error404 />
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getAll();
		const paths = movies.map((movie) => ({
			params: { slug: movie.slug },
		}));

		return { paths, fallback: "blocking" };
	} catch (error) {
		return { paths: [], fallback: false };
	}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(String(params?.slug));
		const { data: dataSimilarMovies } = await MovieService.getByGenres(
			movie.genres.map((genre) => genre._id)
		);

		const similarMovies: IGalleryItem[] = dataSimilarMovies
			.filter((m) => movie._id !== m._id)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: getMovieUrl(m.slug),
			}));

		return {
			props: {
				movie,
				similarMovies,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default MoviePage;
