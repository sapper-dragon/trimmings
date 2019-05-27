import sade from 'sade'
import { green, red, gray } from 'ansi-colors'
import { loadConfig } from './config'
const exec = require('util').promisify(require('child_process').exec)
import * as pkg from './package.json'
import { setWatch } from './watcher'

const prog = sade('trim').version(pkg.version)

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
			if (opts.postcss) {
				console.log('~>', green('Watching Sapper trimming:'), 'postcss')
				await exec(`mkdir -p ${config.postcss.watchPath}`)
				setWatch('postcss', config)
			}
			if (opts.svgo) {
				console.log('~>', green('Watching Sapper trimming:'), 'svgo')
				await exec(`mkdir -p ${config.svgo.watchPath}`)
				await exec(`mkdir -p ${config.svgo.sveltePath}`)
				await exec(`mkdir -p ${config.svgo.staticPath}`)
				setWatch('svgo', config)
			}
			if (opts.remark) {
				console.log('~>', green('Watching Sapper trimming:'), 'remark')
				await exec(`mkdir -p ${config.remark.watchPath}`)
				await exec(`mkdir -p ${config.remark.sveltePath}`)
				setWatch('remark', config)
			}
		} catch (err) {
			console.log(red(`> ${err.message}`))
			console.log(gray(err.stack))
			process.exit(1)
		}

		console.log()

	})

prog.parse(process.argv)
