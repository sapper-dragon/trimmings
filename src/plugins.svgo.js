/* eslint-disable id-length */

// SEE: https://raw.githubusercontent.com/svg/svgo/master/.svgo.yml
// SEE: https://github.com/svg/svgo/blob/master/lib/svgo/js2svg.js#L6 for more config options

export const plugins = {

	svelte: [
		{ removeDimensions: true },
		{ removeRasterImages: true },
		{ removeScriptElement: true },
		{ removeStyleElement: true },
		{ removeViewBox: false },
		{ removeXMLNS: true },
	],

	static: [
		{ addClassesToSVGElement: { className: 'svg-static' } },
		{ removeRasterImages: true },
		{ removeScriptElement: true },
		{ removeStyleElement: true },
	],

}
