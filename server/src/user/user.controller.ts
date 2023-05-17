import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { User } from "./decorators/user.decorator";
import { UpadateUserDto } from "./dto/updateUser.dto";
import { IdValidationPipe } from "src/pipes/idValidation.pipe";
import { Types } from "mongoose";
import { UserModel } from "./user.model";

@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get("profile")
	@Auth()
	async getProfile(@User("_id") _id: string) {
		return this.userService.byId(_id);
	}

	@UsePipes(new ValidationPipe())
	@Put("profile")
	@HttpCode(200)
	@Auth()
	async updateProfile(@User("_id") _id: string, @Body() dto: UpadateUserDto) {
		return this.userService.updateProfile(_id, dto);
	}

	@Get("profile/favorites")
	@Auth()
	async getFavorites(@User("_id") _id: string) {
		return this.userService.getFavoriteMovies(_id);
	}

	@Post("profile/favorites")
	@HttpCode(200)
	@Auth()
	async toggleFavorite(
		@Body("movieId", IdValidationPipe) movieId: Types.ObjectId,
		@User() user: UserModel
	) {
		return this.userService.toggleFavorite(movieId, user);
	}

	@Get("count")
	@Auth("admin")
	async getCountUsers() {
		return this.userService.getCount();
	}

	@Get()
	@Auth("admin")
	async getUsers(@Query("searchTerm") searchTerm?: string) {
		return this.userService.getAll(searchTerm);
	}

	@Get(":id")
	@Auth("admin")
	async getUser(@Param("id", IdValidationPipe) id: string) {
		return this.userService.byId(id);
	}

	@UsePipes(new ValidationPipe())
	@Put(":id")
	@HttpCode(200)
	@Auth("admin")
	async updateUser(
		@Param("id", IdValidationPipe) id: string,
		@Body() dto: UpadateUserDto
	) {
		return this.userService.updateProfile(id, dto);
	}

	@Delete(":id")
	@HttpCode(200)
	@Auth("admin")
	async deleteUser(@Param("id", IdValidationPipe) id: string) {
		return this.userService.delete(id);
	}
}
