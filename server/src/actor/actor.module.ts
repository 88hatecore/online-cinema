import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";

import { ActorService } from "./actor.service";
import { ActorController } from "./actor.controller";
import { ActorModel } from "./actor.model";

@Module({
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
	controllers: [ActorController],
})
export class ActorModule {}
