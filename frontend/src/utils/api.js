import axios from "axios";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export const commonURL = "http://198.199.86.128/commons/";
// export const appURL = "http://198.199.86.128/applications/";

export const commonURL = "http://localhost:3001/api/v2";
export const appURL = "http://localhost:6000/";

export const tokenKey = `${appURL}.token.authorizationData`;
export const refreshKey = `${appURL}.refresh.authorizationData`;

const useApi = () => {
	// const navigate = useNavigate()

	const addRefreshToken = async (error, cb) => {
		const config = error.config;

		try {
			let res = await refresh_token();
			if (res && res.data.access && typeof window != "undefined") {
				localStorage.setItem(tokenKey, res.data.access);
				localStorage.setItem(refreshKey, res.data.refresh);
				if (config) {
					config.headers.Authorization = `Bearer ${res.data.access}`;
				}
			}
			return cb(config);
		} catch (err) {
			const errors = err;
			if (axios.isAxiosError(errors)) {
				const status = errors.response?.status;
				if (status == 400 || (status == 401 && typeof window != "undefined")) {
					localStorage.removeItem(tokenKey);
					localStorage.removeItem(refreshKey);
				}
			}
			return Promise.reject(err);
		}
	};

	const useAppApi = () => {
		const api = axios.create({
			baseURL: appURL,
			headers: {
				"Content-Type": "application/json",
			},
		});

		api.interceptors.request.use(
			(config) => requestConfig(api, config),
			(error) => Promise.reject(error)
		);
		api.interceptors.response.use(
			(response) => response,
			(error) => handleResponseError(error, api)
		);
		return api;
	};
	const useCommonApi = () => {
		const api = axios.create({
			baseURL: commonURL,
			headers: {
				"Content-Type": "application/json",
			},
		});

		api.interceptors.request.use(
			(config) => requestConfig(api, config),
			(error) => Promise.reject(error)
		);
		api.interceptors.response.use(
			(response) => response,
			(error) => handleResponseError(error, api)
		);
		return api;
	};

	const refresh_token = async () => {
		if (typeof window !== "undefined") {
			const refresh = localStorage.getItem(refreshKey);
			return (
				(await axios.post) <
				RefreshToken >
				(`${commonURL}authorize/token/refresh/`,
				{
					refresh,
				})
			);
		}
	};

	const handleResponseError = (error, cb) => {
		const status = error.response?.status;
		switch (status) {
			case 401:
				// return addRefreshToken(error, cb);
                toast.error(error.response.data.message)
                break;
			case 403:
				toast.error('access denied')
				break;
			case 404:
                toast.error(error.response.data.message)
				// toast.error("Resource Not found" + error.config.url );
				break;
			case 500:
                toast.error(error.response.data.message)
				break;
			case 503:
				toast.error("Unable to contact remote server. Make sure your connection is working and try again");
				break;
			default:
                toast.error(error.response.data.message)
				//handle remaining 4xx or 5xx responses
				// toast.error(ErrorUtils.message(error.response))
				break;
		}
		return Promise.reject(error);
	};

	const getToken = () => {
		if (typeof window !== "undefined") {
			return localStorage.getItem(tokenKey);
		}
	};

	const requestConfig = (api, config) => {
		if (config.url?.endsWith("/null")) {
			return config;
		}
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		} else {
			delete api.defaults.headers.common.Authorization;
		}
		return config;
	};

	const commonApi = useCommonApi();
	const appApi = useAppApi();

	return { appApi, commonApi };
};

export default useApi;
