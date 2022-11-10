const landingAutorun = () => {
	const slides = document.querySelectorAll('#land-slides > img')
	const sdur = 10000
	const dur = sdur * slides.length
	const anim = 1000
	const start = Date.now() - anim
	setInterval(() => {
		for (let i = 0; i < slides.length; ++i) {
			const slide = slides[i]
			const time = Date.now() - start
			const moment = (time - i * sdur + dur) % dur
			slide.style.zIndex = slides.length - Math.floor(moment / sdur)
			if (moment < sdur) {
				slide.style.opacity = Math.min(moment / anim, 1)
			}
		}
	}, 0)
}