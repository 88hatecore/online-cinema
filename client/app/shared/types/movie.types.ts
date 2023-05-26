import { TypeMaterialIconName } from "./icon.types";

export interface IGenre {
	_id: string;
	name: string;
	slug: string;
	description: string;
	icon: TypeMaterialIconName;
}
