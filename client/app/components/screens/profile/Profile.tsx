import { FC } from "react";
import { useForm } from "react-hook-form";

import SkeletonLoader from "@/components/ui/SkeletonLoader";
import Button from "@/components/ui/form-elements/Button";
import Heading from "@/components/ui/heading/Heading";

import Meta from "@/utils/meta/Meta";

import AuthFields from "../auth/AuthFields";

import styles from "./Profile.module.scss";
import { IProfileInput } from "./profile.interface";
import { useProfile } from "./useProfile";

const Profile: FC = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: "onChange",
		});

	const { isLoading, onSubmit } = useProfile(setValue);

	return (
		<Meta title="Profile">
			<Heading title="Profile" className="mb-6" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<AuthFields register={register} formState={formState} />
				)}

				<Button>Update</Button>
			</form>
		</Meta>
	);
};

export default Profile;
