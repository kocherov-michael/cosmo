import './about.scss'

// showAboutPage()

// function showAboutPage() {
// 	const aboutPageElement = document.querySelector('[data-about-page]')
// 	const mainContainerElement = document.querySelector('[data-main-container]')
// 	aboutPageElement.classList.toggle('about--show')
// 	mainContainerElement.classList.toggle('about-me')
// }

// export default showAboutPage

export default class AboutPage {
	constructor (args = {}) {
		console.log(args)
		if (args.page === 'personal') {
			this.targetPage = args.page
			this.aboutPageElement = document.querySelector('[data-about-page]')
			
			if (args.leavePage === 'menu') {
				// this.renderNavigationItems()
				this.openAboutPage ()
			}

			this.aboutNavigationListener()
			this.leavingPage()

		}
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

		setTimeout(() => {
			
			this.showAboutElements()
			// показываем целевые элементы
			this.aboutPageElement.classList.add(`about--show-${this.targetPage}`)
			this.leavePage = this.targetPage
		},1100)
	}

	// показать элементы страницы about
	showAboutElements() {
		// console.log('d')
		const aboutPageElement = document.querySelector('[data-about-page]')
		const mainContainerElement = document.querySelector('[data-main-container]')
		// скрываем центральный текст, показываем надпить "обо мне"
		mainContainerElement.classList.add('container--about')
		// показываем элементы страницы about (заголовок, навигацию)
		aboutPageElement.classList.add('about--show')
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
	navigationHandler () {
		const targetPage = event.currentTarget.getAttribute('data-about-target')
		if (this.targetPage === targetPage) return
			// console.log('this.leavePage', this.leavePage)
			console.log('1')
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
			// console.log(technologiesList[i])
			technologiesList[i].style.transition = `all .8s ease .${i}s`
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
	leavingPage () {
		const menuElementList = document.querySelectorAll('.menu__text')

		for( let i = 0; i < menuElementList.length; i++) {
			
			menuElementList[i].addEventListener('click', (event) => {
				console.log(event.currentTarget)
				const targetPageAttr = event.currentTarget.getAttribute('data-menu-target')
				this.removeTechnologiesItemsDelay ()

				if ( (targetPageAttr === 'about') && this.leavePage === 'personal') {
					return
				}

				const mainContainerElement = document.querySelector('[data-main-container]')

				this.aboutPageElement.classList.remove(`about--show-${this.leavePage}`)
				mainContainerElement.classList.add('container--overflow')
				setTimeout(() => {
					// удаляем текущие элементы
					this.aboutPageElement.classList.add(`about--hide-${this.leavePage}`)
					mainContainerElement.classList.remove('container--overflow')
				},400)
			})
		}
	}


}

