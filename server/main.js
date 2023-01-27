import { App, SSLApp } from 'uWebSockets.js';
import { argv } from 'process';
import { randomBytes } from 'crypto';

const is_dev = argv[2] == '--dev';
const app = (() => {
	if (is_dev) {
		return App();
	} else {
		new App().any('/*', (res, req) => {
			res.writeStatus('301');
			res.writeHeader('Location', 'https://samorzad.pja.edu.pl' + req.getUrl());
			res.end();
		}).listen('0.0.0.0', 80, () => {});

		return SSLApp({
			cert_file_name: 'fullchain.pem',
			key_file_name: 'privkey.pem',
		});
	}
})();

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
	res.end(`<head><meta charset="utf-8"><style>table{border-collapse:collapse}th,td{border:1px solid #000;padding:5px}</style></head><body style="display:none"><table><thead><tr><th>name</th><th>age</th><th>email</th><th>phone</th><th>other phone</th><th>year</th><th>field</th><th>diet</th><th>meds</th><tr></thead><tbody>${fs.readdirSync('wintegration').map(f => `<tr><td>${JSON.parse(fs.readFileSync(path.join('wintegration', f)).toString()).join('</td><td>')}</td></tr>`).join('')}</tbody></table></body>`);
});

const PORT = is_dev ? 80 : 443;
app.listen('0.0.0.0', PORT, token => token ? console.log(`Listening on port ${PORT}...`) : {});