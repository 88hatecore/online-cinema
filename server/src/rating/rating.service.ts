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

	async averageRatingbyMovie(movieId: Types.ObjectId | string) {
		const ratingsMovie: RatingModel[] = await this.ratingModel
			.aggregate()
			.match({ movieId: new Types.ObjectId(movieId) })
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
					userId,
					movieId,
					value,
				},
				{ upsert: true, new: true, setDefaultsOnInsert: true }
			)
			.exec();

		const averageRating = await this.averageRatingbyMovie(movieId);

		await this.movieService.updateRating(movieId, averageRating);

		return newRating;
	}

	async getMovieValueByUser(movieId: Types.ObjectId, userId: Types.ObjectId) {
		return this.ratingModel
			.findOne({ movieId, userId })
			.select("value")
			.exec()
			.then((data) => (data ? data.value : 0));
	}
}
