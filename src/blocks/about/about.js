import './about.scss'

export default class AboutPage {
	constructor (args = {}) {
		this.aboutPageElement = document.querySelector('[data-about-page]')
		this.mainContainerElement = document.querySelector('[data-main-container]')
	}

	showAboutPage () {
		this.targetPage = 'personal'
		
		this.openAboutPage ()

		this.aboutNavigationListener()
	}

	// создаём элементы навигации каждый раз при переходе на страницу
	renderNavigationItems () {
		const navigationElement = this.aboutPageElement.querySelector('.about__list')
		navigationElement.innerHTML = 
		`<div class="about__list-item" data-about-target="personal">01</div>
		<div class="about__list-item about__list-item--delay-1" data-about-target="education">02</div>
		<div class="about__list-item about__list-item--delay-2" data-about-target="technologies">03</div>`
	}

	// переход на страницу about из меню
	openAboutPage () {
		this.renderNavigationItems()
		this.targetPage = 'personal'
		this.aboutPageElement.classList.remove(`about--hide-${this.targetPage}`)

		// const mainContainerElement = document.querySelector('[data-main-container]')
		// записываем, что мы на странице about
		this.mainContainerElement.setAttribute('data-main-container', 'about')

		// задаём интервал, за время которого текст с главной уезжает
		setTimeout(() => {
			this.showAboutElements()
			// показываем целевые элементы
			this.aboutPageElement.classList.add(`about--show-${this.targetPage}`)
			this.leavePage = this.targetPage
		},1100)
	}

	// показать элементы страницы about
	showAboutElements() {
		// скрываем центральный текст, показываем надпить "обо мне"
		this.mainContainerElement.classList.add('container--about')
		// показываем элементы страницы about (заголовок, навигацию)
		this.aboutPageElement.classList.add('about--show')
	}

	// переходы внутри блока about
	renderAboutPageBlocks() {
		// скрываем текущие элементы
		this.aboutPageElement.classList.remove(`about--show-${this.leavePage}`)

		setTimeout(() => {
			// удаляем текущие элементы
			this.aboutPageElement.classList.add(`about--hide-${this.leavePage}`)
			// вставляем целевые элементы
			this.aboutPageElement.classList.remove(`about--hide-${this.targetPage}`)
			
			setTimeout(() => {
				// показываем целевые элементы
				this.aboutPageElement.classList.add(`about--show-${this.targetPage}`)
				this.leavePage = this.targetPage
			},100)
		},600)
	}


	// прослушка кнопок навигации внутри страницы
	aboutNavigationListener() {

		this.aboutLinkList = this.aboutPageElement.querySelectorAll('[data-about-target]')
		for (let i = 0; i < this.aboutLinkList.length; i++ ) {
			this.aboutLinkList[i].addEventListener('click', this.navigationHandler.bind(this))
		}
	}

	// обработчик нажатия на элементы навигации
	navigationHandler (event) {
		const targetPage = event.currentTarget.getAttribute('data-about-target')
		if (this.targetPage === targetPage) return
			this.targetPage = targetPage
			// если уходим из технологий, то убираем все элементы одновременно
			if (this.targetPage === 'technologies') {
				this.openTechnologyItemsWithDelay()
			}
			if (this.leavePage === 'technologies') {
				this.removeTechnologiesItemsDelay()
			}
			this.renderAboutPageBlocks()
	}



	// по очереди с задержкой открываем элементы технологии
	openTechnologyItemsWithDelay () {
		const technologiesList = this.aboutPageElement.querySelectorAll('.technologies__item')
		for (let i = 0; i < technologiesList.length; i++) {
			// каждая технология открывается с задержкой 0.1 сек от предыдущей
			technologiesList[i].style.transition = `all .8s ease ${(i+2)/10}s`
		}
	}

	// удаляем задержку при убирании элементов тенологий
	removeTechnologiesItemsDelay () {
		const technologiesList = this.aboutPageElement.querySelectorAll('.technologies__item')
		for (let i = 0; i < technologiesList.length; i++) {
			if (technologiesList[i].style.transition) {
				// console.log('remove')
				technologiesList[i].style.transition = ``
			}
		}
	}

	// выполняем при уходе со страницы
	leaveAboutPage () {
		// добавляем анимацию исчезновения
		this.aboutPageElement.classList.add('about--hide-animation')
		setTimeout(() => {
			// скрываем все элементы, которые отображались на странице about
			this.mainContainerElement.classList.remove('container--about')
			this.aboutPageElement.classList.remove('about--hide-animation')
			this.aboutPageElement.classList.remove(`about--show-${this.leavePage}`)
			this.aboutPageElement.classList.add(`about--hide-${this.leavePage}`)
			this.aboutPageElement.classList.remove('about--show')
		},1100)
	}


}

