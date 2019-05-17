const { readFile, writeFile } = require('fs').promises
import postcss from 'postcss'
import { cyan } from 'ansi-colors'
import { refresh } from '../tools'
import { getPlugins } from '../plugins.postcss'

export const change = async({ config }) => {
	try {
		const from = `${config.postcss.watchPath}/${config.postcss.filename}.postcss`
		const to = `${config.postcss.staticPath}/${config.postcss.filename}.css`
		const content = await readFile(from)
		const result = await postcss(getPlugins(config)).process(content, {
			from,
			to,
			syntax: require('postcss-scss'),
			map: { inline: false },
		})
		// console.log(result.css)
		// console.log(result.map)
		await writeFile(to, result.css)
		if (result.map) {
			await writeFile(`${to}.map`, result.map)
		}
		await refresh()
		console.log('~>', cyan('Finished converting global.postcss to global.css'))
		console.log()
	} catch (error) {
		console.error(`error: ${error}`)
	}
}
