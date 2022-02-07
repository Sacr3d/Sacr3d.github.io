import { ReactNode } from "react"

interface IDescriptionListSublistUnraveled {
	listItemTitle: string,
	dataMap: any,
	data: any
}

export default function DescriptionListSublistUnraveled(
	{
		listItemTitle,
		dataMap,
		data,
	}: IDescriptionListSublistUnraveled
) {
	return (

		<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" >
			<dt className="text-sm font-medium text-gray-500">{listItemTitle}</dt>
			<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
				<div className="bg-white overflow-hidden sm:rounded-lg">
					<div>
						<dl className="whitespace-pre-wrap">
							{
								dataMap(data)
							}
						</dl>
					</div>
				</div>
			</dd>
		</div>

	)
}