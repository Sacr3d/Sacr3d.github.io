import CollectionComponent from "../../components/CollectionComponent";
import Header from "../../components/HeaderComponent";
import { ICollectionState } from "../../routes/collection.route";



export default function CollectionView(props: ICollectionState) {

	return (
		<>
			<Header
				title="Collection"
			/>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<CollectionComponent apiRootUrl={props.apiRootUrl} collectionId={props.collectionId} />
				</div>
			</main>
		</>
	)
}