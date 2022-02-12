import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { StatusAPI } from "../../apis/Status.api";
import { DiscoveryDtoContext } from "../../App";
import { IStatusProps } from "../../routes/status.route";
import DescriptionList from "../DescriptionListComponent";
import DescriptionListItem from "../DescriptionListComponent/DescriptionListItem";
import DescriptionListItemWithChildren from "../DescriptionListComponent/DescriptionListItemWithChildren";
import DescriptionListSublist from "../DescriptionListComponent/DescriptionListSublist";
import ErrorModal, { ErrorDto } from "../ErrorModalComponent";
import FormInput from "../FormComponent/FormInput";
import { FormOptionsInput } from "../FormComponent/FormOptions";


const StatusComponent = ({ apiRootUrl, statusDto }: IStatusProps) => {

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
	interface IError {
		title: '',
		description: '',
		http_status: 0,
		details: {}
	}

	const discoveryContext = useContext(DiscoveryDtoContext);


	const [status, setStatus] = useState<IStatus>({} as IStatus);

	const [apiRootURLState, setAPIRootURL] = useState<string | undefined>(undefined);
	const [statusIdState, setStatusId] = useState<number | undefined>(undefined);

	const [init, setInit] = useState<boolean>(true);
	const [submitted, setSubmitted] = useState<boolean>(false);

	const [showError, setShowError] = useState<boolean>(false);
	const [error, setError] = useState<IError>({} as IError);


	useEffect(
		() => {
			if (init) {
				if (apiRootUrl !== undefined)
					setAPIRootURL(apiRootUrl)
				else
					setAPIRootURL(discoveryContext.default)

				if (statusDto !== undefined)
					setStatusId(statusDto.id)

				setInit(false)
			}

			if (submitted) {
				StatusAPI.getById(apiRootURLState, statusIdState)
					.then(
						(response) => {
							setStatus(response.data)
							setSubmitted(false)
						}
					).catch(
						(err) => {
							if (err.response) {
								console.log(err.response.data);

								setError(err.response.data)
								setShowError(true)
							}
						}
					)
			}
		}, [init, submitted, apiRootUrl, discoveryContext.default, apiRootURLState, statusDto, statusIdState],

	)

	const submit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			'api-root': { value: string },
			statusId: { value: number }
		};
		const apiRootURLTarget = target["api-root"].value;
		const statusIdTarget = target.statusId.value;

		console.log(apiRootURLTarget);


		setAPIRootURL(apiRootURLTarget)
		setStatusId(statusIdTarget)
		setSubmitted(true)
	}

	const mapStatusDetail = (statusDetails?: object[]) => {
		return statusDetails?.map((statusDetail) => {
			return (
				<DescriptionList>
					{
						Object.keys(statusDetail).map((key) => {
							if (key === 'id') {
								return (
									<DescriptionListItemWithChildren
										listItemTitle={key}>
										<NavLink
											to={'/objects/get'}
											state={{ apiRootUrl: apiRootURLState, objectId: statusDetail[key as keyof typeof statusDetail] }}
										>
											{statusDetail[key as keyof typeof statusDetail]}
										</NavLink>
									</DescriptionListItemWithChildren>

								)
							}
							return (
								<DescriptionListItem
									listItemTitle={key}
									listItemData={statusDetail[key as keyof typeof statusDetail]}
								/>
							)
						})
					}
				</DescriptionList>
			)
		})
	}

	const handleClose = () => {
		setShowError(false)
	};

	return (<>
		<ErrorModal show={showError} handleClose={handleClose} >
			{error}
		</ErrorModal>
		<form onSubmit={submit} className="mb-16">
			<FormOptionsInput
				label="api-root"
				height="h-16"
				options={discoveryContext.api_roots}
			/>
			<FormInput
				label="statusId"
				height="h-16"
				defaultValue={status.id}
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
			listTitle="test"
		>
			<DescriptionListItem
				listItemTitle="id"
				listItemData={status.id}
			/>
			<DescriptionListItem
				listItemTitle="status"
				listItemData={status.status}
			/>
			<DescriptionListItem
				listItemTitle="request_timestamp"
				listItemData={status.request_timestamp}
			/>
			<DescriptionListItem
				listItemTitle="total_count"
				listItemData={status.total_count}
			/>
			<DescriptionListItem
				listItemTitle="success_count"
				listItemData={status.success_count}
			/>
			<DescriptionListSublist
				listItemTitle="successes"
				dataMap={mapStatusDetail(status.successes)}
			/>
			<DescriptionListItem
				listItemTitle="failure_count"
				listItemData={status.failure_count}
			/>
			<DescriptionListSublist
				listItemTitle="failures"
				dataMap={mapStatusDetail(status.failures)}
			/>
			<DescriptionListItem
				listItemTitle="pending_count"
				listItemData={status.pending_count}
			/>
			<DescriptionListSublist
				listItemTitle="pendings"
				dataMap={mapStatusDetail(status.pendings)}
			/>
		</DescriptionList>
	</>
	)

}

export default StatusComponent
