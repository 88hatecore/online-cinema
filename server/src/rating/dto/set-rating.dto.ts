import { IsNumber, IsString } from "class-validator";

export class SetRatingDto {
	@IsString()
	movieId: string;

	@IsNumber()
	value: number;
}
