import { EditorProps } from "draft-js";
import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IFieldProps {
	placeholder: string;
	error?: FieldError | undefined;
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps;

export interface IField extends TypeInputPropsField {}

type TypeEditorPropsFields = EditorProps & IFieldProps;

export interface ITextEditor
	extends Omit<TypeEditorPropsFields, "editorState"> {
	onChange: (...event: any[]) => void;
	value: string;
}
