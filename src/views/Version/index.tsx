import Header from "../../components/HeaderComponent";
import VersionComponent from "../../components/VersionComponent";
import { IVersionState } from "../../routes/version.route";




export default function VersionView(props: IVersionState) {

	return (
		<>
			<Header
				title="Versions"
			/>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<VersionComponent apiRootUrl={props.apiRootUrl} collectionId={props.collectionId} objectId={props.objectId} />
				</div>
			</main>
		</>
	)
}
