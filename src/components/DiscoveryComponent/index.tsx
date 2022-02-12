import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DiscoveryDtoContext } from "../../App";
import DescriptionList from "../DescriptionListComponent";
import DescriptionListItem from "../DescriptionListComponent/DescriptionListItem";
import DescriptionListItemWithChildren from "../DescriptionListComponent/DescriptionListItemWithChildren";
import DescriptionListItemWithFallback from "../DescriptionListComponent/DescriptionListItemWithFallback";
import DescriptionListSublist from "../DescriptionListComponent/DescriptionListSublist";

const DiscoveryComponent = () => {

	const discoveryContext = useContext(DiscoveryDtoContext);

	return (
		<DescriptionList listTitle="Discovery Information">
			<DescriptionListItemWithFallback
				listItemTitle="title"
				listItemData={discoveryContext.title}
				fallback="No discovery found, is the SL API running?"
			/>

			<DescriptionListItem
				listItemTitle="contact"
				listItemData={discoveryContext.contact}
			/>

			<DescriptionListItemWithChildren
				listItemTitle="default"
			>
				<NavLink
					to='/api-root'
					state={{ apiRootUrl: discoveryContext.default }}
				>
					{discoveryContext.default}
				</NavLink>
			</DescriptionListItemWithChildren>

			<DescriptionListSublist
				listItemTitle="api-roots"
				dataMap={mapApiRoots(discoveryContext)}
			/>
		</DescriptionList>
	)

}

const mapApiRoots = ({ api_roots }: { api_roots?: string[] }) => {
	return api_roots?.map((apiRootUrl) => {
		return (
			<li className="flex items-center justify-between text-sm">
				<div className="p-4 w-0 flex-1 flex items-center">
					<span className="flex-1 w-0 truncate">
						{<NavLink
							to='/api-root'
							state={{ apiRootUrl: apiRootUrl }}
						>
							{apiRootUrl}
						</NavLink>}
					</span>
				</div>
			</li>
		);
	})
}

export default DiscoveryComponent