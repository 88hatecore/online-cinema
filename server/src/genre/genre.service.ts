import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { GenreModel } from "./genre.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { CreateGenreDto } from "./dto/createGenre.dto";
import { MovieService } from "src/movie/movie.service";
import { ICollection } from "./interfaces/genre.interface";

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>,
		private readonly movieService: MovieService
	) {}

	async bySlug(slug: string) {
		const doc = await this.GenreModel.findOne({ slug }).exec();
		if (!doc) throw new NotFoundException("Genre not found");
		return doc;
	}

	async getAll(searchTerm?: string) {
		let options = {};

		if (searchTerm)
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, "i"),
					},
					{
						slug: new RegExp(searchTerm, "i"),
					},
					{
						description: new RegExp(searchTerm, "i"),
					},
				],
			};
		return this.GenreModel.find(options)
			.select("-updatedAt -__v")
			.sort({
				createdAt: "desc",
			})
			.exec();
	}

	async getCollections(): Promise<ICollection[]> {
		const genres = await this.getAll();

		const collections = await Promise.all(
			genres.map(async (genre) => {
				const moviesByGenre = await this.movieService.byGenres([genre._id]);

				const result: ICollection = {
					_id: String(genre._id),
					title: genre.name,
					slug: genre.slug,
					image: moviesByGenre[0].bigPoster,
				};

				return result;
			})
		);

		return collections;
	}

	// admin
	async byId(_id: string) {
		const genre = await this.GenreModel.findById(_id);
		if (!genre) throw new NotFoundException("Genre not found!");

		return genre;
	}

	async getCount() {
		return this.GenreModel.find().count().exec();
	}

	async create() {
		const defaultValue: CreateGenreDto = {
			name: "",
			slug: "",
			description: "",
			icon: "",
		};
		const genre = await this.GenreModel.create(defaultValue);
		return genre._id;
	}

	async update(_id: string, dto: CreateGenreDto) {
		const updateDoc = await this.GenreModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec();
		if (!updateDoc) throw new NotFoundException("Genre not found");

		return updateDoc;
	}

	async delete(id: string) {
		const deleteDoc = await this.GenreModel.findByIdAndDelete(id).exec();
		if (!deleteDoc) throw new NotFoundException("Genre not found");

		return deleteDoc;
	}
}
