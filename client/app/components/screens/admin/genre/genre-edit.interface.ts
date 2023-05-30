import { IGenre } from "@/shared/types/movie.types";

export interface IGenreEditInput extends Omit<IGenre, "_id"> {}
