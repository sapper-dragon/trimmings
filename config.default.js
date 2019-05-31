module.exports.config = {

	json: {
		input: 'src/trimmings/json',
		filter: /\.js$/,
		outputStatic: 'static/json',
	},

	lilypond: {
		input: 'src/trimmings/lilypond',
		filter: /\.ly$/,
		outputStatic: 'static/music',
	},

	postcss: {
		input: 'src/trimmings/postcss',
		filename: 'global',
		filter: /\.(postcss|css|scss)$/,
		outputStatic: 'static/css',
		preImport: 'svelte-pre-imports',
	},

	remark: {
		input: 'src/trimmings/remark',
		filter: /\.md$/,
		outputSvelte: 'src/routes/_markdown',
	},

	svgo: {
		input: 'src/trimmings/svgo',
		filter: /\.(svg)$/,
		outputSvelte: 'src/routes/_svg',
		outputStatic: 'static/svg',
	},

}
