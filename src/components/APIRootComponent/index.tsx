import { useContext, useEffect, useState } from "react";
import { APIRootAPI } from "../../apis/APIRoot.api";
import DescriptionList from "../DescriptionListComponent";
import DescriptionListItem from "../DescriptionListComponent/DescriptionListItem";
import DescriptionListSublist from "../DescriptionListComponent/DescriptionListSublist";
import { ErrorDto } from "../ErrorModalComponent";
import { FormOptionsInput } from "../FormComponent/FormOptions";
import { DiscoveryDtoContext } from "../../App";
import { IAPIRootProps } from "../../routes/api-root.route";


const APIRootComponent = ({ apiRootUrl }: IAPIRootProps) => {

	interface IAPIRoot {
		title: string
		description?: string
		versions?: string[]
		max_content_length: number
	}

	const discoveryContext = useContext(DiscoveryDtoContext);

	const [apiRoot, setAPIRoot] = useState<IAPIRoot>({} as IAPIRoot);
	const [apiRootURL, setAPIRootURL] = useState<string | undefined>(undefined);

	useEffect(
		() => {
			setAPIRootURL(apiRootUrl)
			APIRootAPI.get(apiRootURL)
				.then(
					(response) => {
						setAPIRoot(response.data)
					}
				).catch(console.log)
		},
		[apiRootURL, apiRootUrl]
	)

	const submit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			'api-root': { value: string };
		};
		const apiRootURLTarget = target["api-root"].value;
		APIRootAPI.get(apiRootURLTarget)
			.then(
				(response) => {
					setAPIRoot(response.data)
				}
			)
	}

	return (
		<>
			{/* <ErrorModal show={show} handleClose={hideModal} >
				{error}
			</ErrorModal> */}

			<form className="mb-16" onSubmit={submit}>
				<FormOptionsInput
					label="api-root"
					height="h-16"
					options={discoveryContext.api_roots}
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
				listTitle={apiRootUrl}
			>
				<DescriptionListItem
					listItemTitle="title"
					listItemData={apiRoot?.title}
				/>
				<DescriptionListItem
					listItemTitle="description"
					listItemData={apiRoot?.description}
				/>
				<DescriptionListSublist
					listItemTitle="versions"
					dataMap={mapVersions(apiRoot)}
				/>
				<DescriptionListItem
					listItemTitle="max_content_length"
					listItemData={apiRoot?.max_content_length}
				/>

			</DescriptionList>


			{/* <CollectionButton
				apiRoot={apiRootUrl}
				onClick={getCollections}
			/> */}


			{
				// apiRoot
				// 	?
				// 	<DescriptionListSingle
				// 		listTitle="Collections"
				// 	>
				// 		<DescriptionListSublist
				// 			listItemTitle="collections"
				// 			dataMap={mapCollections}
				// 		/>
				// 	</DescriptionListSingle>
				// 	:
				// 	<></>
			}
		</>
	)
}

const mapVersions = ({ versions }: { versions?: string[] }) => {
	return versions?.map(
		(version) => {
			return (
				<li className="flex items-center justify-between text-sm">
					<div className="p-4 w-0 flex-1 flex items-center">
						<span className="flex-1 w-0 truncate">
							{version}
						</span>
					</div>
				</li>
			)
		}
	)
}

export default APIRootComponent