import {
	Body,
	Controller,
	Get,
	UsePipes,
	ValidationPipe,
	Put,
  Post,
	HttpCode,
	Delete,
	Param,
	Query,
} from "@nestjs/common";
import { GenreService } from "./genre.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { IdValidationPipe } from "src/pipes/idValidation.pipe";
import { CreateGenreDto } from "./dto/createGenre.dto";

@Controller("genres")
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get("by-slug/:slug")
	async bySlug(@Param("slug") slug: string) {
		return this.genreService.bySlug(slug);
	}

	@Get("/collections")
	async getCollections() {
		return this.genreService.getCollections();
	}

	@Get()
	async getAll(@Query("searchTerm") searchTerm?: string) {
		return this.genreService.getAll(searchTerm);
	}

	@Get(":id")
	@Auth("admin")
	async get(@Param("id", IdValidationPipe) id: string) {
		return this.genreService.byId(id);
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth("admin")
	async create() {
		return this.genreService.create();
	}

	@UsePipes(new ValidationPipe())
	@Put(":id")
	@HttpCode(200)
	@Auth("admin")
	async update(
		@Param("id", IdValidationPipe) id: string,
		@Body() dto: CreateGenreDto
	) {
		return this.genreService.update(id, dto);
	}

	@Delete(":id")
	@HttpCode(200)
	@Auth("admin")
	async delete(@Param("id", IdValidationPipe) id: string) {
		return this.genreService.delete(id);
	}
}
