import {
	ArgumentMetadata,
	BadRequestException,
	PipeTransform,
} from "@nestjs/common";
import { Types } from "mongoose";

export class IdValidationPipe implements PipeTransform {
	transform(val: string, meta: ArgumentMetadata) {
		if (meta.type !== "param") return val;

		if (!Types.ObjectId.isValid(val))
			throw new BadRequestException("Invalid format Id");

		return val;
	}
}
