import './menuIcon.scss'

listenMenuIcon()

// анимация иконки меню-гамбургер
function listenMenuIcon () {
	const menuIconElement = document.querySelector('[data-menu-icon]')

	menuIconElement.addEventListener('click', animateMenuIcon)
}

function animateMenuIconCross() {
	const menuIconElement = document.querySelector('[data-menu-icon]')
	menuIconElement.classList.add('menu-icon--animation')
}

function animateMenuIcon () {
	console.log('animateMenuIcon start')
	const menuIconElement = document.querySelector('[data-menu-icon]')
	const menuElement = document.querySelector('[data-menu]')

	menuElement.classList.toggle('menu--show')
	menuIconElement.classList.toggle('menu-icon--cross')

	if (menuIconElement.classList.contains('menu-icon--cross')) {

		menuIconElement.addEventListener('mouseleave', animateMenuIconCross)
	} else {
		menuIconElement.removeEventListener('mouseleave', animateMenuIconCross)
		// убираем анимацию крестика по ховеру, когда меню закрыто
		menuIconElement.classList.remove('menu-icon--animation')
	}
	console.log('animateMenuIcon finish')
}

export default animateMenuIcon