
interface ITableHead {
	tableHeadTitle: string
}

export default function TableHead({ tableHeadTitle }: ITableHead) {
	return (
		<thead className="bg-gray-50">
			<tr>
				<th
					scope="col"
					className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
				>
					{tableHeadTitle}
				</th>
			</tr>
		</thead>
	)
}