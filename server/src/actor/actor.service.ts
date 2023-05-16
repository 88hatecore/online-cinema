import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { ActorModel } from "./actor.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { ActorDto } from "./actor.dto";

@Injectable()
export class ActorService {
	constructor(
		@InjectModel(ActorModel) private readonly ActorModel: ModelType<ActorModel>
	) {}

	async bySlug(slug: string) {
		const doc = await this.ActorModel.findOne({ slug }).exec();
		if (!doc) throw new NotFoundException("Actor not found");
		return doc;
	}

	async getAll(searchTerm?: string) {
		let options = {};

		if (searchTerm)
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, "i"),
					},
					{
						slug: new RegExp(searchTerm, "i"),
					},
				],
			};

		return this.ActorModel.find(options)
			.select("-updatedAt -__v")
			.sort({
				createdAt: "desc",
			})
			.exec();
	}

	// admin
	async byId(_id: string) {
		const actor = await this.ActorModel.findById(_id);
		if (!actor) throw new NotFoundException("Actor not found!");

		return actor;
	}

	async getCount() {
		return this.ActorModel.find().count().exec();
	}

	async create() {
		const defaultValue: ActorDto = {
			name: "",
			slug: "",
			photo: "",
		};
		const actor = await this.ActorModel.create(defaultValue);
		return actor._id;
	}

	async update(_id: string, dto: ActorDto) {
		const updateDoc = await this.ActorModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec();
		if (!updateDoc) throw new NotFoundException("Actor not found");

		return updateDoc;
	}

	async delete(id: string) {
		const deleteDoc = await this.ActorModel.findByIdAndDelete(id).exec();
		if (!deleteDoc) throw new NotFoundException("Actor not found");

		return deleteDoc;
	}
}
