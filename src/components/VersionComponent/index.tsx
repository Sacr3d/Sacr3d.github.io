import React from "react";
import { NavLink } from "react-router-dom";
import { VersionAPI } from "../../apis/Version.api";
import DescriptionListSingle from "../DescriptionListComponent/DescriptionListSingle";
import DescriptionListSublist from "../DescriptionListComponent/DescriptionListSublist";
import ErrorModal, { ErrorDto } from "../ErrorModalComponent";
import FormInput from "../FormComponent/FormInput";

type GetVersionDto = {
	versions?: Date[]
}

interface IVersionState {
	objectId?: string
	collectionId?: string
	apiRootUrl?: string
	versions?: GetVersionDto
	title?: string
	show: boolean;
	error: ErrorDto;
}

export default class VersionComponent extends React.Component<any> {

	public state: IVersionState = {
		collectionId: undefined,
		apiRootUrl: undefined,
		versions: undefined,
		title: undefined,
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
				this.setState({ title: this.constructTitle() })
				if (this.getState().apiRootUrl && this.getState().collectionId && this.getState().objectId) {
					VersionAPI.getById(this.getState().apiRootUrl, this.getState().collectionId, this.getState().objectId)
						.then(
							(response) => {
								const versions: GetVersionDto = response.data;
								this.setState({
									versions: versions,
								})
							}
						).catch(function (error) {
							alert(JSON.stringify(error, null, 2))
						});
				}
			});

	}

	getState = () => {
		return this.state
	}

	onFormSubmit = (e: React.SyntheticEvent) => {

		e.preventDefault();
		const target = e.target as typeof e.target & {
			'api-root': { value: string },
			'collectionId': { value: string },
			'objectId': { value: string }
		};

		const apiRootInput = target['api-root'].value;
		const collectionId = target['collectionId'].value;
		const objectId = target['objectId'].value;

		VersionAPI.getById(apiRootInput, collectionId, objectId)
			.then(
				(response) => {
					const versions = response.data;
					this.setState({
						versions: versions,
						apiRootUrl: apiRootInput,
						collectionId: collectionId,
						objectId: objectId
					})
					this.setState({
						title: this.constructTitle(),
					})
				}
			).catch((err) => {
				this.setState({ show: true, error: err.response.data })
			});
	}

	render() {
		return (<>
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
				<FormInput
					label="objectId"
					height="h-16"
					defaultValue={this.getState().objectId}
				/>
				<div className="inset-y-0 right-0 flex items-center justify-end">
					<button
						type="submit"
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Submit
					</button>
				</div>
			</form>

			<DescriptionListSingle
				listTitle={this.getState().title}
			>
				<DescriptionListSublist
					listItemTitle="versions"
					dataMap={this.mapVersions}
				/>

			</DescriptionListSingle>
		</>
		)

	}


	constructTitle = () => {

		const apiRootUrl = this.getState().apiRootUrl
		const collectionId = this.getState().collectionId
		const objectId = this.getState().objectId

		if (!apiRootUrl || !collectionId || !objectId) {
			return undefined
		}

		if (apiRootUrl?.match(new RegExp(/\/+$/))) {
			return String(apiRootUrl + collectionId + '/objects/' + objectId + '/versions').replace(/ /g, '')
		}

		return String(apiRootUrl + '/' + collectionId + '/objects/' + objectId + '/versions').replace(/ /g, '')
	}

	mapVersions = () => {
		return this.getState().versions?.versions
			?
			this.getState().versions?.versions?.map((version) => {
				return (
					<li className="flex items-center justify-between text-sm">
						<div className="p-4 w-0 flex-1 flex items-center">
							<span className="flex-1 w-0 truncate">
								{<NavLink
									to='/objects/get'
									state={
										{
											apiRootUrl: this.getState().apiRootUrl,
											collectionId: this.getState().collectionId,
											objectId: this.getState().objectId,
											version: version
										}
									}
								>
									{version}
								</NavLink>}
							</span>
						</div>
					</li>
				);
			})
			:
			<></>;
	}
}