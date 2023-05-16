import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserModel } from "./user.model";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: "User",
				},
			},
		]),
		ConfigModule,
	],
	providers: [UserService],
	controllers: [UserController],
})
export class UserModule {}
