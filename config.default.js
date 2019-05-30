module.exports.config = {

	postcss: {
		input: 'src/trimmings/postcss',
		filename: 'global',
		filter: /\.(postcss|css|scss)$/,
		outputStatic: 'static/css',
		preImport: 'svelte-pre-imports',
	},

	svgo: {
		input: 'src/trimmings/svgo',
		filter: /\.(svg)$/,
		outputSvelte: 'src/routes/_svg',
		outputStatic: 'static/svg',
	},

	remark: {
		input: 'src/trimmings/remark',
		filter: /\.md$/,
		outputSvelte: 'src/routes/_markdown',
	},

	lilypond: {
		input: 'src/trimmings/lilypond',
		filter: /\.ly$/,
		outputStatic: 'static/music',
	},

}
