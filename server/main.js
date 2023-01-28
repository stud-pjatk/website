import { App, SSLApp } from 'uWebSockets.js';
import { argv } from 'process';
import { randomBytes } from 'crypto';

const is_dev = argv[2] == '--dev';
const app = (() => {
	if (is_dev) {
		return App();
	} else {
		new App().any('/**', (res, req) => {
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
			try {
				const json = JSON.parse(data);
				if (Array.isArray(json) == false || json.length != 10) { throw ''; }
				json.push(Date.now());
				json.push(Buffer.from(res.getRemoteAddressAsText()).toString());
				fs.writeFileSync(`wintegration/${randomBytes(20).toString('hex')}`, data);
				res.end('ok');
			} catch {
				res.writeStatus('400'); res.end();
			}
		} else {
			buffer = buffer ? Buffer.concat([buffer, chunk]) : Buffer.concat([chunk]);
		}
	});
});

app.get('/table', (res, req) => {
	res.onAborted(() => {});
	if (req.getQuery() == fs.readFileSync('secret').toString()) {
		res.writeHeader('Content-Type', 'text/html');
		const rows = fs.readdirSync('wintegration').map(f => `<tr><td>${JSON.parse(fs.readFileSync(path.join('wintegration', f)).toString()).join('</td><td>')}</td></tr>`).join('');
		res.end(`<head><meta charset="utf-8"><style>table{border-collapse:collapse}th,td{border:1px solid #000;padding:5px}</style></head><body><table><thead><tr><th>name</th><th>age</th><th>email</th><th>phone</th><th>other phone</th><th>year</th><th>field</th><th>diet</th><th>meds</th><tr></thead><tbody>${rows}</tbody></table></body>`);
	} else {
		res.writeStatus('401'); res.end();
	}
});

const PORT = is_dev ? 80 : 443;
app.listen('0.0.0.0', PORT, token => token ? console.log(`Listening on port ${PORT}...`) : {});