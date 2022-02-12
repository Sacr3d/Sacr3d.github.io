import React, { useContext, useEffect, useState } from "react";
import { CollectionAPI } from "../../../apis/Collection.api";
import { ObjectsAPI } from "../../../apis/Objects.api";
import { DiscoveryDtoContext } from "../../../App";
import { IObjectsGetProps } from "../../../routes/object.route";
import { createUniqueObjectArray } from "../../../utils/CreateUniqueArray";
import DescriptionList from "../../DescriptionListComponent";
import DescriptionListItem from "../../DescriptionListComponent/DescriptionListItem";
import DescriptionListSublistUnraveled from "../../DescriptionListComponent/DescriptionListSublistUnraveled";
import ErrorModal, { ErrorDto } from "../../ErrorModalComponent";
import FormInput from "../../FormComponent/FormInput";
import { FormOptionsInput } from "../../FormComponent/FormOptions";
import { FormOptionsWithUndefinedInput } from "../../FormComponent/FormOptionsWithNull";
import Table from "../../TableComponent";
import TableHead from "../../TableComponent/TableHead";


const ObjectsGetComponent = ({ apiRootUrl, collectionId, objectId, version }: IObjectsGetProps) => {

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


	const discoveryContext = useContext(DiscoveryDtoContext);


	const [apiRootURLState, setAPIRootURL] = useState<string | undefined>(undefined);
	const [collectionIdState, setCollectionId] = useState<string | undefined>(undefined);
	const [objectIdState, setObjectId] = useState<string | undefined>(undefined);
	const [versionState, setVersion] = useState<Date | undefined>(undefined);
	useEffect(
		() => {
			if (apiRootUrl !== undefined)
				setAPIRootURL(apiRootUrl)
			else
				setAPIRootURL(discoveryContext.default)

			setCollectionId(collectionId)
			setObjectId(objectId)
			setVersion(version)
		}, [apiRootUrl, collectionId, discoveryContext.default, objectId, version],
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

							setChangingCollectionId(false)
						}
					)
			}
		}, [apiRootURLState, changingCollectionId, collectionIdState]
	)

	const [submitted, setSubmitted] = useState<boolean>(false);
	const [query, setQuery] = useState<object>({} as object);
	const [objectsResult, setObjectsResult] = useState<IObjects>({} as IObjects);
	useEffect(
		() => {
			if (submitted) {
				ObjectsAPI.getAllByCollectionId(apiRootURLState, collectionIdState, query)
					.then(
						(response) => {
							const objects = response.data as IObjects
							setObjectsResult(objects)
							setSubmitted(false)
						}
					)
			}
		}, [apiRootURLState, collectionIdState, query, submitted]
	)


	const submit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const options = e.target as typeof e.target & {
			'object-id': { value: string },
			'object-spec_version': { value: string }
			'object-type': { value: string }
			'object-version': { value: string }
		};
		const params = {
			'match[id]': options['object-id'].value.replace(/ /g, '') || undefined,
			'match[spec_version]': options['object-spec_version'].value.replace(/ /g, '') || undefined,
			'match[type]': options['object-type'].value.replace(/ /g, '') || undefined,
			'match[version]': options['object-version'].value.replace(/ /g, '') || undefined,
		}


		setAPIRootURL(apiRootURLState)
		setCollectionId(collectionIdState)
		setQuery(params)
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
			value: string | undefined
		};

		const objectTargetValue = target.value;

		if (objectTargetValue === '')
			setObjectId(undefined)
		else
			setObjectId(objectTargetValue)

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
					value={apiRootURLState}
				/>
				<FormOptionsInput
					label="collectionId"
					height="h-16"
					options={collections.collections?.map((collectionTarget) => collectionTarget.id)}
					onChange={collectionSelected}

				/>
				<div className="grid grid-cols-6 gap-6 mb-8">
					<div className="col-span-6 sm:col-span-3">
						<FormOptionsWithUndefinedInput
							label="object-id"
							height="h-16"
							options={objects.objects?.map((objectTarget) => objectTarget['id' as keyof typeof objectTarget])}
							onChange={objectSelected}
							value={objectIdState}
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
							defaultValue={version}
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
						objectsResult.objects
							?
							objectsResult.objects?.map((object) => {
								return (
									<tr>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											<DescriptionList>
												{
													unravel(object)
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

function unravel(object: object): React.ReactElement<any, string | React.JSXElementConstructor<any>>[] {
	return Object.keys(object).map((key) => {

		if (typeof object[key as keyof typeof object] === 'object') {
			const objectJson: unknown = object[key as keyof typeof object]
			if (Array.isArray(objectJson)) {
				return (
					<>
						< DescriptionListSublistUnraveled
							listItemTitle={key}
							dataMap={unravelArray}
							data={objectJson as Array<object>}
						/>
					</>
				)
			}
		}


		return (
			<DescriptionListItem
				listItemTitle={key}
				listItemData={object[key as keyof typeof object]} />
		);
	});
}


const unravelArray = (objects: object[]): any => {
	return objects.map((object) => {
		return typeof object === 'object'
			?
			unravelObjectArray(object)
			:
			unravelStringArray(object)
	})
}

function unravelObjectArray(object: object): JSX.Element {
	return (
		<div className="p-1 border border-gray-200 rounded-md divide-y divide-gray-200 my-4">
			{Object.keys(object).map((key) => {
				return (
					<DescriptionListItem
						listItemTitle={key}
						listItemData={object[key as keyof typeof object]} />
				)
			})}
		</div>
	)
}

function unravelStringArray(object: string): JSX.Element {
	return (
		<div className="p-1 border border-gray-200 rounded-md divide-y divide-gray-200 my-4">
			{
				<DescriptionListItem
					listItemTitle=''
					listItemData={object} />
			}
		</div>
	)

}

export default ObjectsGetComponent