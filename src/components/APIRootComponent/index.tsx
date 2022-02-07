import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { NavLink } from "react-router-dom";
import { APITRootAPI } from "../../apis/APIRoot.api";
import { CollectionAPI } from "../../apis/Collection.api";
import CollectionButton from "../CollectionButton";
import DescriptionList from "../DescriptionListComponent";
import DescriptionListSingle from "../DescriptionListComponent/DescriptionListSingle";
import DescriptionListItem from "../DescriptionListComponent/DescriptionListItem";
import DescriptionListSublist from "../DescriptionListComponent/DescriptionListSublist";
import ErrorModal, { ErrorDto } from "../ErrorModalComponent";
import FormInput from "../FormComponent/FormInput";

type CollectionDto = {
	id: string,
	title: string,
	description: string
	alias: string,
	can_read: boolean,
	can_write: boolean,
	media_types: string[]
}

type CollectionsDto = {
	collections?: CollectionDto[]
}

type APIRootDto = {
	title: string;
	description?: string;
	versions?: string[];
	max_content_length: number;
}

interface IAPIRootState {
	apiRoot?: APIRootDto
	apiRootUrl?: string
	collections: CollectionsDto
	show: boolean
	error: ErrorDto
	gotCollection: boolean
}

export default class APIRootComponent extends React.Component<any> {

	public state: IAPIRootState = {
		apiRoot: undefined,
		show: false,
		error: {
			title: '',
			description: '',
			http_status: 0,
			details: {}
		},
		apiRootUrl: undefined,
		collections: { collections: undefined },
		gotCollection: false

	}

	hideModal = () => {
		this.setState({ show: false });
	};

	componentDidMount() {

		this.setState({
			apiRootUrl: this.props.apiRootUrl
		},
			() => {
				if (this.getState().apiRootUrl) {
					APITRootAPI.get(this.getState().apiRootUrl)
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

	getState = () => {
		return this.state
	}

	getCollections = (e: React.SyntheticEvent) => {
		e.preventDefault();
		CollectionAPI.get(this.getState().apiRootUrl)
			.then((response) => {

				const collections: CollectionsDto = response.data
				if (collections.collections) {
					const collection = response.data;
					this.setState({
						collections: collection,
						gotCollection: true
					})
				} else {
					this.setState({
						collections: undefined,
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

	mapVersions = () => {
		return this.getState().apiRoot?.versions?.map((version) => {
			return (
				<li className="flex items-center justify-between text-sm">
					<div className="p-4 w-0 flex-1 flex items-center">
						<span className="flex-1 w-0 truncate">
							{version}
						</span>
					</div>
				</li>
			);
		})
	}


	mapCollections = () => {
		return this.getState().collections === undefined
			?
			<li className="flex items-center justify-between text-sm">
				<div className="p-4 w-0 flex-1 flex items-center">
					<span className="flex-1 w-0 truncate">
						No collections found
					</span>
				</div>
			</li>
			:
			this.getState().collections?.collections?.map((collection) => {
				console.log(collection);

				return (
					<li className="flex items-center justify-between text-sm">
						<div className="p-4 w-0 flex-1 flex items-center">
							<span className="flex-1 w-0 truncate">
								{<NavLink
									to='/collections'
									state={{ apiRootUrl: this.getState().apiRootUrl, collectionId: collection.id }}
								>
									{collection.id}
								</NavLink>}
							</span>
						</div>
					</li>
				);
			})
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
					listTitle={this.getState().apiRootUrl}
				>
					<DescriptionListItem
						listItemTitle="title"
						listItemData={this.getState().apiRoot?.title}
					/>
					<DescriptionListItem
						listItemTitle="description"
						listItemData={this.getState().apiRoot?.description}
					/>
					<DescriptionListSublist
						listItemTitle="versions"
						dataMap={this.mapVersions}
					/>
					<DescriptionListItem
						listItemTitle="max_content_length"
						listItemData={this.getState().apiRoot?.max_content_length}
					/>

				</DescriptionList>


				<CollectionButton
					apiRoot={this.getState().apiRootUrl}
					onClick={this.getCollections}
				/>


				{
					this.getState().apiRoot
						?
						<DescriptionListSingle
							listTitle="Collections"
						>
							<DescriptionListSublist
								listItemTitle="collections"
								dataMap={this.mapCollections}
							/>
						</DescriptionListSingle>
						:
						<></>
				}
			</>
		)
	}

}

