import Header from "../../../components/HeaderComponent";
import ObjectsGetComponent from "../../../components/ObjectsGetComponent";
import { IObjectsGetState } from "../../../routes/object.route";




export default function ObjectsGetView(props: IObjectsGetState) {

	return (
		<>
			<Header
				title="Objects GET"
			/>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<ObjectsGetComponent apiRootUrl={props.apiRootUrl} collectionId={props.collectionId} objectId={props.objectId} />
				</div>
			</main>
		</>
	)
}
