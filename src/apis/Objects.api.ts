import axios from "axios";

export const ObjectsAPI = {
	// get: function (apiRootUrl: string) {
	// 	const normalizedUrl = normalizeUrl(apiRootUrl)
	// 	return axios.get(normalizedUrl + 'collections');
	// },
	getAllByCollectionId: function (apiRootUrl: string, collectionId: string, params: object) {
		const normalizedUrl = normalizeUrl(apiRootUrl, collectionId)
		return axios.get(normalizedUrl + '/objects', {
			params: {
				...params
			}
		});
	},
	postByCollectionId: function (apiRootUrl: string, collectionId: string, body: object) {
		const normalizedUrl = normalizeUrl(apiRootUrl, collectionId)
		return axios.post(normalizedUrl + '/objects', body);
	},
}

function normalizeUrl(apiRootUrl: string, collectionId: string) {
	console.log(apiRootUrl.length);

	if (apiRootUrl.match(new RegExp(/\/+$/))) {
		return apiRootUrl + 'collections/' + collectionId
	}

	return apiRootUrl + '/collections/' + collectionId

}
