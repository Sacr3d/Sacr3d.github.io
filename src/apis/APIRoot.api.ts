import axios from "axios";

export const APIRootAPI = {
	get: function (apiRootUrl?: string) {
		if (apiRootUrl) {
			return axios.get(apiRootUrl);
		} else {
			return Promise.reject(Error('apiRootUrl is undefined'))
		}
	},
}