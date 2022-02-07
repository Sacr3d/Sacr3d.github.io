
interface IDescriptionListItem {
	listItemTitle: string
	listItemData?: string | number | boolean
}

export default function DescriptionListItem({ listItemTitle, listItemData }: IDescriptionListItem) {
	return (
		listItemData !== undefined
			?
			<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
				<dt className="text-sm font-medium text-gray-500">{listItemTitle}</dt>
				<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
					{
						String(listItemData)
					}
				</dd>
			</div>
			:
			<></>
	)
}