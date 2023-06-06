import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Auth } from "src/auth/decorators/Auth.decorator";
import { FileResponse } from "./dto/file.response";
import { FilesService } from "./files.service";

@Controller("files")
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post()
	@HttpCode(200)
	@Auth("admin")
	@UseInterceptors(FileInterceptor("image"))
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@Query("folder") folder?: string
	): Promise<FileResponse[]> {
		return this.filesService.saveFiles([file], folder);
	}
}
