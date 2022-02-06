import React from "react";
import { NavLink } from "react-router-dom";
import { CollectionAPI } from "../../apis/Collection.api";
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

type CollectionState = {
	collectionId?: string
	apiRootUrl?: string
	collection?: GetCollectionDto
	show: boolean;
	error: ErrorDto;
}

export default class CollectionComponent extends React.Component<any> {

	public state: CollectionState = {
		collectionId: undefined,
		apiRootUrl: undefined,
		collection: undefined,
		show: false,
		error: {
			title: '',
			description: '',
			http_status: 0,
			details: {}
		},

	}

	hideModal = () => {
		this.setState({ show: false });
	};

	componentDidMount() {
		this.setState({
			apiRootUrl: this.props.apiRoot,
			collectionId: this.props.collectionId,
		},
			() => {
				if (this.getCollection().apiRootUrl && this.getCollection().collectionId) {
					CollectionAPI.getById(this.getCollection().apiRootUrl, this.getCollection().collectionId)
						.then(
							(response) => {
								const collection: GetCollectionDto = response.data;
								this.setState({
									collection: collection,
								})
							}
						).catch(function (error) {
							alert(JSON.stringify(error, null, 2))
						});
				}
			});




	}

	getCollection = () => {
		return this.state
	}

	onFormSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			'api-root': { value: string },
			'collectionId': { value: string }
		};

		const apiRootInput = target['api-root'].value;
		const collectionId = target['collectionId'].value;

		CollectionAPI.getById(apiRootInput, collectionId)
			.then(
				(response) => {
					const apiRoot = response.data;
					this.setState({
						collection: []
					})
				}
			).catch((err) => {
				this.setState({ show: true, error: err.response.data })
			});
	}

	render() {
		return (<>
			<ErrorModal show={this.getCollection().show} handleClose={this.hideModal} >
				{this.getCollection().error}
			</ErrorModal>
			<form onSubmit={this.onFormSubmit} className="mb-16">
				<label htmlFor="price" className="block font-medium text-gray-700">
					api-root
				</label>
				<div className="mt-1 relative rounded-md shadow-sm mb-8">
					<input
						type="text"
						name="api-root"
						id="api-root"
						className="h-16 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm sm:text-lg border-gray-300 rounded-md"
						placeholder="api-root"
						defaultValue={this.getCollection().apiRootUrl}
					/>
				</div>
				<label htmlFor="price" className="block font-medium text-gray-700">
					collectionId
				</label>
				<div className="mt-1 relative rounded-md shadow-sm mb-8">
					<input
						type="text"
						name="collectionId"
						id="collectionId"
						className="h-16 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm sm:text-lg border-gray-300 rounded-md"
						placeholder="collectionId"
						defaultValue={this.getCollection().collectionId}
					/>
				</div>
				<div className="inset-y-0 right-0 flex items-center justify-end">
					<button
						type="submit"
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Submit
					</button>
				</div>
			</form>

			<div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
				<div className="px-4 py-5 sm:px-6">
					<h3 className="text-lg leading-6 font-medium text-gray-900">{this.constructTitle()}</h3>
				</div>
				<div className="border-t border-gray-200">
					<dl>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">id</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									this.getCollection().collection?.id
								}
							</dd>
						</div>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">title</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									this.getCollection().collection?.title

								}
							</dd>
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">description</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									this.getCollection().collection?.description

								}
							</dd>
						</div>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">alias</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									this.getCollection().collection?.alias

								}
							</dd>
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">can_read</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									String(this.getCollection().collection?.can_read || '')
								}
							</dd>
						</div>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">can_write</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									String(this.getCollection().collection?.can_write || '')
								}
							</dd>
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">media_types</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								<ul className="p-1 border border-gray-200 rounded-md divide-y divide-gray-200">
									{

										this.getCollection().collection?.media_types
											?
											this.getCollection().collection?.media_types.map((type) => {
												return (
													<li className="flex items-center justify-between text-sm">
														<div className="p-4 w-0 flex-1 flex items-center">
															<span className="flex-1 w-0 truncate">
																{type}
															</span>
														</div>
													</li>
												)
											})
											:
											<></>
									}
								</ul>
							</dd>
						</div>
					</dl>
				</div >
			</div >
			{
				this.getCollection().collectionId
					? <div className="inset-y-0 right-0 flex items-center justify-end gap-2">
						<NavLink
							to={'/objects/get'}
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							state={{ apiRoot: this.getCollection().apiRootUrl, collectionId: this.getCollection().collectionId }}
						>
							Get Objects
						</NavLink>
						<NavLink
							to={'/objects/post'}
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							state={{ apiRoot: this.getCollection().apiRootUrl, collectionId: this.getCollection().collectionId }}
						>
							Post Objects
						</NavLink>
					</div>
					: <></>
			}
		</>
		)

	}


	private constructTitle(): React.ReactNode {

		if (!this.getCollection().apiRootUrl) {
			return ''
		}

		if (this.getCollection().apiRootUrl?.match(new RegExp(/\/+$/))) {
			return (this.getCollection().apiRootUrl as string) + (this.getCollection().collectionId as string)
		}

		return (this.getCollection().apiRootUrl as string) + '/' + (this.getCollection().collectionId as string)
	}
}