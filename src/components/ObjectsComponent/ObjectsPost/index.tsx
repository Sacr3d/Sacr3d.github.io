import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CollectionAPI } from "../../../apis/Collection.api";
import { ObjectsAPI } from "../../../apis/Objects.api";
import { DiscoveryDtoContext } from "../../../App";
import { IObjectsPostProps } from "../../../routes/object.route";
import { FormOptionsInput } from "../../FormComponent/FormOptions";


const ObjectsPostComponent = ({ apiRootUrl, collectionId }: IObjectsPostProps) => {

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

	interface IStatus {
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

	const discoveryContext = useContext(DiscoveryDtoContext);
	const navigation = useNavigate();


	const [apiRootURLState, setAPIRootURL] = useState<string | undefined>(undefined);
	const [collectionIdState, setCollectionId] = useState<string | undefined>(undefined);

	const [apiRootURLTarget, setAPIRootURLTarget] = useState<string | undefined>(undefined);

	const [collections, setCollections] = useState<ICollections>({} as ICollections);

	const [init, setInit] = useState<boolean>(true);
	const [changing, setChanging] = useState<boolean>(false);



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

		}, [init, apiRootUrl, discoveryContext.default, collectionId, apiRootURLState],

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

		const apiRootURLTargetValue = target["api-root"].value
		const collectionIdTargetValue = target["collectionId"].value

		const data = e.target as typeof e.target & {
			'objects': { value: string },
		}

		const body = {
			objects: JSON.parse(data['objects'].value)
		}

		ObjectsAPI.postByCollectionId(apiRootURLTargetValue, collectionIdTargetValue, body)
			.then(
				(response) => {

					const status: IStatus = response.data;

					navigation('../status', { state: { statusDto: status, apiRootUrl: apiRootURLTargetValue } })
				}
			).catch(console.log);
	}

	const apiRootSelected = (e: React.SyntheticEvent): void => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			value: string
		};

		const apiRootURLTargetValue = target.value;

		setAPIRootURLTarget(apiRootURLTargetValue)
		setChanging(true)
	}

	const changeTextArea = (e: FormEvent<HTMLTextAreaElement>): void => {
		const textArea = e.currentTarget
		textArea.style.height = 'auto';
		textArea.style.height = textArea.scrollHeight + 'px';
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
			<div>
				<label htmlFor="about" className="block text-sm font-medium text-gray-700">
					Objects
				</label>
				<div className="mt-1 relative rounded-md shadow-sm mb-8">
					<textarea
						id="objects"
						name="objects"
						onChange={changeTextArea}
						className="h-16 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm sm:text-lg border-gray-300 rounded-md"
						placeholder={JSON.stringify(
							[
								{ id: '...' },
								{ id: '...' }
							]
							, null, 2)}
					/>
				</div>
				<p className="mt-2 text-sm text-gray-500">
					All objects must be contained in: []
				</p>
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
	</>
	)


}
export default ObjectsPostComponent