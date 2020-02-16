import './menuIcon.scss'

export default class MenuIcon {

	constructor (args = {}) {
		this.menuIconElement = document.querySelector('[data-menu-icon]')
		this.listenMenuIcon()
	}

	// вешаем обработчик на иконку меню
	listenMenuIcon () {
		this.menuIconElement.addEventListener('click', this.animateMenuIcon.bind(this))
	}

	// анимация крестика во время hover при открытом меню
	animateMenuIconCross() {
		this.menuIconElement.classList.add('menu-icon--animation')
	}

	// анимация открытия и закрытия меню и иконки меню
	animateMenuIcon () {
		// const menuIconElement = document.querySelector('[data-menu-icon]')
		const menuElement = document.querySelector('[data-menu]')
	
		menuElement.classList.toggle('menu--show')
		this.menuIconElement.classList.toggle('menu-icon--cross')
	
		if (this.menuIconElement.classList.contains('menu-icon--cross')) {
	
			this.menuIconElement.addEventListener('mouseleave', this.animateMenuIconCross.bind(this))
		} else {
			this.menuIconElement.removeEventListener('mouseleave', this.animateMenuIconCross.bind(this))
			// убираем анимацию крестика по ховеру, когда меню закрыто
			this.menuIconElement.classList.remove('menu-icon--animation')
		}
	}
}