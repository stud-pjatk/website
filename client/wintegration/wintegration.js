const wintegrationAutorun = () => {
	const form = document.getElementById('register');

	document.getElementById('wintegration-register').addEventListener('click', () => {
		form.scrollIntoView();
	});

	form.addEventListener('submit', e => {
		e.preventDefault();
		const values = [...form.querySelectorAll('input, select')].map(i => i.value);
		values.push(Date.now());
		fetch('/wintegration/register', {
			method: 'POST',
			body: JSON.stringify(values),
		}).then(() => {
			document.getElementById('wintegration-register-submit').setAttribute('disabled', true);
			document.getElementById('wintegration-register-success').style = '';
		}).catch(() => {});
		return false;
	});
};