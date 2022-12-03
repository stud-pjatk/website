const contactAutorun = () => {
	document.getElementById('contact-submit').addEventListener('click', e => {
		e.preventDefault()
		const mail = document.createElement('a')
		mail.setAttribute('href', `mailto:smrz@pjwstk.edu.pl?subject=${document.getElementById('contact-subject').value}&body=${document.getElementById('contact-body').value}`)
		mail.click()
		return false
	})
}