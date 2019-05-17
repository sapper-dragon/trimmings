const exec = require('util').promisify(require('child_process').exec)
const { readFile, writeFile } = require('fs').promises
import path from 'path'
import remark from 'remark'
import html from 'remark-html'
import { green } from 'ansi-colors'

export const change = async({ config, filepath }) => {
	const markdown = await readFile(path.join(process.cwd(), `/${config.remark.watchPath}/${filepath}`), 'utf8')
	const filename = `${filepath.replace(config.remark.pathMatcher, '')}.svelte`
	const writePath = `/${config.remark.sveltePath}/${filename}`
	const parsed = (await remark().use(html).process(markdown)).contents
	await writeFile(path.join(process.cwd(), writePath), parsed, 'utf8')
	console.log('~>', green('Finished converting markdown to svelte:'), writePath)
	console.log()
}

export const remove = async({ config, filepath }) => {
	try {
		const filename = `${filepath.replace(config.remark.pathMatcher, '')}.svelte`
		const { stdout } = await exec(`rm -f ${config.remark.sveltePath}/${filename}`)
		if (stdout) { console.log(stdout) }
	} catch (error) {
		console.error(`error: ${error}`)
	}
	console.log('~>', green('Finished removing markdown file:'), filepath)
	console.log()
}
