import sade from 'sade'
import { green, red, gray } from 'ansi-colors'
import { loadConfig } from './config'
const exec = require('util').promisify(require('child_process').exec)
import * as pkg from './package.json'
import { refresh } from './tools'
import { setWatch } from './watcher'

const prog = sade('trim').version(pkg.version)
const potentialSettings = ['import', 'exportSvelte', 'exportStatic']

prog
	.command('watch')
	.describe('Watch various Sapper "trimming" compilers')
	.option('-p, --postcss', 'Use PostCSS for preprocessing', false)
	.option('-s, --svgo', 'Use SVGO compiler for svgs', false)
	.option('-r, --remark', 'Use Remark compiler for markdown', false)
	.option('-l, --lilypond', 'Use LilyPond compiler for sheet music', false)
	.action(async(opts) => {

		console.log()

		const config = loadConfig()
		// console.log(config)

		try {
			await refresh()
			// here we:
			for (let name in opts) {
				// 1. check if the named option is set (i.e., postcss, svgo, etc.)
				if (name.length > 1 && opts[name]) {
					console.log('~>', green('Watching Sapper trimming:'), name)
					for (let potentialDir in config[name]) {
						// 2. check if `mkdir` needs to be employed (for different dirs)
						if (potentialSettings.indexOf(potentialDir) > -1) {
							// 3. if so, do it...
							await exec(`mkdir -p ${config[name][potentialDir]}`)
						}
					}
					setWatch(name, config)
				}
			}
		} catch (err) {
			console.log(red(`> ${err.message}`))
			console.log(gray(err.stack))
			process.exit(1)
		}

		console.log()

	})

prog.parse(process.argv)
