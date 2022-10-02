module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,ico,png,txt,jpeg,js,css}'
	],
	swDest: 'build/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};