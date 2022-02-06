type IObjectsButton = {
	collectionId: string,
	onClick: any
}

export default function ObjectsButton({ collectionId, onClick }: IObjectsButton) {
	return (
		collectionId ?
			<div className="px-4 py-3 text-right sm:px-6">
				<button
					onClick={onClick}
					className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Get Objects for {collectionId}
				</button>
			</div> : <></>
	)
}