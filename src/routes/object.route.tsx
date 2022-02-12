import { useLocation } from "react-router";
import ObjectsGetView from "../views/Object/ObjectGet";
import ObjectsPostView from "../views/Object/ObjectPost";

export interface IObjectsGetProps {
	apiRootUrl?: string
	collectionId?: string
	objectId?: string
	version?: Date
}

export interface IObjectsPostProps {
	apiRootUrl?: string
	collectionId?: string
}


function ObjectsGet() {
	let objectsGetState: IObjectsGetProps = {
		apiRootUrl: undefined,
		collectionId: undefined,
		objectId: undefined,
		version: undefined
	}

	const location = useLocation()

	if (location.state) {
		const { state } = location;
		objectsGetState.apiRootUrl = (state as Record<string, string>).apiRootUrl
		objectsGetState.collectionId = (state as Record<string, string>).collectionId
		objectsGetState.objectId = (state as Record<string, string>).objectId
		objectsGetState.version = (state as Record<string, Date>).version
	}
	return (
		<ObjectsGetView
			apiRootUrl={objectsGetState.apiRootUrl}
			collectionId={objectsGetState.collectionId}
			objectId={objectsGetState.objectId}
			version={objectsGetState.version} />
	)
}


function ObjectsPost() {
	let objectsPostState: IObjectsPostProps = {
		apiRootUrl: undefined,
		collectionId: undefined,
	}

	const location = useLocation()

	if (location.state) {
		const { state } = location;
		objectsPostState.apiRootUrl = (state as Record<string, string>).apiRootUrl
		objectsPostState.collectionId = (state as Record<string, string>).collectionId
	}
	return (
		<ObjectsPostView
			apiRootUrl={objectsPostState.apiRootUrl}
			collectionId={objectsPostState.collectionId}
		/>
	)


}

export { ObjectsGet, ObjectsPost }