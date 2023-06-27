import axios from "./interceptors";

type TypeInput = {
	url: string;
	method?: "GET" | "POST" | "PUT" | "DELETE";
	body?: any;
};

export const api = async ({ url, method, body }: TypeInput) => {
	return axios({
		method,
		url,
		data: body,
	});
};
