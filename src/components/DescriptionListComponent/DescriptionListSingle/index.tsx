
interface IDescriptionListSingle {
	listTitle?: string
	children: React.ReactElement
}

export default function DescriptionListSingle({ listTitle, children }: IDescriptionListSingle) {
	return (
		<div className="bg-white shadow overflow-hidden sm:rounded-lg">
			<div className="px-4 py-5 sm:px-6">
				<h3 className="text-lg leading-6 font-medium text-gray-900">{listTitle}</h3>
			</div>
			<div className="border-t border-gray-200">
				<dl>
					{children}
				</dl>
			</div >
		</div >
	)
}