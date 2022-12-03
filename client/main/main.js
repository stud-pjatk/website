embed('client/translate.js')
embed('client/nav/nav.js')
embed('client/landing/landing.js')
embed('client/wintegration/wintegration.js')
embed('client/contact/contact.js')

const autoruns = {
	'landing': { func: landingAutorun },
}

const triggerAutorun = name => {
	const autorun = autoruns[name]
	if (autorun && !autorun.triggered) {
		autorun.triggered = true
		autorun.func()
	}
}

const updatePage = path => {
	for (const page of document.getElementsByClassName('page')) {
		page.style = 'display:none'
		page.removeAttribute('visible')
	}

	for (const link of document.querySelectorAll('.nav-link, .learn-link')) {
		link.classList.remove('nav-link-active', 'learn-link-active')
	}

	let splitPath = path.split('/')
	let page
	if (splitPath[1].length == 0) {
		page = document.getElementById('landing')
		triggerAutorun('landing')
	} else if (splitPath[1] !== 'landing') {
		page = document.getElementById(splitPath[1])
		triggerAutorun(splitPath[1])
	}
	
	if (splitPath[1] === 'wintegration') {
		document.getElementById('wintegrat-banner').setAttribute('background', true)
	} else {
		document.getElementById('wintegrat-banner').removeAttribute('background')
	}

	if (!page) {
		page = document.getElementById('not-found')
	}

	if (path != '/') {
		document.querySelector(`.nav-link[href="/${splitPath[1]}"]`)?.classList.add('nav-link-active')
	}

	document.getElementById('nav-menu').style.display = 'none'

	page.style = ''
	document.body.scrollTo({ top: 0, behavior: 'smooth' })

	return path
}

const autorun = () => {
	window.onpopstate = () => {
		updatePage(location.pathname)
	}

	for (const link of document.querySelectorAll('.page-link')) {
		link.onclick = () => {
			history.pushState(null, '', updatePage(link.getAttribute('href')))
			return false
		}
	}

	updatePage(location.pathname)

	languageAutorun()
	navAutorun()
	wintegralAutorun()
	contactAutorun()
}

document.addEventListener("DOMContentLoaded", autorun)