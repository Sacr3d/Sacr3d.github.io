import React from "react";
import { ObjectsAPI } from "../../apis/Objects.api";
import DescriptionList from "../DescriptionListComponent";
import DescriptionListItem from "../DescriptionListComponent/DescriptionListItem";
import DescriptionListSublistUnraveled from "../DescriptionListComponent/DescriptionListSublistUnraveled";
import ErrorModal, { ErrorDto } from "../ErrorModalComponent";
import FormInput from "../FormComponent/FormInput";
import Table from "../TableComponent";
import TableHead from "../TableComponent/TableHead";


type GetObjectsDto = {
	objects?: object[]
}

type ObjectsGetState = {
	collectionId?: string
	apiRootUrl?: string
	objectId?: string,
	objects?: object[]
	show: boolean;
	error: ErrorDto;
}

export default class ObjectsGetComponent extends React.Component<any> {

	public state: ObjectsGetState = {
		collectionId: undefined,
		apiRootUrl: undefined,
		objectId: undefined,
		objects: undefined,
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
			apiRootUrl: this.props.apiRootUrl,
			collectionId: this.props.collectionId,
			objectId: this.props.objectId
		},
			() => {
				if (this.getState().apiRootUrl && this.getState().collectionId) {
					const params = {
						'match[id]': this.getState().objectId,
					}
					ObjectsAPI.getAllByCollectionId(this.getState().apiRootUrl, this.getState().collectionId, params)
						.then(
							(response) => {
								const objects: GetObjectsDto = response.data;
								if (objects.objects) {
									this.setState({
										objects: objects.objects,
									})
								} else {
									this.setState({
										objects: undefined,
									})
								}
							}
						).catch(function (error) {
							alert(error)
						});
				}
			})
	}

	getState = () => {
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
					const objects: GetObjectsDto = response.data;
					if (objects.objects && objects.objects.length > 0) {
						this.setState({
							objects: objects.objects,
							apiRootUrl: apiRootInput,
							collectionId: collectionId
						})
					} else {
						this.setState({
							objects: undefined,
						})
					}

				}
			).catch((err) => {
				this.setState({
					objects: undefined,
				})
				if (err.response) {
					this.setState({ show: true, error: err.response.data })
				}
			});
	}

	render() {
		return (
			<>
				<ErrorModal show={this.getState().show} handleClose={this.hideModal} >
					{this.getState().error}
				</ErrorModal>

				<form onSubmit={this.onFormSubmit} className="mb-16">
					<FormInput
						label="api-root"
						height="h-16"
						defaultValue={this.getState().apiRootUrl}
					/>
					<FormInput
						label="collectionId"
						height="h-16"
						defaultValue={this.getState().collectionId}
					/>
					<div className="grid grid-cols-6 gap-6 mb-8">

						<div className="col-span-6 sm:col-span-3">
							<FormInput
								label="object-id"
								height="h-8"
								defaultValue={this.getState().objectId}
							/>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<FormInput
								label="object-spec_version"
								height="h-8"
							/>
						</div>

						<div className="col-span-6 sm:col-span-3">
							<FormInput
								label="object-type"
								height="h-8"
							/>
						</div>
						<div className="col-span-6 sm:col-span-3">
							<FormInput
								label="object-version"
								height="h-8"
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

				<Table>
					<TableHead
						tableHeadTitle="Objects"
					/>
					<tbody className="bg-white divide-y divide-gray-200">
						{
							this.getState().objects
								?
								this.getState().objects?.map((object) => {
									return (
										<tr>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<DescriptionList
													listTitle={undefined}
												>
													{
														this.unravelObject(object)
													}
												</DescriptionList>
											</td>
										</tr>
									)
								})
								:
								<></>
						}
					</tbody>
				</Table>
			</>
		)

	}

	unravelObject(object: object): React.ReactElement<any, string | React.JSXElementConstructor<any>>[] {
		return Object.keys(object).map((key) => {

			if (typeof object[key as keyof typeof object] === 'object') {
				const objectJson: unknown = object[key as keyof typeof object]
				if (Array.isArray(objectJson))
					return (
						<>
							< DescriptionListSublistUnraveled
								listItemTitle={key}
								dataMap={this.unravelArray}
								data={objectJson as Array<object>}
							/>
						</>
					)
			}


			return (
				<DescriptionListItem
					listItemTitle={key}
					listItemData={String(JSON.stringify(object[key as keyof typeof object]))
					} />
			);
		});
	}
	unravelArray = (objects: object[]): any => {
		console.log(objects);

		return objects.map((object) => {
			return (
				<div className="p-1 border border-gray-200 rounded-md divide-y divide-gray-200 my-4">
					{
						Object.keys(object).map((key) => {
							return (
								<DescriptionListItem
									listItemTitle={key}
									listItemData={String(JSON.stringify(object[key as keyof typeof object]))}
								/>
							)
						})
					}
				</div>
			)
		})
	}
}