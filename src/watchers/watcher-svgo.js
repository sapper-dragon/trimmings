const exec = require('util').promisify(require('child_process').exec)
const { readFile, writeFile } = require('fs').promises
import SVGO from 'svgo'
import { plugins } from '../plugins.svgo'
import { magenta } from 'ansi-colors'

const svgoSvelte = new SVGO({ plugins: plugins.svelte, js2svg: { pretty: true, indent: '	' } })
const svgoStatic = new SVGO({ plugins: plugins.static, js2svg: { pretty: true, indent: '	' } })

export const change = async({ config, filepath }) => {
	try {
		const content = await readFile(`${config.svgo.watchPath}/${filepath}`, 'utf8')

		const svelteSvg = (await svgoSvelte.optimize(content)).data
		const staticSvg = (await svgoStatic.optimize(content)).data

		const paths = [
			`${config.svgo.sveltePath}/${filepath}`,
			`${config.svgo.staticPath}/${filepath}`,
		]
		await writeFile(paths[0], svelteSvg)
		await writeFile(paths[1], staticSvg)

		console.log('~>', magenta('Finished cleaning up svg file:'), filepath)
		console.log(paths.map(path => `    ${path}`).join('\n'))
		console.log()
		// refresh()
	} catch (error) {
		console.error(`exec error: ${error}`)
	}
}

export const remove = async({ config, filepath }) => {
	const commands = [
		`rm -f ${config.svgo.sveltePath}/${filepath}`,
		`rm -f ${config.svgo.staticPath}/${filepath}`,
	]
	try {
		for (let command of commands) {
			const { stdout } = await exec(command)
			if (stdout) { console.log(stdout) }
		}
	} catch (error) {
		console.error(`error: ${error}`)
	}
	console.log('~>', magenta('Finished removing svg files:'), filepath)
	console.log(commands.map(command => command.replace('rm -f ', '    ')).join('\n'))
	console.log()
}
