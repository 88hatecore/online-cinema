import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { ActorController } from "./actor.controller";
import { ActorModel } from "./actor.model";
import { ActorService } from "./actor.service";

@Module({
	controllers: [ActorController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ActorModel,
				schemaOptions: {
					collection: "Actor",
				},
			},
		]),
	],
	providers: [ActorService],
})
export class ActorModule {}
