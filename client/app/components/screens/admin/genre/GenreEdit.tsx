import { FC } from "react";
import { useForm } from "react-hook-form";

import SkeletonLoader from "@/components/ui/SkeletonLoader";
import AdminNavigation from "@/components/ui/admin-navigation/AdminNavigation";
import Field from "@/components/ui/form-elements/Field";
import Heading from "@/components/ui/heading/Heading";

import Meta from "@/utils/meta/Meta";

import { IGenreEditInput } from "./genre-edit.interface";
import { useGenreEdit } from "./useGenreEdit";

const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<IGenreEditInput>({
		mode: "onChange",
	});

	const { isLoading, onSubmit } = useGenreEdit(setValue);
	return (
		<Meta title="Edit genre">
			<AdminNavigation />
			<Heading title="Edit genre" />
			<form onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div>
							<Field
								{...register("name", {
									required: "Name is required!",
								})}
								placeholder="Name"
								error={errors.name}
								style={{ width: "31%" }}
							/>
							<div style={{ width: "31%" }}></div>
							<Field
								{...register("icon", {
									required: "Icon is required!",
								})}
								placeholder="Icon"
								error={errors.icon}
								style={{ width: "31%" }}
							/>
							<button>Update</button>
						</div>
					</>
				)}
			</form>
		</Meta>
	);
};

export default GenreEdit;
