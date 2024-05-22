document.getElementById('read-more').addEventListener('click', function () {
	var moreText = document.getElementById('more-text')
	if (moreText.style.display === 'none') {
		moreText.style.display = 'inline'
		this.innerText = 'читать меньше'
	} else {
		moreText.style.display = 'none'
		this.innerText = 'читать больше'
	}
})
