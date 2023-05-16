import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsObject,
	IsString,
} from "class-validator";

export class Parameters {
	@IsNumber()
	year: number;

	@IsNumber()
	duration: number;

	@IsString()
	county: string;
}

export class CreateMovieDto {
	@IsString()
	poster: string;

	@IsString()
	bigPoster: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsString()
	slug: string;

	@IsObject()
	parametrs?: Parameters;

	@IsString()
	videoUrl: string;

	@IsArray()
	@IsString({ each: true })
	genres: string[];

	@IsArray()
	@IsString({ each: true })
	actors: string[];

	@IsBoolean()
	isSendTelegram?: boolean;
}
