import './menu.scss'
import MenuIcon from '../menuIcon/menuIcon'
import AboutPage from '../about/about'
import ContactsPage from '../contacts/contacts'
import PortfolioPage from '../portfolio/portfolio'
import Sertificat from '../sertificat/sertificat'
// import showAboutPage from '../about/about'

export default class Menu {
	constructor (args = {}) {
		this.contactsPage = new ContactsPage()
		this.aboutPage = new AboutPage()
		this.portfolioPage = new PortfolioPage()
		this.menuIcon = new MenuIcon()
		this.sertificat = new Sertificat()
	}

	// обработчик нажатия на элемент меню
	menuElementListener (startDataSelector, finishDataSelector) {
		const menuListElement = document.querySelector(`[${startDataSelector}]`)
		const headerTextElement = document.querySelector(`[${finishDataSelector}]`)
		const mainContainerElement = document.querySelector('[data-main-container]')
		const centerTextElement = document.querySelector('[data-center-text]')
	
		
		// слушаем нажатие на элемент списка меню
		menuListElement.addEventListener('click', (event) => {
			// смотрим откуда уходим
			const leavePage = mainContainerElement.getAttribute('data-main-container')
			// console.log('leavePage', leavePage)
			// смотрим куда переходим
			const purposePage = menuListElement.getAttribute('data-menu-target')
			// если никуда не уходим - просто закрываем меню
			if (leavePage === purposePage) {
				// this.animateMenuIcon()
				this.menuIcon.animateMenuIcon()
				return
			}
			// если уходим с главной страницы
			if (leavePage === 'main') {
				// скpываем социальные иконки 
				mainContainerElement.classList.add('hide-icons')
				// скрываем центральный текст
				centerTextElement.classList.add('center-text--animation')
				// скрываем заголовок целевой страницы
				headerTextElement.classList.add('hidden')
			}
			// уходим со страницы about
			else if (leavePage === 'about') {
				this.aboutPage.leaveAboutPage()
			}
			// уходим со страницы контакты
			else if (leavePage === 'contacts') {
				this.contactsPage.leaveContactsPage()
			}
			// уходим со страницы портфолио
			else if (leavePage === 'portfolio') {
				this.portfolioPage.leavePortfolioPage()
			}
	
			// передвигаем текст из меню до метоположения на целевой странице
			this.moveMenuText(menuListElement, headerTextElement, mainContainerElement, purposePage)
	
	
			// показываем целевую страницу
			if (purposePage === 'about') {
				this.aboutPage.showAboutPage()
			} 
			else if (purposePage === 'contacts') {
				this.contactsPage.showContactsPage()
			} 
			else if (purposePage === 'portfolio') {
				this.portfolioPage.showPortfolioPage()
			}
	
		})
	}

	// передвигаем текст из меню до метоположения на целевой странице
	moveMenuText (menuListElement, headerTextElement, mainContainerElement, purposePage) {
		// получаем координаты целевого элемента
		const targetCoordinates = Menu.getCoords(headerTextElement)
		// координаты текущего элемента
		const leaveCoordinates = Menu.getCoords(menuListElement)
		// создаём дубликат элемента для его передвижения
		const movingTextElement = menuListElement.cloneNode(true)
		// скрываем текущий элемент
		menuListElement.classList.add('hidden')
		// даём клону position fixed и координаты
		movingTextElement.classList.add('menu-moving-text')
		movingTextElement.style.top = `${leaveCoordinates.top}px`
		movingTextElement.style.left = `${leaveCoordinates.left}px`

		document.body.append(movingTextElement)

		movingTextElement.classList.add('menu-moving-tagret')
		// передвигаем клон
		Menu.changeCoordinats (movingTextElement, leaveCoordinates, targetCoordinates)
		// закрываем меню
		// this.animateMenuIcon()
		MenuIcon.animateMenuIcon()
		MenuIcon.toggleMenu()

		// задержка чтобы успел уехать текст с главной
		setTimeout(() => {
			// удаляем клон элемента, который приехал на нужное место
			movingTextElement.parentNode.removeChild(movingTextElement)
			headerTextElement.classList.remove('hidden')
			menuListElement.classList.remove('hidden')

			// скрываем уехавший центральный текст
			mainContainerElement.classList.add('container--hide-centerText')
			mainContainerElement.classList.add(`container--${purposePage}`)
		}, 1100)
	}

	// перемещаем элемент
	static changeCoordinats (elem, leaveCoordinates, targetCoordinates) {
		// console.log(arguments)
		const leaveX = leaveCoordinates.top
		const leaveY = leaveCoordinates.left
		const targetX = targetCoordinates.top
		const targetY = targetCoordinates.left

		let startX
		let startY
		let finishX
		let finishY

		if (targetX < leaveX) {
			startX = leaveX
			finishX = targetX
		} else {
			startX = targetX
			finishX = leaveX
		}

		if (targetY < leaveY) {
			startY = leaveY
			finishY = targetY
		} else {
			startY = targetY
			finishY = leaveY
		}

		// шаг перерисовки элемента
		let stepX = 10
		let stepY = 10
		
		let currentX = startX
		let currentY = startY
		let timerId = setInterval(() => {
			
			let deltaX = (startX - finishX) / stepX
			let deltaY = (startY - finishY) / stepY

			currentX -= deltaX
			elem.style.top = `${currentX}px`

			currentY -= deltaY
			elem.style.left = `${currentY}px`
			
			// если элемент приближается к финишу - уменьшаем шаг для более точного позиционирования
			if (5 > (currentX - finishX)) {
				stepX = 2000
			}

			if (5 > (currentY - finishY)) {
				stepY = 200
			}

			if (currentX <= finishX) {
				
				clearInterval(timerId)
			}
		}, 10);

	}

	// находим координаты верхней левой точки элемента
	static getCoords(elem) {
		var box = elem.getBoundingClientRect();

		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
		};
	}
}