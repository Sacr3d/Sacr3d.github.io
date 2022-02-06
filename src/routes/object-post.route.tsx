import { useLocation, useNavigate } from "react-router";
import ObjectsPostsComponent from "../components/ObjectsPostComponent";

type ObjectsPostState = {
	apiRoot?: string
	collectionId?: string
};

export default function ObjectsPost() {
	let objectsPostState: ObjectsPostState = {
		apiRoot: '',
		collectionId: '',
	}

	const location = useLocation()

	let navigate = useNavigate();

	console.log(location);

	if (location.state) {
		const { state } = location;
		objectsPostState.apiRoot = (state as Record<string, string>).apiRoot
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
					<ObjectsPostsComponent navigation={navigate} apiRoot={objectsPostState.apiRoot} collectionId={objectsPostState.collectionId} />
					{/* /End replace */}
				</div>
			</main>
		</>
	)
}