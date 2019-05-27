module.exports.config = {

	postcss: {
		import: 'src/trimmings/postcss',
		filename: 'global',
		filter: /\.(postcss|css|scss)$/,
		exportStatic: 'static/css',
		preImport: 'svelte-pre-imports',
	},

	svgo: {
		import: 'src/trimmings/svgo',
		filter: /\.(svg)$/,
		exportSvelte: 'src/routes/_svg',
		exportStatic: 'static/svg',
	},

	remark: {
		import: 'src/trimmings/remark',
		filter: /\.md$/,
		exportSvelte: 'src/routes/_markdown',
	},

	lilypond: {
		import: 'src/trimmings/lilypond',
		filter: /\.ly$/,
		exportStatic: 'static/music',
	},

}
