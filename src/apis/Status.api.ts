import axios from "axios";

export const StatusAPI = {
	getById: function (apiRootUrl?: string, statusId?: number) {
		if (apiRootUrl && statusId) {
			const normalizedUrl = normalizeUrl(apiRootUrl, statusId)
			console.log(normalizedUrl);
			return axios.get(normalizedUrl);
		} else {
			return Promise.reject(Error('apiRootUrl or statusId is undefined'))
		}
	}
}

function normalizeUrl(apiRootUrl: string, statusId: number) {

	if (apiRootUrl.match(new RegExp(/\/+$/))) {
		return apiRootUrl + 'status/' + statusId
	}

	return apiRootUrl + '/status/' + statusId

}
