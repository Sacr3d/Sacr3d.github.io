import APIRootComponent from "../../components/APIRootComponent";
import Header from "../../components/HeaderComponent";
import { IAPIRootState } from "../../routes/api-root.route";


export default function APIRootView(props: IAPIRootState) {
	return (
		<>
			<Header
				title="API Root"
			/>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{/* Replace with your content */}
					<APIRootComponent apiRootUrl={props.apiRootUrl} />
					{/* /End replace */}
				</div>
			</main>
		</>
	)

}