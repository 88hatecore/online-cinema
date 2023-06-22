import { IUser } from "@/shared/types/user.types";

export interface IProfileInput extends Pick<IUser, "email" | "password"> {}
