let english;

const updateLanguage = () => {
	const lang = english ? 'en' : 'pl';
	const flags = document.getElementById('lang-switcher').children;
	flags[0].style = english ? 'display:none' : '';
	flags[1].style = english ? '' : 'display:none';
	document.documentElement.setAttribute('lang', lang);
	const elems = document.querySelectorAll(`[${lang}]`);
	for (const e of elems) {
		const old = e.getAttribute(lang);
		e.setAttribute(english ? 'pl' : 'en', e.innerText);
		e.innerText = old;
	}
};

const languageAutorun = () => {
	english = localStorage.getItem('english') === 'true';
	updateLanguage();
	document.getElementById('lang-switcher').addEventListener('click', () => {
		english = !english;
		localStorage.setItem('english', english);
		updateLanguage();
	})
};