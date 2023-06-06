import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";

import { Types } from "mongoose";
import { Auth } from "src/auth/decorators/Auth.decorator";
import { User } from "src/user/decorators/user.decorator";
import { SetRatingDto } from "./dto/setRating.dto";
import { RatingService } from "./rating.service";
import { IdValidationPipe } from "src/pipes/idValidation.pipe";

@Controller("ratings")
export class RatingController {
	constructor(private readonly ratingService: RatingService) {}

	@UsePipes(new ValidationPipe())
	@Post("set-rating")
	@HttpCode(200)
	@Auth()
	async setRating(
		@User("_id") userId: Types.ObjectId,
		@Body()
		dto: SetRatingDto
	) {
		return this.ratingService.setRating(userId, dto);
	}

	@Get("/:movieId")
	@Auth()
	async getMovieValueByUser(
		@Param("movieId", IdValidationPipe) movieId: Types.ObjectId,
		@User("_id") userId: Types.ObjectId
	) {
		return this.ratingService.getMovieValueByUser(movieId, userId);
	}
}
