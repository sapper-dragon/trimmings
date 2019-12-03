import fs from 'fs-extra'
import sade from 'sade'
import { green, yellow, red, gray } from 'ansi-colors'
import { loadConfig } from './config'
import * as pkg from './package.json'
import { refresh } from './tools'
import { setWatch } from './watcher'

const prog = sade('trim').version(pkg.version)
const potential_settings = ['input', 'outputSvelte', 'outputStatic']
const white_list = ['postcss', 'svgo', 'remark', 'lilypond', 'json']

prog
	.command('watch')
	.describe('Watch various Sapper "trimming" compilers')
	.option('-e, --env', 'Use .env file')
	.option('-p, --postcss', 'Use PostCSS for preprocessing', false)
	.option('-s, --svgo', 'Use SVGO compiler for svgs', false)
	.option('-r, --remark', 'Use Remark compiler for markdown', false)
	.option('-l, --lilypond', 'Use LilyPond compiler for sheet music', false)
	.option('-j, --json', 'Export generated *.json files from *.js files', false)
	.action(async(opts) => {
		console.log()

		if (opts.env) {
			require('dotenv').config({ path: opts.env })
			console.log('~>', yellow('Preloading environment variables from:'), opts.env)
		}

		const config = loadConfig()

		try {
			await refresh()
			// here we:
			// 1. check if the named option is set and white listed (i.e., postcss, svgo, etc.)
			for (let name of white_list.filter(item => opts[item])) {
				console.log('~>', green('Watching Sapper trimming:'), name)
				for (let potentialDir in config[name]) {
					// 2. check if `mkdir` needs to be employed (for different dirs)
					if (potential_settings.indexOf(potentialDir) > -1) {
						// 3. if so, do it...
						const dir = config[name][potentialDir]
						if (dir) {
							await fs.ensureDir(dir)
						}
					}
				}
				setWatch(name, config)
			}
		} catch (err) {
			console.log(red(`> ${err.message}`))
			console.log(gray(err.stack))
			process.exit(1)
		}

		console.log()
	})

prog.parse(process.argv)
