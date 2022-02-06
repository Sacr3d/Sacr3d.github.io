import React from "react";
import { ObjectsAPI } from "../../apis/Objects.api";
import ErrorModal, { ErrorDto } from "../ErrorModalComponent";

type GetObjectsDto = {
	objects: object[]
}

type ObjectsGetState = {
	collectionId?: string
	apiRoot?: string
	objectId?: string,
	objects: object[]
	show: boolean;
	error: ErrorDto;
}

export default class ObjectsGetComponent extends React.Component<any> {

	public state: ObjectsGetState = {
		collectionId: undefined,
		apiRoot: undefined,
		objectId: undefined,
		objects: [],
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
			apiRoot: this.props.apiRoot,
			collectionId: this.props.collectionId,
			objectId: this.props.objectId
		},
			() => {
				if (this.getObjects().apiRoot && this.getObjects().collectionId) {
					ObjectsAPI.getAllByCollectionId((this.getObjects().apiRoot as string), (this.getObjects().collectionId as string), {})
						.then(
							(response) => {
								const objects: GetObjectsDto = response.data;
								this.setState({
									objects: objects.objects,
								})
							}
						).catch(function (error) {
							alert(JSON.stringify(error, null, 2))
						});
				}
			})
	}

	getObjects = () => {
		return this.state
	}

	onFormSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			'api-root': { value: string },
			'collectionId': { value: string }
		};

		const options = e.target as typeof e.target & {
			'object-id': { value: string },
			'object-spec_version': { value: string }
			'object-type': { value: string }
			'object-version': { value: string }
		};

		const apiRootInput = target['api-root'].value;
		const collectionId = target['collectionId'].value;

		const params = {
			'match[id]': options['object-id'].value || undefined,
			'match[spec_version]': options['object-spec_version'].value || undefined,
			'match[type]': options['object-type'].value || undefined,
			'match[version]': options['object-version'].value || undefined,
		}

		ObjectsAPI.getAllByCollectionId(apiRootInput, collectionId, params)
			.then(
				(response) => {
					console.log(response);
					const objects: GetObjectsDto = response.data;
					if ((objects.objects).length > 0) {
						this.setState({
							objects: objects.objects,
							apiRoot: apiRootInput,
							collectionId: collectionId
						})
					} else {
						this.setState({
							objects: [{ message: 'No matches' }],
						})
					}

				}
			).catch((err) => {
				this.setState({
					objects: [{ message: 'No matches' }],
				})
				if (err.response) {
					this.setState({ show: true, error: err.response.data })
				}
			});
	}

	render() {
		return (<>
			<ErrorModal show={this.getObjects().show} handleClose={this.hideModal} >
				{this.getObjects().error}
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
						defaultValue={this.getObjects().apiRoot}
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
						defaultValue={this.getObjects().collectionId}
					/>
				</div>
				<div className="grid grid-cols-6 gap-6 mb-8">

					<div className="col-span-6 sm:col-span-3">
						<label htmlFor="object-id" className="block text-sm font-medium text-gray-700">
							id
						</label>
						<input
							type="text"
							name="object-id"
							id="object-id"
							className="h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm sm:text-lg border-gray-300 rounded-md"
							defaultValue={this.getObjects().objectId}
						/>
					</div>

					<div className="col-span-6 sm:col-span-3">
						<label htmlFor="object-spec_version" className="block text-sm font-medium text-gray-700">
							spec_version
						</label>
						<input
							type="text"
							name="object-spec_version"
							id="object-spec_version"
							className="h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm sm:text-lg border-gray-300 rounded-md"
						/>
					</div>

					<div className="col-span-6 sm:col-span-3">
						<label htmlFor="object-type" className="block text-sm font-medium text-gray-700">
							type
						</label>
						<input
							type="text"
							name="object-type"
							id="object-type"
							className="h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm sm:text-lg border-gray-300 rounded-md"
						/>
					</div>
					<div className="col-span-6 sm:col-span-3">
						<label htmlFor="object-version" className="block text-sm font-medium text-gray-700">
							version
						</label>
						<input
							type="text"
							name="object-version"
							id="object-version"
							className="h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm sm:text-lg border-gray-300 rounded-md"
						/>
					</div>
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

			<div className="flex flex-col">
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Object
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{
										this.getObjects().objects?.map((object) => {

											const keyDOM = Object.keys(object).map((key) => {
												return (
													<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
														<dt className="text-sm font-medium text-gray-500">{key}</dt>
														<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{object[key as keyof typeof object]}</dd>
													</div>
												)
											});

											return (
												<tr>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="flex items-center">
															<div className="ml-4">
																<div className="text-sm font-medium text-gray-900">
																	<div className="bg-white shadow overflow-hidden sm:rounded-lg">
																		<div className="border-t border-gray-200">
																			<dl>
																				{keyDOM}
																			</dl>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div >
		</>
		)

	}
}