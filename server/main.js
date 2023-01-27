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

app.get('/1447a325/0628/479f/a84f/89ca6010f350', res => {
	res.onAborted(() => {});
	res.writeHeader('Content-Type', 'text/html');
	res.end(`<head><style>table{border-collapse:collapse}th,td{border:1px solid #000;padding:5px}</style></head><body style="display:none"><table><thead><tr><th>name</th><th>age</th><th>email</th><th>phone</th><th>other phone</th><th>year</th><th>field</th><th>diet</th><th>meds</th><tr></thead><tbody>${fs.readdirSync('wintegration').map(f => `<tr><td>${JSON.parse(fs.readFileSync(path.join('wintegration', f)).toString()).join('</td><td>')}</td></tr>`).join('')}</tbody></table></body>`);
});

app.listen('0.0.0.0', 80, token => token ? console.log(`Listening on port 80...`) : {});