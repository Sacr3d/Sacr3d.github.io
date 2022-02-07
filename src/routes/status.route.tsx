import { useLocation } from "react-router";
import StatusComponent from "../components/StatusComponent";

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

type StatusState = {
	apiRootUrl?: string
	statusDto?: StatusDto
};

export default function Status() {
	let statusState: StatusState = {
		apiRootUrl: undefined,
		statusDto: undefined,
	}

	const location = useLocation()

	console.log(location);

	if (location.state) {
		const { state } = location;
		statusState.apiRootUrl = (state as Record<string, string>).apiRootUrl
		statusState.statusDto = (state as Record<string, StatusDto>).statusDto || undefined
	}

	return (
		<>
			<header className="bg-white shadow">
				<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold text-gray-900">Status</h1>
				</div>
			</header>
			<main>
				<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
					{/* Replace with your content */}
					<StatusComponent apiRootUrl={statusState.apiRootUrl} statusDto={statusState.statusDto} />
					{/* /End replace */}
				</div>
			</main>
		</>
	)
}