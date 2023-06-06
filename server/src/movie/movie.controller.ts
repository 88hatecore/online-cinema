import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { IdValidationPipe } from "../pipes/id.validation.pipe";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { MovieService } from "./movie.service";
import { Auth } from "src/auth/decorators/Auth.decorator";
import { Types } from "mongoose";

@Controller("movies")
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get("by-slug/:slug")
	async bySlug(@Param("slug") slug: string) {
		return this.movieService.bySlug(slug);
	}

	@Get("by-actor/:actorId")
	async byActor(@Param("actorId", IdValidationPipe) actorId: Types.ObjectId) {
		return this.movieService.byActor(actorId);
	}

	@Post("by-genres")
	@HttpCode(200)
	async byGenres(
		@Body("genreIds")
		genreIds: Types.ObjectId[]
	) {
		return this.movieService.byGenres(genreIds);
	}

	@Get()
	async getAll(@Query("searchTerm") searchTerm?: string) {
		return this.movieService.getAll(searchTerm);
	}

	@Get("/most-popular")
	async getMostPopular() {
		return this.movieService.getMostPopular();
	}

	@Post("/update-count-opened")
	@HttpCode(200)
	async updateCountOpened(@Body("slug") slug: string) {
		return this.movieService.updateCountOpened(slug);
	}

	@Get(":id")
	@Auth("admin")
	async get(@Param("id", IdValidationPipe) id: string) {
		return this.movieService.byId(id);
	}

	@Post()
	@HttpCode(200)
	@Auth("admin")
	async create() {
		return this.movieService.create();
	}

	@UsePipes(new ValidationPipe())
	@Put(":id")
	@HttpCode(200)
	@Auth("admin")
	async update(
		@Param("id", IdValidationPipe) id: string,
		@Body() dto: CreateMovieDto
	) {
		const updateMovie = await this.movieService.update(id, dto);
		if (!updateMovie) throw new NotFoundException("Movie not found");
		return updateMovie;
	}

	@Delete(":id")
	@Auth("admin")
	async delete(@Param("id", IdValidationPipe) id: string) {
		const deletedDoc = await this.movieService.delete(id);
		if (!deletedDoc) throw new NotFoundException("Movie not found");
	}
}
