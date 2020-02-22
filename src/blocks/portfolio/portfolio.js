import './portfolio.scss'
import Filter from '../dropdown/dropdown'

export default class PortfolioPage {
	constructor (args = {}) {
		this.portfolioPageElement = document.querySelector('[data-portfolio-page]')
		this.mainContainerElement = document.querySelector('[data-main-container]')
		this.filter = new Filter()
		// this.filterItems()
	}

	showPortfolioPage () {
		// this.open = true
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

	// get openStatus() {
	// 	return this.open
	// }

	leavePortfolioPage () {
		this.portfolioPageElement.classList.add('portfolio--hide-animation')
		setTimeout(() => {
			this.mainContainerElement.classList.remove('container--portfolio')
			this.portfolioPageElement.classList.remove('portfolio--hide-animation')
			this.portfolioPageElement.classList.remove('portfolio--show')
		},1100)
	}

	// фильтруем элементы по выбираемому свойству
	// filterItems () {
	// 	// кнопки переключения
	// 	const filterButtonsList = document.querySelectorAll('[data-portfolio-filter]')
	// 	// const filterWrapperElement = document.querySelector('[data-filter-wrapper]')
	// 	// фильтруемые элементы
	// 	const filterElementsList = document.querySelectorAll('[data-filter-item]')
		
	// 	for ( let i = 0; i < filterButtonsList.length; i++ ) {
	// 		filterButtonsList[i].addEventListener('click', (event) => {
	// 			// атрибут, по которому фильтруем
	// 			const attribute = event.currentTarget.getAttribute('data-portfolio-filter')

	// 			// сначала убираем все элементы
	// 			for ( let j = 0; j < filterElementsList.length; j++ ) {
	// 				filterElementsList[j].classList.add('disappear')
	// 			}
	// 			// ждём пока исчезнут
	// 			setTimeout(() => {
	// 				for ( let j = 0; j < filterElementsList.length; j++ ) {
	// 					// если элемент содердит класс, указанный в атрибуте
	// 					if (filterElementsList[j].classList.contains(attribute)) {
							
	// 						// убираем display: none;
	// 						filterElementsList[j].classList.remove('hide')
	// 						setTimeout(() => {
	// 							// анимация появления
	// 							filterElementsList[j].classList.remove('disappear')
	// 						}, 100)
	// 					} else {
	// 						// если элемент не имеет нужный класс, добавляем display: none;
	// 						filterElementsList[j].classList.add('hide')
	// 					}
	// 				}
	// 			}, 400)
	// 		})
	// 	}
	// }
}