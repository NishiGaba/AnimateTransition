document.addEventListener('DOMContentLoaded', function (event) {
	var button = document.querySelector('.animate-slide'),
		closeButton = document.querySelector('.animation-container__close'),
		radios = document.getElementsByName('animation'),
		animationTypeSpan = document.querySelectorAll('[data-animation-type]'),
		select = document.getElementById('animation-select'),
		container = '.animation-container',
		popup = '[data-block="in"]',
		radioButtonValue;

	function animateBlocks(event) {
		var animation;
		if (getComputedStyle(document.getElementById('animation-list')).display !== 'none') {
			animation = document.querySelector('input[type=radio]:checked').getAttribute('id');
		} else {
			if (getComputedStyle(document.getElementById('animation-select')).display !== 'none') {
				animation = select.options[select.selectedIndex].value;
			}
		}
		document.querySelector(popup).setAttribute('data-type', 'popup');
		AnimateTransition({
			container: container,
			blockIn: popup,
			animation: animation,
			onTransitionStart: function (blockIn, blockOut, container, event) {
				button.setAttribute('disabled', 'disabled');
			},
			onTransitionEnd: function (blockIn, blockOut, container, event) {
			}
		});
	}

	button.addEventListener('click', animateBlocks);
	/**
	 * Closes popup
	 * @param {Event} event
	 */
	function closePopup(event) {
		var block = event.target.parentNode;
		button.removeAttribute('disabled');
		block.removeAttribute('data-type');
	}

	closeButton.addEventListener('click', closePopup);
	/**
	 * Changes animation type in code example on radio button click
	 * @param {Event} event
	 */
	function radioClick(event) {
		radioButtonValue = event.target.id;
		for (var index = 0; index < animationTypeSpan.length; index += 1) {
			animationTypeSpan[index].innerText = "'" + radioButtonValue + "'";
		}
	}

	for (var index = 0; index < radios.length; index += 1) {
		radios[index].addEventListener('click', radioClick);
	}
});