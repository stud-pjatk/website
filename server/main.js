import { App } from 'uWebSockets.js';
import { argv } from 'process';
import { randomBytes } from 'crypto';

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

app.listen('0.0.0.0', 80, token => token ? console.log(`Listening on port 80...`) : {});