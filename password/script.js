const passwordInput = document.querySelector('.input')

function transformScoreToColor(number) {
	switch (number) {
		case 0:
			return 'rgba(255, 0, 0, 0.7)'
		case 1:
			return 'rgba(255, 150, 0, 0.7)'
		case 2:
			return 'rgba(255, 255, 0, 0.7)'
		case 3:
			return 'rgba(150, 255, 0, 0.7)'
		case 4:
			return 'rgba(0, 255, 0, 0.7)'
	}
}

function showPasswordStrengthInColor(event) {
	const target = event.target
	const score = zxcvbn(target.value).score
	target.style['background-color'] = transformScoreToColor(score)
}

passwordInput.addEventListener('input', showPasswordStrengthInColor)
