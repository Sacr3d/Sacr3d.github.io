import React from "react";
import { Link, NavLink } from "react-router-dom";
import { DiscoveryAPI } from "../../apis/Discovery.api";
import ErrorModal from "../ErrorModalComponent";

type GetDiscoveryDto = {
	title: string
	description?: string
	contact?: string
	default?: string
	api_roots?: string[]
}

export default class DiscoveryComponent extends React.Component<any> {

	public state: GetDiscoveryDto = {
		title: 'No Discovery Object found',
		description: undefined,
		contact: undefined,
		default: undefined,
		api_roots: undefined
	}

	componentDidMount() {
		DiscoveryAPI.getAll()
			.then(
				(response) => {
					const discoveries = response.data;
					this.setState(discoveries)
				}
			).catch(function (error) {
				// error handling
			});
	}

	getDiscovery = () => {
		return this.state
	}

	render() {
		return (
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6">
					<h3 className="text-lg leading-6 font-medium text-gray-900">Discovery Information</h3>
				</div>
				<div className="border-t border-gray-200">
					<dl>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">title</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									this.getDiscovery().title
								}
							</dd>
						</div>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">description</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									this.getDiscovery().description

								}
							</dd>
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">contact</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									this.getDiscovery().contact
								}
							</dd>
						</div>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">default</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									<NavLink
										to='/api-root'
										state={{ api_root: this.getDiscovery().default }}
									>
										{this.getDiscovery().default}
									</NavLink>
								}
							</dd>
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">api_roots</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								<ul className="p-1 border border-gray-200 rounded-md divide-y divide-gray-200">
									{
										this.getDiscovery().api_roots?.map((apiRoot) => {
											return (
												<li className="flex items-center justify-between text-sm">
													<div className="p-4 w-0 flex-1 flex items-center">
														<span className="flex-1 w-0 truncate">
															{
																<NavLink
																	to='/api-root'
																	state={{ api_root: apiRoot }}
																>
																	{apiRoot}
																</NavLink>
															}
														</span>
													</div>
												</li>
											)
										})
									}
								</ul>
							</dd>
						</div>
					</dl>
				</div >
			</div >
		)
	}

}