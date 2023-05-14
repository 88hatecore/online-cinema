import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { ConfigModule } from "@nestjs/config";
import { UserModel } from "src/user/user.model";

@Module({
  controllers: [AuthController],
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
  providers: [AuthService],
})
export class AuthModule {}
