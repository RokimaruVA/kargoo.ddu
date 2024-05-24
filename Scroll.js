function smoothScroll(target, duration) {
	var targetElement = document.querySelector(target)
	var targetPosition = targetElement.getBoundingClientRect().top
	var startPosition = window.pageYOffset
	var startTime = null

	function animation(currentTime) {
		if (startTime === null) startTime = currentTime
		var timeElapsed = currentTime - startTime
		var run = ease(timeElapsed, startPosition, targetPosition, duration)
		window.scrollTo(0, run)
		if (timeElapsed < duration) requestAnimationFrame(animation)
	}

	function ease(t, b, c, d) {
		t /= d / 2
		if (t < 1) return (c / 2) * t * t + b
		t--
		return (-c / 2) * (t * (t - 2) - 1) + b
	}

	requestAnimationFrame(animation)
}

// Добавляем обработчик события для кнопки
document.querySelector('.scroll-button').addEventListener('click', function () {
	smoothScroll('#target-section', 1000)
})
