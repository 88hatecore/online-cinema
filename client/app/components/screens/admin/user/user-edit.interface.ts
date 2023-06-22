import { IUser } from "@/shared/types/user.types";

export interface IUserEditInput extends Omit<IUser, "_id" | "createdAt"> {}
