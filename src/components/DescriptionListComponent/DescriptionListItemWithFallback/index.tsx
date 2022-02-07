
interface IDescriptionListItemWithFallback {
	listItemTitle: string
	listItemData?: string
	fallback: string
}

export default function DescriptionListItemWithFallback(
	{
		listItemTitle,
		listItemData,
		fallback
	}: IDescriptionListItemWithFallback
) {
	return (
		listItemData
			?
			<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm font-medium text-gray-500">{listItemTitle}</dt>
				<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
					{
						listItemData
					}
				</dd>
			</div>
			:
			<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm font-medium text-gray-500">{listItemTitle}</dt>
				<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
					{
						fallback
					}
				</dd>
			</div>
	)
}