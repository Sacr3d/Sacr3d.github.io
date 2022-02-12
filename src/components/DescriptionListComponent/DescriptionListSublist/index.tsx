interface IDescriptionListSublist {
	listItemTitle: string,
	dataMap: any
}

export default function DescriptionListSublist(
	{
		listItemTitle,
		dataMap
	}: IDescriptionListSublist
) {
	return (
		dataMap
			?
			<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm font-medium text-gray-500">{listItemTitle}</dt>
				<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
					<ul className="p-1 border border-gray-200 rounded-md divide-y divide-gray-200">
						{dataMap}
					</ul>
				</dd>
			</div>
			:
			<></>

	)
}