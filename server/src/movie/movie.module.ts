import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { TelegramModule } from "src/telegram/telegram.module";
import { UserModule } from "src/user/user.module";
import { MovieController } from "./movie.controller";
import { MovieModel } from "./movie.model";
import { MovieService } from "./movie.service";

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
