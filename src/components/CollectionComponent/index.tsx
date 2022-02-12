import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CollectionAPI } from "../../apis/Collection.api";
import { DiscoveryDtoContext } from "../../App";
import { constructTitle } from "../../utils/NameConstruct";
import DescriptionList from "../DescriptionListComponent";
import DescriptionListItem from "../DescriptionListComponent/DescriptionListItem";
import DescriptionListSublist from "../DescriptionListComponent/DescriptionListSublist";
import ErrorModal, { ErrorDto } from "../ErrorModalComponent";
import { FormOptionsInput } from "../FormComponent/FormOptions";

type APIRootComponentProps = {
	apiRootUrl?: string
	collectionId?: string
}


const CollectionComponent = ({ apiRootUrl, collectionId }: APIRootComponentProps) => {

	interface ICollection {
		id: string,
		title: string,
		description: string
		alias: string,
		can_read: boolean,
		can_write: boolean,
		media_types: string[]
	}

	interface ICollections {
		collections?: ICollection[]
	}


	const discoveryContext = useContext(DiscoveryDtoContext);

	const [collection, setCollection] = useState<ICollection>({} as ICollection);

	const [apiRootURLState, setAPIRootURL] = useState<string | undefined>(undefined);
	const [collectionIdState, setCollectionId] = useState<string | undefined>(undefined);

	const [apiRootURLTarget, setAPIRootURLTarget] = useState<string | undefined>(undefined);

	const [collections, setCollections] = useState<ICollections>({} as ICollections);

	const [init, setInit] = useState<boolean>(true);
	const [changing, setChanging] = useState<boolean>(false);
	const [submitted, setSubmitted] = useState<boolean>(false);


	useEffect(
		() => {
			if (init) {
				if (apiRootUrl !== undefined)
					setAPIRootURL(apiRootUrl)
				else
					setAPIRootURL(discoveryContext.default)

				if (collectionId !== undefined)
					setCollectionId(collectionId)

				setAPIRootURLTarget(apiRootURLState)
			}

			if (submitted) {
				CollectionAPI.getById(apiRootURLState, collectionIdState)
					.then(
						(response) => {
							setCollection(response.data)
							setSubmitted(false)
						}
					).catch(console.log)
			}
		}, [init, submitted, apiRootUrl, discoveryContext.default, collectionId, apiRootURLState, collectionIdState],

	)

	useEffect(
		() => {
			if (changing || init) {
				CollectionAPI.get(apiRootURLTarget)
					.then(
						(response) => {
							setCollections(response.data)
							setChanging(false)
							setInit(false)
						}
					).catch(console.log)
			}
		},

	)

	const submit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			'api-root': { value: string },
			'collectionId': { value: string }
		};
		const apiRootURLTargetValue = target["api-root"].value;
		const collectionIdTarget = target["collectionId"].value;

		setAPIRootURL(apiRootURLTargetValue)
		setCollectionId(collectionIdTarget)
		setSubmitted(true)
	}

	const apiRootSelected = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			value: string
		};

		const apiRootURLTargetValue = target.value;

		setAPIRootURLTarget(apiRootURLTargetValue)
		setChanging(true)
	}

	return (<>
		{/* <ErrorModal show={this.getState().show} handleClose={this.hideModal} >
			{this.getState().error}
		</ErrorModal> */}
		<form onSubmit={submit} className="mb-16">
			<FormOptionsInput
				label="api-root"
				height="h-16"
				options={discoveryContext.api_roots}
				onChange={apiRootSelected}
			/>
			<FormOptionsInput
				label="collectionId"
				height="h-16"
				options={collections.collections?.map((collectionTarget) => collectionTarget.id)}
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
			listTitle={constructTitle(apiRootURLState, collectionIdState)}
		>
			<DescriptionListItem
				listItemTitle="id"
				listItemData={collection.id}
			/>
			<DescriptionListItem
				listItemTitle="title"
				listItemData={collection.title}
			/>
			<DescriptionListItem
				listItemTitle="description"
				listItemData={collection.description}
			/>
			<DescriptionListItem
				listItemTitle="alias"
				listItemData={collection.alias}
			/>
			<DescriptionListItem
				listItemTitle="can_read"
				listItemData={collection.can_read}
			/>
			<DescriptionListItem
				listItemTitle="can_write"
				listItemData={collection.can_write}
			/>
			<DescriptionListSublist
				listItemTitle="media_types"
				dataMap={mapMediaTypes(collection)}
			/>

		</DescriptionList>

		{/* {
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
		} */}
	</>
	)

}

const mapMediaTypes = ({ media_types }: { media_types?: string[] }) => {
	return media_types?.map(
		(media_type) => {
			return (
				<li className="flex items-center justify-between text-sm">
					<div className="p-4 w-0 flex-1 flex items-center">
						<span className="flex-1 w-0 truncate">
							{media_type}
						</span>
					</div>
				</li>
			);
		}
	)
}

export default CollectionComponent

