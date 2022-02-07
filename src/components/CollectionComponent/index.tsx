import React from "react";
import { NavLink } from "react-router-dom";
import { CollectionAPI } from "../../apis/Collection.api";
import DescriptionList from "../DescriptionListComponent";
import DescriptionListItem from "../DescriptionListComponent/DescriptionListItem";
import DescriptionListSublist from "../DescriptionListComponent/DescriptionListSublist";
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

interface ICollectionState {
	collectionId?: string
	apiRootUrl?: string
	collection?: GetCollectionDto
	title?: string
	show: boolean;
	error: ErrorDto;
}

export default class CollectionComponent extends React.Component<any> {

	public state: ICollectionState = {
		collectionId: undefined,
		apiRootUrl: undefined,
		collection: undefined,
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
		},
			() => {
				this.setState({ title: this.constructTitle() })
				if (this.getState().apiRootUrl && this.getState().collectionId) {
					CollectionAPI.getById(this.getState().apiRootUrl, this.getState().collectionId)
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

	getState = () => {
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
					const collection = response.data;
					this.setState({
						collection: collection,
						apiRootUrl: apiRootInput,
						collectionId: collectionId
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
						defaultValue={this.getState().apiRootUrl}
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
						defaultValue={this.getState().collectionId}
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

			<DescriptionList
				listTitle={this.getState().title}
			>
				<DescriptionListItem
					listItemTitle="id"
					listItemData={this.getState().collection?.id}
				/>
				<DescriptionListItem
					listItemTitle="title"
					listItemData={this.getState().collection?.title}
				/>
				<DescriptionListItem
					listItemTitle="description"
					listItemData={this.getState().collection?.description}
				/>
				<DescriptionListItem
					listItemTitle="alias"
					listItemData={this.getState().collection?.alias}
				/>
				<DescriptionListItem
					listItemTitle="can_read"
					listItemData={this.getState().collection?.can_read}
				/>
				<DescriptionListItem
					listItemTitle="can_write"
					listItemData={this.getState().collection?.can_write}
				/>
				<DescriptionListSublist
					listItemTitle="media_types"
					dataMap={this.mapMediaTypes}
				/>

			</DescriptionList>

			{
				this.getState().collectionId
					?
					<div className="inset-y-0 right-0 flex items-center justify-end gap-2">
						<NavLink
							to={'/objects/get'}
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							state={{ apiRootUrl: this.getState().apiRootUrl, collectionId: this.getState().collectionId }}
						>
							Get Objects
						</NavLink>
						<NavLink
							to={'/objects/post'}
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							state={{ apiRootUrl: this.getState().apiRootUrl, collectionId: this.getState().collectionId }}
						>
							Post Objects
						</NavLink>
					</div>
					:
					<></>
			}
		</>
		)

	}


	constructTitle = () => {

		const apiRootUrl = this.getState().apiRootUrl
		const collectionId = this.getState().collectionId

		if (!apiRootUrl && !collectionId) {
			return undefined
		}

		if (apiRootUrl?.match(new RegExp(/\/+$/))) {
			return String(apiRootUrl + collectionId)
		}

		return apiRootUrl + '/' + collectionId
	}

	mapMediaTypes = () => {
		return this.getState().collection?.media_types
			?
			this.getState().collection?.media_types.map((type) => {
				return (
					<li className="flex items-center justify-between text-sm">
						<div className="p-4 w-0 flex-1 flex items-center">
							<span className="flex-1 w-0 truncate">
								{type}
							</span>
						</div>
					</li>
				);
			})
			:
			<></>;
	}
}