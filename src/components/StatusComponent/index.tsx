import React from "react";
import { NavLink } from "react-router-dom";
import { StatusAPI } from "../../apis/Status.api";
import ErrorModal, { ErrorDto } from "../ErrorModalComponent";

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
	show: boolean;
	error: ErrorDto;
	statusDto?: StatusDto;
}

export default class StatusComponent extends React.Component<any> {

	public state: StatusState = {
		apiRootUrl: undefined,
		show: false,
		error: {
			title: '',
			description: '',
			http_status: 0,
			details: {}
		},
		statusDto: undefined

	}

	hideModal = () => {
		this.setState({ show: false });
	};


	componentDidMount() {
		this.setState({
			apiRootUrl: this.props.apiRoot,
			statusDto: this.props.statusDto
		})
	}

	getObjects = () => {
		return this.state
	}

	onFormSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const target = e.target as typeof e.target & {
			'api-root': { value: string },
			'statusId': { value: string }
		};

		const apiRootInput = target['api-root'].value;
		const statusId = target['statusId'].value;

		StatusAPI.getById(apiRootInput, statusId)
			.then(
				(response) => {

					const statusDto: StatusDto = response.data;

					this.setState({
						apiRootUrl: apiRootInput,
						statusDto: statusDto
					})
				}
			).catch((err) => {
				this.setState({
					objects: [{ message: err }],
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
						defaultValue={this.getObjects().apiRootUrl}
					/>
				</div>
				<label htmlFor="price" className="block font-medium text-gray-700">
					statusId
				</label>
				<div className="mt-1 relative rounded-md shadow-sm mb-8">
					<input
						type="text"
						name="statusId"
						id="statusId"
						className="h-16 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm sm:text-lg border-gray-300 rounded-md"
						placeholder="statusId"
						defaultValue={this.getObjects().statusDto?.id}
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
									this.getObjects().statusDto?.id
								}
							</dd>
						</div>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">status</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									this.getObjects().statusDto?.status
								}
							</dd>
						</div>
						{
							this.getObjects().statusDto?.request_timestamp
								?
								<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">request_timestamp</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{
											this.getObjects().statusDto?.request_timestamp
										}
									</dd>
								</div>
								:
								<></>
						}
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">total_count</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									this.getObjects().statusDto?.total_count
								}
							</dd>
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">success_count</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									this.getObjects().statusDto?.success_count
								}
							</dd>
						</div>
						{
							this.getObjects().statusDto?.successes
								?
								<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">successes</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{
											this.getObjects().statusDto?.successes?.map((object) => {

												const keyDOM = Object.keys(object).map((key) => {

													if (key === 'id') {


														return (
															<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
																<dt className="text-sm font-medium text-gray-500">{key}</dt>
																<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																	<NavLink
																		to={'/objects/get'}
																		state={{ apiRoot: this.getObjects().apiRootUrl, objectId: object[key as keyof typeof object] }}
																	>
																		{object[key as keyof typeof object]}
																	</NavLink>
																</dd>
															</div>
														)

													}

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
									</dd>
								</div>
								:
								<></>
						}
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">failure_count</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									this.getObjects().statusDto?.failure_count
								}
							</dd>
						</div>
						{
							this.getObjects().statusDto?.failures
								?
								<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">failures</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{
											this.getObjects().statusDto?.failures?.map((object) => {

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
									</dd>
								</div>
								:
								<></>
						}
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">pending_count</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								{
									this.getObjects().statusDto?.pending_count
								}
							</dd>
						</div>
						{
							this.getObjects().statusDto?.pendings
								?
								<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<dt className="text-sm font-medium text-gray-500">pendings</dt>
									<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
										{
											this.getObjects().statusDto?.pendings?.map((object) => {

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
									</dd>
								</div>
								:
								<></>
						}
					</dl>
				</div >
			</div >
		</>
		)

	}



	private constructTitle(): React.ReactNode {

		if (!this.getObjects().apiRootUrl) {
			return ''
		}

		if (this.getObjects().apiRootUrl?.match(new RegExp(/\/+$/))) {
			return (this.getObjects().apiRootUrl as string) + 'status/' + this.getObjects().statusDto?.id
		}

		return (this.getObjects().apiRootUrl as string) + '/status/' + this.getObjects().statusDto?.id
	}
}