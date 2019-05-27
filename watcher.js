import path from 'path'
import CheapWatch from 'cheap-watch'
import { yellow, red } from 'ansi-colors'

export const setWatch = async(name, config, internal) => {

	const { change, remove } = await require(`../${name}`)

	const watch = new CheapWatch({
		dir: path.join(process.cwd(), `/${config[name].import}`),
		filter: ({ path, stats }) => {
			const match =
				path.indexOf('.git') !== 0 &&
				path.indexOf('node_modules') !== 0 &&
				// path.indexOf('_') !== 0 &&
				(!!path.match(config[name].filter) || stats.isDirectory())
			return match
		},
		debounce: 100,
	})

	await watch.init()

	watch.on('+', ({ path, stats, isNew }) => {
		if (stats.isFile()) {
			console.log('~>', yellow(isNew ? 'Adding' : 'Changing'), './' + path)
			if (change) {
				change({ config, filepath: path, stats, isNew })
			}
		}
	})

	watch.on('-', ({ path, stats }) => {
		if (stats.isFile()) {
			console.log('~>', red('Deleting'), './' + path)
			if (remove) {
				remove({ config, filepath: path, stats })
			}
		}
	})

}
