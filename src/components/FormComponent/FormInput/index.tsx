interface IFormInput {
	label: string,
	height: string
	defaultValue?: string | number | Date
}

export default function FormInput({ label, height, defaultValue }: IFormInput) {

	const className = height + " focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-sm sm:text-lg border-gray-300 rounded-md"
	return (
		<>
			<label htmlFor={label} className="block font-medium text-gray-700">
				{label}
			</label>
			<div className="mt-1 relative rounded-md shadow-sm mb-8">
				<input
					type="text"
					name={label}
					id={label}
					className={className}
					placeholder={label}
					defaultValue={
						defaultValue
							?
							String(defaultValue)
							:
							undefined
					}
				/>
			</div>
		</>
	)
}