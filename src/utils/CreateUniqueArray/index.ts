const createUniqueObjectArray = (array?: object[]) => {

	console.log(array);

	if (array) {
		return array.filter((value, index, self) =>
			index === self.findIndex((t) => (
				t['id' as keyof typeof t] === value['id' as keyof typeof value]
			))
		);
	}

	return undefined

}

export { createUniqueObjectArray }