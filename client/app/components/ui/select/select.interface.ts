import { ControllerRenderProps } from "react-hook-form";
import { Options } from "react-select";

import { IFieldProps } from "../form-elements/form.interface";

export interface IOptions {
	value: string;
	label: string;
}

export interface ISelect extends IFieldProps {
	options: Options<IOptions>;
	isMulti?: boolean;
	field: ControllerRenderProps<any, any>;
	isLoading?: boolean;
}
