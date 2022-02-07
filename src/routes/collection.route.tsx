import { useLocation } from "react-router";
import CollectionView from "../views/Collection";

export interface ICollectionState {
	apiRootUrl?: string
	collectionId?: string
}

export default function Collection() {

	let collectionState: ICollectionState = {
		apiRootUrl: undefined,
		collectionId: undefined,
	}

	const location = useLocation()

	if (location.state) {
		const { state } = location;
		collectionState.apiRootUrl = (state as Record<string, string>).apiRootUrl
		collectionState.collectionId = (state as Record<string, string>).collectionId
	}

	return (
		<CollectionView
			apiRootUrl={collectionState.apiRootUrl}
			collectionId={collectionState.collectionId}
		/>
	)
}