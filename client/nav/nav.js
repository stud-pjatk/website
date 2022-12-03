const navAutorun = () => {
	const navMenu = document.getElementById('nav-menu')
	let navMenuOpen = false
	document.getElementById('nav-menu-button').addEventListener('click', () => {
		if (navMenuOpen) {
			navMenu.style.display = 'none'
		} else {
			navMenu.style = ''
		}
		navMenuOpen = !navMenuOpen
	})
}