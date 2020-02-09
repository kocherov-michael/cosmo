import './menuIcon.scss'

animateMenuIcon()

// анимация иконки меню-гамбургер
function animateMenuIcon () {
	const menuIconElement = document.querySelector('[data-menu-icon]')
	const menuElement = document.querySelector('[data-menu]')

	menuIconElement.addEventListener('click', () => {
		
		menuElement.classList.toggle('menu--show')
		menuIconElement.classList.toggle('menu-icon--cross')

		if (menuIconElement.classList.contains('menu-icon--cross')) {

			menuIconElement.addEventListener('mouseleave', animateMenuIconCross)
		} else {
			menuIconElement.removeEventListener('mouseleave', animateMenuIconCross)
			// убираем анимацию крестика по ховеру, когда меню закрыто
			menuIconElement.classList.remove('menu-icon--animation')
		}
	})

	function animateMenuIconCross() {
		menuIconElement.classList.add('menu-icon--animation')
	}
}