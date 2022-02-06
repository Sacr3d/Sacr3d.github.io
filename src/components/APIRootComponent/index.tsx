import React from "react";
import { NavLink } from "react-router-dom";
import { APITRootAPI } from "../../apis/APIRoot.api";
import { CollectionAPI } from "../../apis/Collection.api";
import CollectionButton from "../CollectionButton";
import ErrorModal, { ErrorDto } from "../ErrorModalComponent";

type GetCollectionDto = {
	id: string,
	title: string,
	description: string
	alias: string,
	can_read: boolean,
	can_write: boolean,
	media_types: string[]
}

type APIRootDto = {
	title: string;
	description?: string;
	versions?: string[];
	max_content_length: number;
}

type APIRootState = {
	apiRoot?: APIRootDto
	show: boolean
	error: ErrorDto
	apiRootUrl?: string
	collections: GetCollectionDto[]
	gotCollection: boolean
}

export default class APIRootComponent extends React.Component<any> {

	public state: APIRootState = {
		apiRoot: undefined,
		show: false,
		error: {
			title: '',
			description: '',
			http_status: 0,
			details: {}
		},
		apiRootUrl: undefined,
		collections: [],
		gotCollection: false

	}

	hideModal = () => {
		this.setState({ show: false });
	};

	componentDidMount() {

		this.setState({
			apiRootUrl: this.props.apiRoot
		},
			() => {
				if (this.getAPIRoot().apiRootUrl) {
					APITRootAPI.get(this.getAPIRoot().apiRootUrl)
						.then(
							(response) => {
								const apiRoot: APIRootDto = response.data;
								console.log(apiRoot);

								this.setState({
									apiRoot: apiRoot
								})
							}
						).catch(function (error) {
							console.log(error)
						});
				}
			})

	}

	getAPIRoot = () => {
		return this.state
	}

	getCollections = (e: React.SyntheticEvent) => {
		e.preventDefault();
		CollectionAPI.get(this.getAPIRoot().apiRootUrl)
			.then((response) => {

				const data = response.data
				if (data // 👈 null and undefined check
					&& Object.keys(data).length === 0
					&& Object.getPrototypeOf(data) === Object.prototype) {
					this.setState({
						collections: [],
						gotCollection: true
					})
				} else {
					const collection = response.data;
					this.setState({
						collections: collection.collections,
						gotCollection: true
					})
				}
			})
			.catch((err) => {
				this.setState({ show: true, error: err.response.data })
			})

	}

	onFormSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			'api-root': { value: string };
		};
		const apiRootInput = target['api-root'].value;

		APITRootAPI.get(apiRootInput)
			.then(
				(response) => {
					const apiRoot = response.data;
					this.setState({
						apiRoot: apiRoot,
						apiRootUrl: apiRootInput,
						collections: [],
						gotCollection: false
					})
				}
			).catch((err) => {
				this.setState({ show: true, error: err.response.data })
			});

	}

	render() {
		const popluateCollection =
			(this.getAPIRoot().gotCollection === true && this.getAPIRoot().collections.length > 0) || this.getAPIRoot().gotCollection === false
				?
				this.getAPIRoot().collections?.map((collection) => {
					return (
						<li className="flex items-center justify-between text-sm">
							<div className="p-4 w-0 flex-1 flex items-center">
								<span className="flex-1 w-0 truncate">
									{<NavLink
										to='/collections'
										state={{ apiRoot: this.getAPIRoot().apiRootUrl, collectionId: collection.id }}
									>
										{collection.id}
									</NavLink>}
								</span>
							</div>
						</li>
					);
				})
				:
				<li className="flex items-center justify-between text-sm">
					<div className="p-4 w-0 flex-1 flex items-center">
						<span className="flex-1 w-0 truncate">
							No collections found
						</span>
					</div>
				</li>;
		return (
			<>
				<ErrorModal show={this.getAPIRoot().show} handleClose={this.hideModal} >
					{this.getAPIRoot().error}
				</ErrorModal>
				<form onSubmit={this.onFormSubmit} className="mb-16">
					<label htmlFor="price" className="block font-medium text-gray-700">
						api-root
					</label>
					<div className="mt-1 relative rounded-md shadow-sm">
						<input
							type="text"
							name="api-root"
							id="api-root"
							className="h-16 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm sm:text-lg border-gray-300 rounded-md"
							placeholder="api-root"
							defaultValue={this.getAPIRoot().apiRootUrl}
						/>
						<div className="absolute inset-y-0 right-0 flex items-center">
							<button
								type="submit"
								className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Submit
							</button>
						</div>
					</div>
				</form>


				<div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-lg leading-6 font-medium text-gray-900">{this.getAPIRoot().apiRootUrl}</h3>
					</div>
					<div className="border-t border-gray-200">
						<dl>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">title</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									{
										this.getAPIRoot().apiRoot?.title
									}
								</dd>
							</div>
							<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">description</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									{
										this.getAPIRoot().apiRoot?.description

									}
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">versions</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									<ul className="p-1 border border-gray-200 rounded-md divide-y divide-gray-200">
										{
											this.getAPIRoot().apiRoot?.versions?.map((version) => {
												return (
													<li className="flex items-center justify-between text-sm">
														<div className="p-4 w-0 flex-1 flex items-center">
															<span className="flex-1 w-0 truncate">
																{version}
															</span>
														</div>
													</li>
												)
											})
										}
									</ul>
								</dd>
							</div>
							<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">max_content_length</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									{
										this.getAPIRoot().apiRoot?.max_content_length
									}
								</dd>
							</div>
						</dl>
					</div >
				</div >
				{
					this.getAPIRoot().apiRoot?.title
						? <CollectionButton apiRoot={this.getAPIRoot().apiRootUrl} onClick={this.getCollections} />
						: (<></>)
				}

				{
					this.getAPIRoot().apiRoot
						?
						<div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
							<div className="px-4 py-5 sm:px-6">
								<h3 className="text-lg leading-6 font-medium text-gray-900">Collections</h3>
							</div>
							<div className="border-t border-gray-200">
								<dl>
									<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
										<dt className="text-sm font-medium text-gray-500">collections</dt>
										<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
											<ul className="p-1 border border-gray-200 rounded-md divide-y divide-gray-200">
												{
													popluateCollection
												}
											</ul>
										</dd>
									</div>
								</dl>
							</div >
						</div >
						:
						<></>
				}
			</>
		)
	}

}

