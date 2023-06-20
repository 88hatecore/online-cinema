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

export class UpdateMovieDto {
	@IsString()
	poster: string;

	@IsString()
	bigPoster: string;

	@IsString()
	title: string;

	@IsObject()
	parameters?: Parameters;

	@IsArray()
	@IsString({ each: true })
	genres: string[];

	@IsArray()
	@IsString({ each: true })
	actors: string[];

	@IsString()
	videoUrl: string;

	@IsString()
	slug: string;
}
