import { App } from 'uWebSockets.js'
import { argv } from 'process'

const is_dev = argv[2] == '--dev'
const app = App()

embed('server/static.js')

app.listen('0.0.0.0', 80, token => token ? console.log(`Listening on port 80...`) : {})