import { Injectable, NotFoundException } from "@nestjs/common";
import { MovieModel } from "./movie.model";
import { InjectModel } from "nestjs-typegoose";
import { ModelType, DocumentType } from "@typegoose/typegoose/lib/types";
import { UpdateMovieDto } from "./dto/updateMovie.dto";
import { Types } from "mongoose";

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel) private readonly movieModel: ModelType<MovieModel>
	) {}

	async getAll(searchTerm?: string): Promise<DocumentType<MovieModel>[]> {
		let options = {};

		if (searchTerm) {
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, "i"),
					},
				],
			};
		}

		return this.movieModel
			.find(options)
			.select("-updatedAt -__v")
			.sort({ createdAt: "desc" })
			.populate("genres actors")
			.exec();
	}

	async bySlug(slug: string): Promise<DocumentType<MovieModel>> {
		return this.movieModel.findOne({ slug }).populate("genres actors").exec();
	}

	async byActor(actorId: Types.ObjectId): Promise<DocumentType<MovieModel>[]> {
		return this.movieModel.find({ actors: actorId }).exec();
	}

	async byGenres(
		genreIds: Types.ObjectId[]
	): Promise<DocumentType<MovieModel>[]> {
		return this.movieModel.find({ genres: { $in: genreIds } }).exec();
	}

	async updateCountOpened(slug: string) {
		return this.movieModel
			.findOneAndUpdate({ slug }, { $inc: { countOpened: 1 } })
			.exec();
	}

	// admin
	async byId(id: string): Promise<DocumentType<MovieModel>> {
		return this.movieModel.findById(id).exec();
	}

	async create(): Promise<Types.ObjectId> {
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

	async update(
		_id: string,
		dto: UpdateMovieDto
	): Promise<DocumentType<MovieModel> | null> {
		return this.movieModel
			.findByIdAndUpdate(_id, dto, {
				new: true,
			})
			.exec();
	}

	async delete(id: string) {
		const deleteDoc = await this.movieModel.findByIdAndDelete(id).exec();
		if (!deleteDoc) throw new NotFoundException("Movie not found");

		return deleteDoc;
	}

	async getMostPopular(): Promise<DocumentType<MovieModel>[]> {
		return this.movieModel
			.find({ countOpened: { $gt: 0 } })
			.sort({ countOpened: -1 })
			.populate("genres")
			.exec();
	}

	async updateRating(id: Types.ObjectId, newRating: number) {
		return this.movieModel
			.findByIdAndUpdate(
				id,
				{
					rating: newRating,
				},
				{
					new: true,
				}
			)
			.exec();
	}
}
