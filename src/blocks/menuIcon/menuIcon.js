import './menuIcon.scss'

export default class MenuIcon {

	constructor (args = {}) {
		this.menuIconElement = document.querySelector('[data-menu-icon]')
		this.listenMenuIcon()
	}

	// вешаем обработчик на иконку меню
	listenMenuIcon () {
		// this.menuIconElement.addEventListener('click', this.animateMenuIcon.bind(this))
		this.menuIconElement.addEventListener('click', () => {
			// console.log(this.menuIconElement)
			// const menuElement = document.querySelector('[data-menu]')
			const menuIconAttribute = this.menuIconElement.getAttribute('data-menu-icon') 
			// console.log(menuIconAttribute)
			if (menuIconAttribute === 'sertificate' ) {
				// console.log('1')
				// this.animateMenuIcon()
				MenuIcon.animateMenuIcon()
				// this.menuIconElement.setAttribute('data-menu-icon', '')
			} else {
				MenuIcon.toggleMenu()
				// this.animateMenuIcon()
				MenuIcon.animateMenuIcon()
			}
		})
	}

	// анимация крестика во время hover при открытом меню
	static animateMenuIconCross() {
		const menuIconElement = document.querySelector('[data-menu-icon]')
		// this.menuIconElement.classList.add('menu-icon--animation')
		menuIconElement.classList.add('menu-icon--animation')
	}

	// открыть / закрыть меню
	static toggleMenu () {
		const menuElement = document.querySelector('[data-menu]')
	
		menuElement.classList.toggle('menu--show')

	}

	// анимация открытия и закрытия меню и иконки меню
	static animateMenuIcon () {
		// console.log('ok')
		const menuIconElement = document.querySelector('[data-menu-icon]')
		menuIconElement.classList.toggle('menu-icon--cross')
	
		if (menuIconElement.classList.contains('menu-icon--cross')) {
	
			menuIconElement.addEventListener('mouseleave', MenuIcon.animateMenuIconCross)
		} else {
			menuIconElement.removeEventListener('mouseleave', MenuIcon.animateMenuIconCross)
			// убираем анимацию крестика по ховеру, когда меню закрыто
			menuIconElement.classList.remove('menu-icon--animation')
		}
	}

	contrastOn () {
		this.menuIconElement.classList.add('menu-icon--contrast')
	}

	contrastOff () {
		this.menuIconElement.classList.remove('menu-icon--contrast')
	}
}