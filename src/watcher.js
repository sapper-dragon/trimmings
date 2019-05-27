import path from 'path'
import CheapWatch from 'cheap-watch'
import { yellow, red } from 'ansi-colors'

export const setWatch = async(name, config, internal) => {
	// TODO: remove when postcss and remark are finished
	internal = internal || false

	const { change, remove } = internal
		? await require(`./watchers/watcher-${name}`)
		: await require(`../../${name}`) // TODO: how fragile is this?

	const watch = new CheapWatch({
		dir: path.join(process.cwd(), `/${config[name].watchPath}`),
		filter: ({ path, stats }) => {
			const match =
				path.indexOf('.git') !== 0 &&
				path.indexOf('node_modules') !== 0 &&
				// path.indexOf('_') !== 0 &&
				(!!path.match(config[name].pathMatcher) || stats.isDirectory())
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
