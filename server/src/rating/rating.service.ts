import { MovieService } from "./../movie/movie.service";
import { Injectable } from "@nestjs/common";
import { RatingModel } from "./rating.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { Types } from "mongoose";
import { SetRatingDto } from "./dto/setRating.dto";

@Injectable()
export class RatingService {
	constructor(
		@InjectModel(RatingModel)
		private readonly ratingModel: ModelType<RatingModel>,
		private readonly movieService: MovieService
	) {}

	async getMovieValueByUser(movie: Types.ObjectId, user: Types.ObjectId) {
		return this.ratingModel
			.findOne({ movie, user })
			.select("value")
			.exec()
			.then((data) => (data ? data.value : 0));
	}

	async averageRatingByMovie(movieId: Types.ObjectId | string) {
		const ratingsMovie: RatingModel[] = await this.ratingModel
			.aggregate()
			.match({
				movieId: new Types.ObjectId(movieId),
			})
			.exec();

		return (
			ratingsMovie.reduce((acc, item) => acc + item.value, 0) /
			ratingsMovie.length
		);
	}

	async setRating(userId: Types.ObjectId, dto: SetRatingDto) {
		const { movieId, value } = dto;
		const newRating = await this.ratingModel
			.findOneAndUpdate(
				{ movieId, userId },
				{
					movieId,
					userId,
					value,
				},
				{
					new: true,
					upsert: true,
					setDefaultsOnInsert: true,
				}
			)
			.exec();

		const averageRating = await this.averageRatingByMovie(movieId);

		await this.movieService.updateRating(movieId, averageRating);

		return newRating;
	}
}
