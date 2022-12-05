let slideIndex = 0

const changeSlide = index => {
	const slides = document.querySelectorAll('#wintegration-slides > img')
	// const dots = document.getElementsByClassName('demo')

	if (index > slides.length - 1) {
		slideIndex = 0
	} else if (index < 0) {
		slideIndex = slides.length - 1
	}

	for (let i = 0; i < slides.length; ++i) {
		slides[i].style.display = 'none'
	}
	// for (let i = 0; i < dots.length; ++i) {
	// 	dots[i].className = dots[i].className.replace(' w3-white', '')
	// }
	slides[slideIndex].style = ''
	// dots[slideIndex].className += ' w3-white'
}

const wintegrationAutorun = () => {
	// changeSlide(slideIndex = n)

	document.getElementById('wintegration-slides-left').addEventListener('click', () => {
		changeSlide(slideIndex -= 1)
	})
	document.getElementById('wintegration-slides-right').addEventListener('click', () => {
		changeSlide(slideIndex += 1)
	})
}