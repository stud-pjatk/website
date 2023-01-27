import { App } from 'uWebSockets.js';
import { argv } from 'process';
import { randomBytes } from 'crypto';
import { readdirSync, readFileSync } from 'fs';

const is_dev = argv[2] == '--dev';
const app = App();

embed('server/static.js');

app.post('/wintegration/register', res => {
	res.onAborted(() => {});
	let buffer;
	res.onData((ab, isLast) => {
		let chunk = Buffer.from(ab);
		if (isLast) {
			let data = buffer ? Buffer.concat([buffer, chunk]) : chunk;
			fs.writeFileSync(`wintegration/${randomBytes(20).toString('hex')}`, data);
			res.end('ok');
		} else {
			buffer = buffer ? Buffer.concat([buffer, chunk]) : Buffer.concat([chunk]);
		}
	});
});

app.get('/1447a325/0628/479f/a84f/89ca6010f350', res => {
	res.onAborted(() => {});
	res.writeHeader('Content-Type', 'text/html');
	res.end(`<table><tbody>${readdirSync('wintegration').map(f => `<tr><td>${JSON.parse(readFileSync(f).toString()).join('</td><td>')}</td></tr>`)}</tbody></table>`);
});

app.listen('0.0.0.0', 80, token => token ? console.log(`Listening on port 80...`) : {});