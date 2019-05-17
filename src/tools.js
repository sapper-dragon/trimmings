const { writeFile } = require('fs').promises
export const refresh = async() => {
	const rand = Math.random().toString().split('.')[1]
	await writeFile('src/routes/_refresh.svelte', `<trim-refresh style="display:none;">${rand}</trim-refresh>\n`, 'utf8')
}
