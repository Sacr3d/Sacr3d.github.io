import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CollectionAPI } from "../../apis/Collection.api";
import { ObjectsAPI } from "../../apis/Objects.api";
import { VersionAPI } from "../../apis/Version.api";
import { DiscoveryDtoContext } from "../../App";
import { IVersionProps } from "../../routes/version.route";
import { createUniqueObjectArray } from "../../utils/CreateUniqueArray";
import DescriptionListSingle from "../DescriptionListComponent/DescriptionListSingle";
import DescriptionListSublist from "../DescriptionListComponent/DescriptionListSublist";
import { FormOptionsInput } from "../FormComponent/FormOptions";

const VersionComponent = ({ apiRootUrl, collectionId, objectId }: IVersionProps) => {

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

	interface IObjects {
		objects?: object[]
	}
	interface IVersions {
		versions?: Date[]
	}

	const discoveryContext = useContext(DiscoveryDtoContext);


	const [apiRootURLState, setAPIRootURL] = useState<string | undefined>(undefined);
	const [collectionIdState, setCollectionId] = useState<string | undefined>(undefined);
	const [objectIdState, setObjectId] = useState<string | undefined>(undefined);
	useEffect(
		() => {
			if (apiRootUrl !== undefined)
				setAPIRootURL(apiRootUrl)
			else
				setAPIRootURL(discoveryContext.default)

			setCollectionId(collectionId)
			setObjectId(objectId)

		}, [apiRootUrl, collectionId, discoveryContext.default, objectId],
	)

	const [apiRootURLs, setAPIRootURLs] = useState<string[] | undefined>(undefined);
	useEffect(
		() => {
			if (!apiRootURLState) {
				setAPIRootURLs(discoveryContext.api_roots)
			}
		}, [apiRootURLState, discoveryContext.api_roots],
	)

	const [collections, setCollections] = useState<ICollections>({} as ICollections);
	const [changingAPIRootURL, setChangingAPIRootURL] = useState<boolean>(true);
	useEffect(
		() => {
			if (changingAPIRootURL && apiRootURLState) {

				CollectionAPI.get(apiRootURLState)
					.then(
						(response) => {
							const collections = response.data as ICollections
							setCollections(collections)
							setCollectionId(collections.collections?.at(0)?.id)
							setChangingAPIRootURL(false)
							setChangingCollectionId(true)
						}
					)
					.catch(console.log)
			}
		}, [apiRootURLState, changingAPIRootURL],
	)

	const [objects, setObjects] = useState<IObjects>({} as IObjects);
	const [changingCollectionId, setChangingCollectionId] = useState<boolean>(false);
	useEffect(
		() => {
			if (changingCollectionId) {
				ObjectsAPI.getAllByCollectionId(apiRootURLState, collectionIdState)
					.then(
						(response) => {
							const objects = response.data as IObjects
							objects.objects = createUniqueObjectArray(objects.objects)
							setObjects(objects)

							const object = objects.objects?.at(0)
							if (object)
								setObjectId(object['id' as keyof typeof object])

							setChangingCollectionId(false)
						}
					)
			}
		}, [apiRootURLState, changingCollectionId, collectionIdState]
	)

	const [submitted, setSubmitted] = useState<boolean>(false);
	const [versions, setVersions] = useState<IVersions>({} as IVersions);
	useEffect(
		() => {
			if (submitted) {
				VersionAPI.getById(apiRootURLState, collectionIdState, objectIdState)
					.then(
						(response) => {
							const versions = response.data as IVersions
							setVersions(versions)
							setSubmitted(false)
						}
					)
			}
		}, [apiRootURLState, collectionIdState, objectIdState, submitted]
	)


	const submit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setSubmitted(true)
	}

	const apiRootSelected = (e: React.SyntheticEvent) => {
		e.preventDefault();
		console.log('apiRootSelected');

		const target = e.target as typeof e.target & {
			value: string
		};

		const apiRootURLTargetValue = target.value;

		setAPIRootURL(apiRootURLTargetValue)
		setChangingAPIRootURL(true)
	}

	const collectionSelected = (e: React.SyntheticEvent) => {
		e.preventDefault();

		console.log('collectionSelected');

		const target = e.target as typeof e.target & {
			value: string
		};

		const collectionTargetValue = target.value;

		setCollectionId(collectionTargetValue)
		setChangingCollectionId(true)
	}

	const objectSelected = (e: React.SyntheticEvent) => {
		e.preventDefault();

		console.log('objectSelected');

		const target = e.target as typeof e.target & {
			value: string
		};

		const objectTargetValue = target.value;

		setObjectId(objectTargetValue)
	}

	const mapVersions = ({ versions }: IVersions) => {
		return versions
			?
			versions.map((version) => {
				return (
					<li className="flex items-center justify-between text-sm">
						<div className="p-4 w-0 flex-1 flex items-center">
							<span className="flex-1 w-0 truncate">
								{
									<NavLink
										to='/objects/get'
										state={
											{
												apiRootUrl: apiRootURLState,
												collectionId: collectionIdState,
												objectId: objectIdState,
												version: version
											}
										}
									>
										{version}
									</NavLink>
								}
							</span>
						</div>
					</li>
				);
			})
			:
			<></>;
	}

	return (
		<>
			{/* <ErrorModal show={this.getState().show} handleClose={this.hideModal} >
				{this.getState().error}
			</ErrorModal> */}
			<form onSubmit={submit} className="mb-16">
				<FormOptionsInput
					label="api-root"
					height="h-16"
					options={apiRootURLs}
					onChange={apiRootSelected}
				/>
				<FormOptionsInput
					label="collectionId"
					height="h-16"
					options={collections.collections?.map((collectionsCollection) => collectionsCollection.id)}
					onChange={collectionSelected}
				/>
				<FormOptionsInput
					label="objectId"
					height="h-16"
					options={objects.objects?.map((objectTarget) => objectTarget['id' as keyof typeof objectTarget])}
					onChange={objectSelected}
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
				listTitle={''}
			>
				<DescriptionListSublist
					listItemTitle="versions"
					dataMap={mapVersions(versions)}
				/>

			</DescriptionListSingle>
		</>
	)

}



export default VersionComponent