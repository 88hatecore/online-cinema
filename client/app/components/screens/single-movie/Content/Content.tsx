import { getActorUrl, getGenreUrl } from "config/url.config";
import { FC } from "react";

import MaterialIcon from "@/components/ui/MaterialIcon";

import { IMovie } from "@/shared/types/movie.types";

import FavoriteButton from "../FavoriteButton/FavoriteButton";

import styles from "./Content.module.scss";
import ContentList from "./ContentList/ContentList";

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.content}>
			<h1>{movie.title}</h1>
			<div className={styles.details}>
				<span>{movie.parameters.year} · </span>
				<span>{movie.parameters.country} · </span>
				<span>{movie.parameters.duration} min.</span>

				<ContentList
					name="Genres"
					links={movie.genres.slice(0, 3).map((genre) => ({
						_id: genre._id,
						link: getGenreUrl(genre.slug),
						title: genre.name,
					}))}
				/>

				<ContentList
					name="Actors"
					links={movie.actors.slice(0, 3).map((actor) => ({
						_id: actor._id,
						link: getActorUrl(actor.slug),
						title: actor.name,
					}))}
				/>

				<div className={styles.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>{movie.rating.toFixed(1)}</span>
				</div>

				<FavoriteButton movieId={movie._id} />
			</div>
		</div>
	);
};

export default Content;
