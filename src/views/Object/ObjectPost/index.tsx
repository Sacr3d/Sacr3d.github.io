import Header from "../../../components/HeaderComponent";
import ObjectsPostComponent from "../../../components/ObjectsComponent/ObjectsPost";
import { IObjectsPostProps } from "../../../routes/object.route";




export default function ObjectsPostView(props: IObjectsPostProps) {

	return (
		<>
			<Header
				title="Objects Post"
			/>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<ObjectsPostComponent
						apiRootUrl={props.apiRootUrl}
						collectionId={props.collectionId} />
				</div>
			</main>
		</>
	)
}
