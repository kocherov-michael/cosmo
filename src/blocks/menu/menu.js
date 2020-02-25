import './menu.scss'
import MenuIcon from '../menuIcon/menuIcon'
import AboutPage from '../about/about'
import ContactsPage from '../contacts/contacts'
import PortfolioPage from '../portfolio/portfolio'
import Sertificat from '../sertificat/sertificat'
import Logo from '../logo/logo'
import SertificatsSlider from '../sertificatsSlider/sertificatsSlider'

export default class Menu {
	constructor (args = {}) {
		this.contactsPage = new ContactsPage()
		this.aboutPage = new AboutPage()
		this.portfolioPage = new PortfolioPage()
		this.menuIcon = new MenuIcon()
		this.sertificat = new Sertificat()
		this.sertificatsSlider = new SertificatsSlider({selector: '.sertificats-slider'})
		this.logo = new Logo({
			aboutPage: this.aboutPage,
			portfolioPage: this.portfolioPage,
			contactsPage: this.contactsPage
		})
	}

	// обработчик нажатия на элемент меню
	menuElementListener (startDataSelector, finishDataSelector) {
		const menuListElement = document.querySelector(`[${startDataSelector}]`)
		const headerTextElement = document.querySelector(`[${finishDataSelector}]`)
		const mainContainerElement = document.querySelector('[data-main-wrapper]')
		this.centerTextElement = document.querySelector('[data-center-text]')
	
		
		// слушаем нажатие на элемент списка меню
		menuListElement.addEventListener('click', (event) => {
			// смотрим откуда уходим
			const leavePage = mainContainerElement.getAttribute('data-main-wrapper')
			// console.log('leavePage', leavePage)
			// смотрим куда переходим
			const purposePage = menuListElement.getAttribute('data-menu-target')
			// если никуда не уходим - просто закрываем меню
			if (leavePage === purposePage) {
				// this.animateMenuIcon()
				// this.menuIcon.animateMenuIcon()
				MenuIcon.toggleMenu()
				MenuIcon.animateMenuIcon()
				return
			}
			// если уходим с главной страницы
			if (leavePage === 'main') {
				// скpываем социальные иконки 
				mainContainerElement.classList.add('hide-icons')
				// скрываем центральный текст
				this.centerTextElement.classList.add('center-text--animation')
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
				this.aboutPage.openAboutPage()
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
		console.log(movingTextElement)
		// скрываем текущий элемент
		menuListElement.classList.add('hidden')
		// даём клону position fixed и координаты
		movingTextElement.classList.add('menu-moving-text')
		movingTextElement.style.top = `${leaveCoordinates.top}px`
		movingTextElement.style.left = `${leaveCoordinates.left}px`

		// movingTextElement.classList.add('menu-moving-tagret')
		document.body.append(movingTextElement)

		// передвигаем клон
		setTimeout(() => {
			movingTextElement.style.top = `${targetCoordinates.top}px`
			movingTextElement.style.left = `${targetCoordinates.left}px`
		},10)

		// закрываем меню
		MenuIcon.animateMenuIcon()
		MenuIcon.toggleMenu()

		// задержка чтобы успел уехать текст с главной
		setTimeout(() => {
			// удаляем клон элемента, который приехал на нужное место
			movingTextElement.parentNode.removeChild(movingTextElement)
			headerTextElement.classList.remove('hidden')
			menuListElement.classList.remove('hidden')
			
			// удаляем у цетнрального текста класс для скрывания этого элемента
			this.centerTextElement.classList.remove('center-text--animation')

			// скрываем уехавший центральный текст
			mainContainerElement.classList.add('wrapper--hide-centerText')
			mainContainerElement.classList.add(`wrapper--${purposePage}`)
		}, 1100)
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