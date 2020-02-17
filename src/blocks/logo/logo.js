import './logo.scss'

export default class Logo {
	constructor (args = {}) {
		this.aboutPage = args.aboutPage
		this.portfolioPage = args.portfolioPage
		this.contactsPage = args.contactsPage
		this.logoElement = document.querySelector('[data-logo]')
		this.mainContainerElement = document.querySelector('[data-main-container]')
		this.logoListener()
	}

	// прослушиваем нажатие на логотип
	logoListener () {
		this.logoElement.addEventListener('click', () => {
			// получаем страницу, с которой уходим
			const leavePage = this.mainContainerElement.getAttribute('data-main-container')

			this.mainContainerElement.setAttribute('data-main-container', 'main')

			// уходим со страницы about
			if (leavePage === 'about') {
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

			// элемент центрального текста
			const centerTextElement = document.querySelector('[data-center-text]')
			// помещаем центральный текст в позицию старта для появления
			centerTextElement.classList.add('center-text--before-show')

			// ждём пока уедет предыдущий блок
			setTimeout(() => {
				// отображаем иконки и центральный текст
				this.mainContainerElement.classList.remove('hide-icons', 'container--hide-centerText')
				setTimeout(() => {
					// центральный текст появляется с анимацией
					centerTextElement.classList.remove('center-text--before-show')
				}, 100)
			}, 600)
		})
	}
}
