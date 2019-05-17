const { red } = require('ansi-colors')
const postcss = require('postcss')
const postcssScssSyntax = require('postcss-scss')

const { loadConfig } = require('./config')
const config = loadConfig()

const { getPlugins } = require('./plugins.postcss')
const plugins = getPlugins(config)

module.exports.sveltePreprocess = function(/* domain */) {
	// NOTE: `domain` is useful for debugging if it is SSR or DOM
	return {
		style: async({ content, attributes, filename }) => {
			if (attributes.type !== 'text/scss') {
				return { code: content/* , map: '' */ }
			}
			try {
				// TODO: check if variables file exists OR make it a standard shared file of some kind
				const result = await postcss(plugins).process(`@import '${config.postcss.preImport}';\n` + content, {
					from: 'src',
					syntax: postcssScssSyntax,
					// TODO: unclear if maps are needed. ASK in the forum
					// map: true,
				})
				if (result.css && typeof result.css === 'string') {
					return {
						code: result.css.toString(),
						// map: result.map.toString(),
					}
				} else {
					return { code: ''/* , map: '' */ }
				}

			} catch (error) {
				console.log(red('Error: something went wrong'))
				console.log(error)
				return { code: ''/* , map: '' */ }
			}
		},
	}
}
