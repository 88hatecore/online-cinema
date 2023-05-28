import { getContentType } from "api/api.helpers";
import { axiosClassic } from "api/interceptors";
import { getAuthUrl } from "config/api.config";
import Cookies from "js-cookie";

import { register } from "@/store/user/user.actions";
import { IAuthResponce } from "@/store/user/user.interface";

import { removeTokensStorage, saveToStorage } from "./auth.helper";

export const AuthService = {
	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponce>(
			getAuthUrl("/register"),
			{ email, password }
		);
		if (response.data.accessToken) saveToStorage(response.data);
		return response;
	},

	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponce>(
			getAuthUrl("/login"),
			{ email, password }
		);
		if (response.data.accessToken) saveToStorage(response.data);
		return response;
	},
	logout() {
		removeTokensStorage();
		localStorage.removeItem("user");
	},

	async getNewTokens() {
		const refreshToken = Cookies.get("refreshToken");
		const response = await axiosClassic.post<IAuthResponce>(
			getAuthUrl("/login/access-token"),
			{ refreshToken },
			{ headers: getContentType() }
		);

		if (response.data.accessToken) saveToStorage(response.data);
		return response;
	},
};
