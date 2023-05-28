import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorCatch } from "api/api.helpers";
import { toastr } from "react-redux-toastr";

import { AuthService } from "@/services/auth/auth.service";

import { toastError } from "@/utils/toast-error";

import { IAuthResponce, IEmailPassword } from "./user.interface";

export const register = createAsyncThunk<IAuthResponce, IEmailPassword>(
	"auth/register",
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.register(email, password);
			toastr.success("Registration", "Completed successfully");
			return response.data;
		} catch (error) {
			toastError(error);
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const login = createAsyncThunk<IAuthResponce, IEmailPassword>(
	"auth/login",
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.login(email, password);
			toastr.success("Login", "Completed successfully");
			return response.data;
		} catch (error) {
			toastError(error);
			return thunkApi.rejectWithValue(error);
		}
	}
);

export const logout = createAsyncThunk("auth/logout", async () => {
	await AuthService.logout();
});

export const checkAuth = createAsyncThunk<IAuthResponce, IEmailPassword>(
	"auth/check-auth",
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens();
			return response.data;
		} catch (error) {
			if (errorCatch(error) === "jwt expired") {
				toastr.error(
					"Logout",
					"Your authorization is finished, please sign in again"
				);
				thunkApi.dispatch(logout());
			}

			return thunkApi.rejectWithValue(error);
		}
	}
);
