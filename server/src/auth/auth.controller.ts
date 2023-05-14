import { AuthService } from "./auth.service";
import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe,
	HttpCode,
} from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly AuthService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("login")
	async login(@Body() dto: AuthDto) {
		return this.AuthService.login(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("register")
	async register(@Body() dto: AuthDto) {
		return this.AuthService.register(dto);
	}
}
