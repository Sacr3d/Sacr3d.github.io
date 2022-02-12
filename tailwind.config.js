module.exports = {
	mode: 'jit',
	content: [
		"./src/**/*.{js,jsx,ts,tsx}", './public/index.html'
	],
	theme: {
		extend: {
			animation: {
				'reverse-spin-slow': 'reverse-spin 5s linear infinite',
			},
			keyframes: {
				'reverse-spin': {
					from: {
						transform: 'rotate(360deg)'
					}
				}
			}
		},
		plugins: [],
	}
}