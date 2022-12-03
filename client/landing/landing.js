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

	const logoTriggers = document.querySelectorAll('#inter-logo > div')
	const logoParts = document.querySelectorAll('#inter-logo > svg > *')
	const desc = document.getElementById('inter-logo-desc')
	const descs = [
		'Całość zamknięta jest w prostokącie odwołującym się do tradycyjnej pieczęci japońskiej, która jest odpowiednikiem osobistego podpisu.',
		'Ideogram japoński oznaczający "grupę". Razem z ideogramem "moc" tworzy złożenie, które stanowi silne połączenie znaczeniowe, które mówi o mocy wynikającej ze współdziałania.',
		'Czerwone koło nawiązuje kolorem do flagi Polskiej, kształtem do flagi Japonii, oraz logotypu uczelni. We fladze japońskiej symbolizuje wschodzące słońce - przekładając to na nasz logotyp - rodzące się idee, energię nowego życia.',
		'Ideogram japoński oznaczający "moc". Razem z ideogramem "grupa" tworzy złożenie, które stanowi silne połączenie znaczeniowe, które mówi o mocy wynikającej ze współdziałania.',
	]
	window.addEventListener('mousemove', e => {
		desc.style.left = desc.style.right = '';
		if (e.clientX > window.outerWidth / 2) {
			desc.style.right = `${window.outerWidth - e.clientX - 10}px`
		} else {
			desc.style.left = `${e.clientX - 10}px`
		}
		desc.style.top = `${e.clientY - 10}px`
	})
	logoTriggers.forEach(t => {
		t.addEventListener('mouseover', () => {
			desc.style.visibility = 'visible'
			const index = t.getAttribute('index')
			desc.innerText = descs[index]
			logoParts.forEach(p => p.style.opacity = '0.4')
			logoParts[index].style = ''
		})
		t.addEventListener('mouseout', () => {
			desc.style.visibility = 'hidden'
			logoParts.forEach(p => p.style = '')
		})
	})
}