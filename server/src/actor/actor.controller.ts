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
import { Auth } from "src/auth/decorators/auth.decorator";
import { IdValidationPipe } from "src/pipes/idValidation.pipe";
import { ActorDto } from "./dto/actor.dto";
import { ActorService } from "./actor.service";

@Controller("actors")
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Get()
	async getAll(@Query("searchTerm") searchTerm?: string) {
		return this.actorService.getAll(searchTerm);
	}

	@Get("by-slug/:slug")
	async bySlug(@Param("slug") slug: string) {
		return this.actorService.bySlug(slug);
	}

	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth("admin")
	async create() {
		return this.actorService.create();
	}

	@Get(":id")
	@Auth("admin")
	async get(@Param("id", IdValidationPipe) id: string) {
		return this.actorService.byId(id);
	}

	@UsePipes(new ValidationPipe())
	@Put(":id")
	@HttpCode(200)
	@Auth("admin")
	async update(
		@Param("id", IdValidationPipe) id: string,
		@Body() dto: ActorDto
	) {
		const updateActor = await this.actorService.update(id, dto);
		if (!updateActor) throw new NotFoundException("Actor not found");
		return updateActor;
	}

	@Delete(":id")
	@Auth("admin")
	async delete(@Param("id", IdValidationPipe) id: string) {
		const deletedDoc = await this.actorService.delete(id);
		if (!deletedDoc) throw new NotFoundException("Actor not found");
	}
}
