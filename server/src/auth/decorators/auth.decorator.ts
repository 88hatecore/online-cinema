import { applyDecorators, UseGuards } from "@nestjs/common/decorators";
import { ITypeRole } from "../auth.interface";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { OnlyAdminGuard } from "../guards/admin.guard";

export const Auth = (role: ITypeRole = "user") =>
	applyDecorators(
		role === "admin"
			? UseGuards(JwtAuthGuard, OnlyAdminGuard)
			: UseGuards(JwtAuthGuard)
	);
