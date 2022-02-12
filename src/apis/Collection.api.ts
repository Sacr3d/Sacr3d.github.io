import axios from "axios";

export const CollectionAPI = {
	get: function (apiRootUrl?: string) {
		console.log(`CollectionAPI::get(${apiRootUrl})`);

		if (apiRootUrl) {
			const normalizedUrl = normalizeUrl(apiRootUrl)
			return axios.get(normalizedUrl + 'collections');
		} else {
			return Promise.reject(Error('apiRootUrl is undefined'))
		}
	},
	getById: function (apiRootUrl?: string, collectionId?: string) {
		if (apiRootUrl && collectionId) {
			const normalizedUrl = normalizeUrl(apiRootUrl)
			return axios.get(normalizedUrl + 'collections/' + collectionId);
		} else {
			return Promise.reject(Error('apiRootUrl or collectionId is undefined'))
		}
	},
}

function normalizeUrl(apiRootUrl: string) {
	if (apiRootUrl.match(new RegExp(/\/+$/))) {
		return apiRootUrl
	}

	return apiRootUrl + '/'

}
