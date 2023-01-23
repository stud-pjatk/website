const wintegrationAutorun = () => {
	const form = document.getElementById('register');

	document.getElementById('wintegration-register').addEventListener('click', () => {
		form.scrollIntoView();
	});

	form.addEventListener('submit', () => {
		fetch('/wintegration/register', {
			method: 'POST',
			body: JSON.stringify([...form.querySelectorAll('input, select')].map(i => i.value)),
		}).then(() => {
			document.getElementById('wintegration-register-submit').setAttribute('disabled', true);
			document.getElementById('wintegration-register-success').style = '';
		}).catch(() => {});
		return false;
	});
};