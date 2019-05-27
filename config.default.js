module.exports.config = {

	postcss: {
		watchPath: 'src/trimmings/postcss',
		filename: 'global',
		pathMatcher: /\.(postcss|css|scss)$/,
		staticPath: 'static/css',
		preImport: 'svelte-pre-imports',
	},

	svgo: {
		watchPath: 'src/trimmings/svgo',
		pathMatcher: /\.(svg)$/,
		sveltePath: 'src/routes/_svg',
		staticPath: 'static/svg',
	},

	remark: {
		watchPath: 'src/trimmings/remark',
		pathMatcher: /\.md$/,
		sveltePath: 'src/routes/_markdown',
	},

	lilypond: {
		watchPath: 'src/trimmings/lilypond',
		pathMatcher: /\.ly$/,
		staticPath: 'static/music',
	},

}
