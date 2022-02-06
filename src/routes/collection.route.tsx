import { useLocation } from "react-router";
import CollectionComponent from "../components/CollectionComponent";

type CollectionState = {
	apiRoot?: string
	collectionId?: string
};

export default function Collection() {
	let collectonState: CollectionState = {
		apiRoot: undefined,
		collectionId: undefined,

	}


	const location = useLocation()

	console.log(location);

	if (location.state) {
		const { state } = location;
		collectonState.apiRoot = (state as Record<string, string>).apiRoot
		collectonState.collectionId = (state as Record<string, string>).collectionId
	}
	return (
		<>
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-gray-900">Collection</h1>
				</div>
			</header>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{/* Replace with your content */}
					<CollectionComponent apiRoot={collectonState.apiRoot} collectionId={collectonState.collectionId} />
					{/* /End replace */}
				</div>
			</main>
		</>
	)
}