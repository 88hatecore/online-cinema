import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserModel } from "src/user/user.model";

@Injectable()
export class OnlyAdminGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: UserModel }>();
		const user = request.user;

		if (!user.isAdmin) throw new ForbiddenException("You have no rights!");

		return user.isAdmin;
	}
}
