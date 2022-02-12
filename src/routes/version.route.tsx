import { useLocation, useNavigate } from "react-router";
import VersionView from "../views/Version";





export interface IVersionProps {
	apiRootUrl?: string
	collectionId?: string
	objectId?: string
}

export default function Version() {
	let objectsGetState: IVersionProps = {
		apiRootUrl: undefined,
		collectionId: undefined,
		objectId: undefined
	}

	const location = useLocation()

	if (location.state) {
		const { state } = location;
		objectsGetState.apiRootUrl = (state as Record<string, string>).apiRootUrl
		objectsGetState.collectionId = (state as Record<string, string>).collectionId
		objectsGetState.objectId = (state as Record<string, string>).objectId
	}
	return (
		<VersionView apiRootUrl={objectsGetState.apiRootUrl} collectionId={objectsGetState.collectionId} objectId={objectsGetState.objectId} />
	)
}