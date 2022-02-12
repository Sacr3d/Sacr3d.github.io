type FormOptionsProps = {
	label: string
	height: string
	options?: string[]
	onChange?: any
	value?: any
}


const FormOptionsWithUndefinedInput = ({ label, height, options, onChange, value }: FormOptionsProps) => {

	const className = height + " mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-lg"

	return (
		<>
			<label htmlFor={label} className="block font-medium text-gray-700">
				{label}
			</label>
			<div className="mt-1 relative rounded-md shadow-sm mb-8">
				<select
					id={label}
					name={label}
					className={className}
					onChange={onChange}
					value={value}
				>
					<option key={undefined} value={undefined}></option>
					{
						options?.map(option =>
							<option key={option}>{option}</option>
						)
					}
				</select>
			</div>
		</>
	)
}

export { FormOptionsWithUndefinedInput } 