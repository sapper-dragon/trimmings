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

for (let command of ['watch', 'build']) {
	const command_name = command.replace(/./, ch => ch.toUpperCase())

	prog
		.command(command)
		.describe(`${command_name} specified Sapper "trimming" compilers`)
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

				if (command === 'watch') {
					await refresh()
				}
				// here we:
				// 1. check if the named option is set and white listed (i.e., postcss, svgo, etc.)
				for (let name of white_list.filter(item => opts[item])) {
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
					if (command === 'watch') {
						console.log('~>', green('Watching Sapper trimming:'), name)
						setWatch(name, config)
					} else if (command === 'build') {
						console.log('\n~>', green('Building Sapper trimming:'), name)

						const { change } = await require(`../${name}`)
						if (name === 'postcss') {
							// console.log('~>', yellow('Building'), './' + path)
							change({ config })
						} else {
							console.log('\n~>', yellow(
								`There is no build available yet for the ${name} option, \
								but that will come in the future.`
							))
						}
					}
				}

			} catch (err) {
				console.log(red(`> ${err.message}`))
				console.log(gray(err.stack))
				process.exit(1)
			}

			console.log()
		})
}

prog.parse(process.argv)
