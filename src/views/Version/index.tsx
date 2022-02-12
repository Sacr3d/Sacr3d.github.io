import Header from "../../components/HeaderComponent";
import VersionComponent from "../../components/VersionComponent";
import { IVersionProps } from "../../routes/version.route";




export default function VersionView(props: IVersionProps) {

	return (
		<>
			<Header
				title="Versions"
			/>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<VersionComponent
						apiRootUrl={props.apiRootUrl}
						collectionId={props.collectionId}
						objectId={props.objectId}
					/>
				</div>
			</main>
		</>
	)
}
