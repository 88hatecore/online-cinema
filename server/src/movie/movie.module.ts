import { Module } from "@nestjs/common";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { MovieModel } from "./movie.model";
import { TypegooseModule } from "nestjs-typegoose";
import { TelegramModule } from "src/telegram/telegram.module";
import { UserModule } from "src/user/user.module";

@Module({
	controllers: [MovieController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: MovieModel,
				schemaOptions: {
					collection: "Movie",
				},
			},
		]),
		TelegramModule,
		UserModule,
	],
	providers: [MovieService],
	exports: [MovieService],
})
export class MovieModule {}
