import { Injectable, NotFoundException } from "@nestjs/common";
import { MovieModel } from "./movie.model";
import { InjectModel } from "nestjs-typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { UpdateMovieDto } from "./dto/updateMovie.dto";
import { Types } from "mongoose";
import { GenreIdsGto } from "./dto/genreIds.dto";

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel) private readonly movieModel: ModelType<MovieModel>
	) {}

	async getAll(searchTerm?: string) {
		let options = {};

		if (searchTerm)
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, "i"),
					},
				],
			};

		return this.movieModel
			.find(options)
			.select("-updatedAt -__v")
			.sort({
				createdAt: "desc",
			})
			.exec();
	}

	async bySlug(slug: string) {
		const doc = await this.movieModel.findOne({ slug }).exec();
		if (!doc) throw new NotFoundException("Movie not found");
		return doc;
	}

	async byActor(actorId: Types.ObjectId) {
		const docs = await this.movieModel.find({ actors: actorId }).exec();
		if (!docs) throw new NotFoundException("Movies not found");
		return docs;
	}

	async byGenres(genreIds: GenreIdsGto) {
		const docs = await this.movieModel
			.find({ genres: { $in: genreIds } })
			.exec();
		if (!docs) throw new NotFoundException("Movies not found");
		return docs;
	}

	async getMostPopular() {
		return this.movieModel
			.find({ countOpened: { $gt: 0 } })
			.sort({ countOpened: -1 })
			.populated("geners")
			.exec();
	}

	async updateCountOpened(slug: string) {
		const updateDoc = await this.movieModel
			.findOneAndUpdate(
				{ slug },
				{
					$inc: { countOpened: 1 },
				},
				{
					new: true,
				}
			)
			.exec();
		if (!updateDoc) throw new NotFoundException("Movie not found");

		return updateDoc;
	}

	// admin
	async byId(_id: string) {
		const doc = await this.movieModel.findById(_id);
		if (!doc) throw new NotFoundException("Movie not found!");

		return doc;
	}

	async create() {
		const defaultValue: UpdateMovieDto = {
			bigPoster: "",
			actors: [],
			genres: [],
			poster: "",
			title: "",
			videoUrl: "",
			slug: "",
		};
		const movie = await this.movieModel.create(defaultValue);
		return movie._id;
	}

	async update(_id: string, dto: UpdateMovieDto) {
		const updateDoc = await this.movieModel
			.findByIdAndUpdate(_id, dto, {
				new: true,
			})
			.exec();
		if (!updateDoc) throw new NotFoundException("Movie not found");

		return updateDoc;
	}

	async delete(id: string) {
		const deleteDoc = await this.movieModel.findByIdAndDelete(id).exec();
		if (!deleteDoc) throw new NotFoundException("Movie not found");

		return deleteDoc;
	}
}
