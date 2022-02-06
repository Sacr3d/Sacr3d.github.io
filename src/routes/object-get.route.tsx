import { useLocation } from "react-router";
import ObjectsGetsComponent from "../components/ObjectsGetComponent";

type ObjectsGetState = {
	apiRoot?: string
	collectionId?: string
	objectId?: string
};

export default function ObjectsGet() {
	let objectsGetState: ObjectsGetState = {
		apiRoot: undefined,
		collectionId: undefined,
		objectId: undefined
	}

	const location = useLocation()

	console.log(location);

	if (location.state) {
		const { state } = location;
		objectsGetState.apiRoot = (state as Record<string, string>).apiRoot
		objectsGetState.collectionId = (state as Record<string, string>).collectionId
		objectsGetState.objectId = (state as Record<string, string>).objectId
	}
	return (
		<>
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-gray-900">ObjectsGets</h1>
				</div>
			</header>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{/* Replace with your content */}
					<ObjectsGetsComponent apiRoot={objectsGetState.apiRoot} collectionId={objectsGetState.collectionId}  objectId={objectsGetState.objectId}/>
					{/* /End replace */}
				</div>
			</main>
		</>
	)
}