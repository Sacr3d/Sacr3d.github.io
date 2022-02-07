import { useLocation, useNavigate } from "react-router";
import ObjectsPostComponent from "../components/ObjectsPostComponent";
import ObjectsGetComponent from "../components/ObjectsGetComponent";
import ObjectsGetView from "../views/Object/ObjectGet";



export interface IObjectsPostState {
	apiRootUrl?: string
	collectionId?: string
}

export interface IObjectsGetState {
	apiRootUrl?: string
	collectionId?: string
	objectId?: string
}

function ObjectsGet() {
	let objectsGetState: IObjectsGetState = {
		apiRootUrl: undefined,
		collectionId: undefined,
		objectId: undefined
	}

	const location = useLocation()

	if (location.state) {
		const { state } = location;
		objectsGetState.apiRootUrl = (state as Record<string, string>).apiRootUrl
		objectsGetState.collectionId = (state as Record<string, string>).collectionId
		objectsGetState.objectId = (state as Record<string, string>).objectId
	}
	return (
		<ObjectsGetView apiRootUrl={objectsGetState.apiRootUrl} collectionId={objectsGetState.collectionId} objectId={objectsGetState.objectId} />
	)
}


function ObjectsPost() {
	let objectsPostState: IObjectsPostState = {
		apiRootUrl: undefined,
		collectionId: undefined,
	}

	const location = useLocation()

	let navigate = useNavigate();

	console.log(location);

	if (location.state) {
		const { state } = location;
		objectsPostState.apiRootUrl = (state as Record<string, string>).apiRootUrl
		objectsPostState.collectionId = (state as Record<string, string>).collectionId
	}
	return (
		<>
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-gray-900">ObjectsPosts</h1>
				</div>
			</header>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{/* Replace with your content */}
					<ObjectsPostComponent navigation={navigate} apiRootUrl={objectsPostState.apiRootUrl} collectionId={objectsPostState.collectionId} />
					{/* /End replace */}
				</div>
			</main>
		</>
	)
}

export { ObjectsGet, ObjectsPost }