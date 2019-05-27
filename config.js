const { readFileSync } = require('fs')
const { red } = require('ansi-colors')
const { config } = require('./config.default')

module.exports.loadConfig = () => {

	let code
	let userConfig
	try {
		code = readFileSync('trimmings.config.js', 'utf-8')
	} catch (error) {} // silent fail

	if (code) {
		try {
			code = code.replace(/ +/g, ' ').replace('export default', 'module.exports =')
			const Module = module.constructor
			const mod = new Module()
			mod._compile(code, 'trimmings.config.js')
			userConfig = mod.exports
		} catch (error) {
			console.log('~>', red('Your config file is not formatted properly. Please fix it.'))
			process.exit()
		}

		// override with user config
		// TODO: check the sanity of the config?
		for (const key in config) {
			if (userConfig[key]) {
				config[key] = Object.assign({}, config[key], userConfig[key])
			}
		}
	}

	return config
}
