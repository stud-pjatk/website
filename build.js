import fs from 'fs'
import { argv } from 'process'
import babel from '@babel/core'
import sass from 'sass'
import { minify } from 'html-minifier'

const is_dev = argv[2] == '--dev'
const load = path => fs.readFileSync(path).toString()

async function embed(file) {
	for (let i = 0; i < file.length; ++i) {
		if (file.substr(i, 7) == 'embed(\'') {
			let filename = ''
			for (let ii = i + 7; ii < file.length; ++ii) {
				if (file.substr(ii, 2) == '\')') {
					break
				}
				filename += file[ii]
			}
			let embeded = await embed(load(filename))
			if (!is_dev && filename.endsWith('main.js')) {
				embeded = `(() => {${embeded}})()`
				embeded = babel.transformSync(embeded, { presets: ['@babel/preset-env'] }).code
			}
			if (filename.endsWith('main.scss')) {
				embeded = sass.compileString(embeded).css
				if (!is_dev) {
					embeded = await require('postcss')([require('autoprefixer')]).process(embeded).css
				}
			}

			file = file.substr(0, i) + embeded + file.substr(i + 10 + filename.length)
		}
	}
	return file
}

(async function () {
	if (!fs.existsSync('out')) { fs.mkdirSync('out') }

	// Build Client
	let client = await embed(load('client/main/main.htm'))
	if (!is_dev) {
		client = minify(client, { minifyCSS: true, minifyJS: true, removeComments: true, sortClassName: true, sortAttributes: true, collapseWhitespace: true })
	}
	fs.writeFileSync('out/client.htm', client)

	// Build Server
	fs.writeFileSync('out/server.js', await embed(load('server/main.js')))
})()