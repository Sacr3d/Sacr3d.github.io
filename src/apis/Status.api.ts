import axios from "axios";

export const StatusAPI = {
	getById: function (apiRootUrl: string, statusId: string) {
		const normalizedUrl = normalizeUrl(apiRootUrl, statusId)
		return axios.get(normalizedUrl);
	},

}

function normalizeUrl(apiRootUrl: string, statusId: string) {

	if (apiRootUrl.match(new RegExp(/\/+$/))) {
		return apiRootUrl + 'status/' + statusId
	}

	return apiRootUrl + '/status/' + statusId

}
