
const constructTitle = (apiRootURLState?: string, collectionIdState?: string) => {

	if (!apiRootURLState || !collectionIdState) {
		return undefined
	}

	if (apiRootURLState?.match(new RegExp(/\/+$/))) {
		return String(apiRootURLState + collectionIdState)
	}

	return apiRootURLState + '/' + collectionIdState
}

export { constructTitle }