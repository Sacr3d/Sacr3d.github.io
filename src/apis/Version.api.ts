import axios from "axios";

export const VersionAPI = {
	getById: function (apiRootUrl?: string, collectionId?: string, objectId?: string) {
		if (apiRootUrl && collectionId && objectId) {
			const normalizedUrl = normalizeUrl(apiRootUrl, collectionId, objectId)
			return axios.get(normalizedUrl);
		} else {
			return Promise.reject(Error('apiRootUrl or collectionId is undefined'))
		}
	},
}

function normalizeUrl(apiRootUrl: string, collectionId: string, objectId: string) {
	if (apiRootUrl.match(new RegExp(/\/+$/))) {
		return String(apiRootUrl + 'collections/' + collectionId + '/objects/' + objectId + '/versions').replace(/ /g, '')
	}

	return String(apiRootUrl + '/collections/' + collectionId + '/objects/' + objectId + '/versions').replace(/ /g, '')

}
