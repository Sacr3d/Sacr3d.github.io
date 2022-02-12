import APIRootComponent from "../../components/APIRootComponent";
import Header from "../../components/HeaderComponent";
import { IAPIRootProps } from "../../routes/api-root.route";


export default function APIRootView(props: IAPIRootProps) {
	return (
		<>
			<Header
				title="API Root"
			/>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<APIRootComponent apiRootUrl={props.apiRootUrl} />
				</div>
			</main>
		</>
	)

}