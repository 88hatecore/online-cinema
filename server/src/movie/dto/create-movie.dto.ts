import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsObject,
	IsString,
} from 'class-validator'

export class Parameter {
	@IsNumber()
	year: number

	@IsNumber()
	duration: number

	@IsString()
	country: string
}

export class CreateMovieDto {
	@IsString()
	poster: string

	@IsString()
	bigPoster: string

	@IsString()
	title: string

	@IsString()
	description: string

	@IsObject()
	parameters?: Parameter

	@IsArray()
	@IsString({ each: true })
	genres: string[]

	@IsArray()
	@IsString({ each: true })
	actors: string[]

	@IsString()
	videoUrl: string

	@IsString()
	slug: string

	@IsBoolean()
	isSendTelegram?: boolean
}
