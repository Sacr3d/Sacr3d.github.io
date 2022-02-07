import React from "react";
import { NavLink } from "react-router-dom";
import { DiscoveryAPI } from "../../apis/Discovery.api";
import DescriptionList from "../DescriptionListComponent";
import DescriptionListItem from "../DescriptionListComponent/DescriptionListItem";
import DescriptionListItemWithChildren from "../DescriptionListComponent/DescriptionListItemWithChildren";
import DescriptionListItemWithFallback from "../DescriptionListComponent/DescriptionListItemWithFallback";
import DescriptionListSublist from "../DescriptionListComponent/DescriptionListSublist";

type getStateDto = {
	title: string
	description?: string
	contact?: string
	default?: string
	api_roots?: string[]
}

interface IDiscoveryState {
	taxiiDiscovery?: getStateDto
}

export default class DiscoveryComponent extends React.Component<any> {

	public state: IDiscoveryState = {
		taxiiDiscovery: undefined
	}

	componentDidMount() {
		DiscoveryAPI.getAll()
			.then(
				(response) => {
					const taxiiDiscovery: getStateDto = response.data;
					this.setState({ taxiiDiscovery: taxiiDiscovery })
				}
			).catch(function (error) {
				console.log(error);

			});
	}

	getState = () => {
		return this.state
	}

	mapApiRoots = () => {
		return this.getState().taxiiDiscovery?.api_roots?.map((apiRootUrl) => {
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

	render() {

		return (
			<DescriptionList listTitle="Discovery Information">
				<DescriptionListItemWithFallback
					listItemTitle="title"
					listItemData={this.getState().taxiiDiscovery?.title}
					fallback="No discovery found, is the SL API running?"
				/>

				<DescriptionListItem
					listItemTitle="contact"
					listItemData={this.getState().taxiiDiscovery?.contact}
				/>

				<DescriptionListItemWithChildren
					listItemTitle="default"
				>
					<NavLink
						to='/api-root'
						state={{ apiRootUrl: this.getState().taxiiDiscovery?.default }}
					>
						{this.getState().taxiiDiscovery?.default}
					</NavLink>
				</DescriptionListItemWithChildren>

				<DescriptionListSublist
					listItemTitle="api-roots"
					dataMap={this.mapApiRoots}
				/>
			</DescriptionList>
		)
	}

}