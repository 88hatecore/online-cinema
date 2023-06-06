import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { ServeStaticModule } from "@nestjs/serve-static";
import { path } from "app-root-path";

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: "/uploads",
		}),
	],
	providers: [FileService],
	controllers: [FileController],
})
export class FileModule {}
