import { useLocation } from "react-router";
import StatusComponent from "../components/StatusComponent";
import StatusView from "../views/Status";

type StatusDto = {
	id: number,
	status: string,
	request_timestamp?: Date,
	total_count: number,
	success_count: number,
	successes?: object[],
	failure_count: number,
	failures?: object[],
	pending_count: number,
	pendings?: object[]
}

export interface IStatusProps {
	apiRootUrl?: string
	statusDto?: StatusDto
}


export default function Status() {
	let statusProps: IStatusProps = {
		apiRootUrl: undefined,
		statusDto: undefined,
	}

	const location = useLocation()

	console.log(location);

	if (location.state) {
		const { state } = location;
		statusProps.apiRootUrl = (state as Record<string, string>).apiRootUrl
		statusProps.statusDto = (state as Record<string, StatusDto>).statusDto || undefined
	}

	return (
		<StatusView
			apiRootUrl={statusProps.apiRootUrl}
			statusDto={statusProps.statusDto}
		/>

	)
}