import Header from "../../../components/HeaderComponent";
import ObjectsGetComponent from "../../../components/ObjectsComponent/ObjectsGet";
import { IObjectsGetProps } from "../../../routes/object.route";




export default function ObjectsGetView(props: IObjectsGetProps) {

	return (
		<>
			<Header
				title="Objects GET"
			/>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<ObjectsGetComponent
						apiRootUrl={props.apiRootUrl}
						collectionId={props.collectionId}
						objectId={props.objectId}
						version={props.version} />
				</div>
			</main>
		</>
	)
}
