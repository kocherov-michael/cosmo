import './menuIcon.scss'

const menuIconElement = document.querySelector('[data-menu-icon]')
const menuElement = document.querySelector('[data-menu]')

menuIconElement.addEventListener('click', () => {
	// console.log('push')
	
	menuElement.classList.toggle('menu--show')
	menuIconElement.classList.toggle('menu-icon--cross')
	if (menuIconElement.classList.contains('menu-icon--cross')) {

		menuIconElement.addEventListener('mouseleave', animateMenuIcon)
	} else {
		menuIconElement.removeEventListener('mouseleave', animateMenuIcon)
		menuIconElement.classList.remove('menu-icon--animation')
	}
	// setTimeout(() => {
	// 	// console.log()
	// 	menuIconElement.classList.toggle('menu-icon--animation')
	//  },2000)
})

function animateMenuIcon() {
	menuIconElement.classList.add('menu-icon--animation')
}