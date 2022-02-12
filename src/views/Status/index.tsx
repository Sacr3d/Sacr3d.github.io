import Header from "../../components/HeaderComponent";
import StatusComponent from "../../components/StatusComponent";
import { IStatusProps } from "../../routes/status.route";




export default function StatusView(props: IStatusProps) {

	return (
		<>
			<Header
				title="Status"
			/>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					<StatusComponent
						apiRootUrl={props.apiRootUrl}
						statusDto={props.statusDto}
					/>
				</div>
			</main>
		</>
	)
}
