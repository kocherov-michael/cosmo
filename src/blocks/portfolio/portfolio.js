import './portfolio.scss'

export default class PortfolioPage {
	constructor (args = {}) {
		this.portfolioPageElement = document.querySelector('[data-portfolio-page]')
		this.mainContainerElement = document.querySelector('[data-main-container]')
	}

	showPortfolioPage () {
		// console.log('open')
		this.open = true
		// const mainContainerElement = document.querySelector('[data-main-container]')
		// записываем, что мы на странице контактов
		this.mainContainerElement.setAttribute('data-main-container', 'portfolio')
		// задаём для контейнера контактов overflow:hidden
		this.mainContainerElement.classList.add('container--overflow')
		// console.log('contacts--show')
		setTimeout(() => {
			// показываем элементы страницы контактов
			this.portfolioPageElement.classList.add('portfolio--show')
			setTimeout(() => {
				// снимаем overflow:hidden после появления элементов страницы
				this.mainContainerElement.classList.remove('container--overflow')

			}, 800)
		},1100)
	}

	get openStatus() {
		return this.open
	}

	leavePortfolioPage () {
		this.portfolioPageElement.classList.add('portfolio--hide-animation')
		setTimeout(() => {
			this.mainContainerElement.classList.remove('container--portfolio')
			this.portfolioPageElement.classList.remove('portfolio--hide-animation')
			this.portfolioPageElement.classList.remove('portfolio--show')
		},1100)
	}
}