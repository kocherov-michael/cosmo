import './menuIcon.scss'

const menuIconElement = document.querySelector('[data-menu-icon]')
const menuElement = document.querySelector('[data-menu]')

menuIconElement.addEventListener('click', () => {
	// console.log('push')
	menuElement.classList.toggle('menu--show')
	menuIconElement.classList.toggle('menu-icon--cross')
})