import fs from 'fs'

const load = path => fs.readFileSync(path)
const get = (name, type, data) => {
	app.get(`/${name}`, res => {
		res.onAborted(() => { })
		res.writeHeader('Content-Type', type)
		res.end(data)
	})
}

get('favicon.ico', 'image/x-icon', load('res/ico/favicon.ico'))
for (const size of [36, 48, 72, 96, 144, 192, 512]) {
	get(`icon${size}.png`, 'image/png', load(`res/ico/icon${size}.png`))
	get(`mask${size}.png`, 'image/png', load(`res/ico/mask${size}.png`))
}
for (let i = 0; i < 6; ++i) {
	get(`slide${i}.jpg`, 'image/jpeg', load(`res/slides/slide${i}.jpg`))
}
for (let i = 0; i < 3; ++i) {
	get(`news${i}.jpg`, 'image/jpeg', load(`res/news/news${i}.jpg`))
}
get('ocra.otf', 'application/x-font-opentype', load('res/ocra.otf'))

get('site.webmanifest', 'application/manifest+json', load('res/site.webmanifest'))
get('robots.txt', 'text/plain', load('res/robots.txt'))

get('**', 'text/html', load('out/client.htm'))