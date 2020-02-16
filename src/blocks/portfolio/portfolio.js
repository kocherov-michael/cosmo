import './portfolio.scss'

export default class PortfolioPage {
	constructor (args = {}) {
		this.portfolioPageElement = document.querySelector('[data-portfolio-page]')
		this.mainContainerElement = document.querySelector('[data-main-container]')
		this.filterItems()
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

	filterItems () {
		const filterButtonsList = document.querySelectorAll('[data-portfolio-filter]')
		// const filterWrapperElement = document.querySelector('[data-filter-wrapper]')
		
		for ( let i = 0; i < filterButtonsList.length; i++ ) {
			filterButtonsList[i].addEventListener('click', (event) => {
				const attribute = event.currentTarget.getAttribute('data-portfolio-filter')

				const filterElementsList = document.querySelectorAll('[data-portfolio-filter]')
				
				console.log(attribute)
			})
		}
	}
}