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
		
		if (args.page === 'personal') {
			this.aboutPageElement = document.querySelector('[data-about-page]')
			if (args.leavePage === 'menu') {
				// console.log('menu')
				this.addPersonalElements()
				setTimeout(() => {
					this.showAboutElements()
					this.showPersonalElements()
	
				}, 1100)
			}

			if (!this.navigationListenerIsOn) {
				this.aboutNavigationHandler()
			}

		}
	}

	// добавить элементы персонального блока
	addPersonalElements() {
		this.personalPageElement = this.aboutPageElement.querySelector('[data-personal-page]')
		this.currentPage = this.personalPageElement

		this.personalPageElement.classList.remove('hide')
	}

	// удалить элементы персонального блока
	removePersonalElements() {
		this.personalPageElement.classList.add('hide')
	}

	// прослушка кнопок навигации внутри страницы
	aboutNavigationHandler() {
		// console.log('navigation listener')
		const personLinkElement = document.querySelector('[data-about-link-person]')
		const educationLinkElement = document.querySelector('[data-about-link-education]')
		const technologiesLinkElement = document.querySelector('[data-about-link-technologies]')

		personLinkElement.addEventListener('click', () => {
			console.log('1')
			this.showPersonalElements()
		})
	
		educationLinkElement.addEventListener('click', () => {
			console.log('2')
			const educationPageElement = document.querySelector('[data-education-page]')
			this.hidePersonalElements()

			setTimeout(() => {
				this.currentPage.classList.add('hide')
				educationPageElement.classList.remove('hide')
				
				setTimeout(() => {
					this.showEducationElements()
				},100)
			},600)


			// this.removePersonalElements()
		})

		this.navigationListenerIsOn = true
	}

	// показать элементы страницы about
	showAboutElements() {
		const aboutPageElement = document.querySelector('[data-about-page]')
		const mainContainerElement = document.querySelector('[data-main-container]')
		// скрываем центральный текст, показываем надпить "обо мне"
		mainContainerElement.classList.add('about-me')
		
		

		aboutPageElement.classList.add('show')

	}

	// показать элементы персонального блока
	showPersonalElements() {
		this.aboutPageElement.classList.add('show--personal')
	}

	// скрыть элементы персонального блока
	hidePersonalElements() {
		// const aboutPageElement = document.querySelector('[data-about-page]')
		this.aboutPageElement.classList.remove('show--personal')
	}

	// показать элементы блока образования
	showEducationElements() {
		// const aboutPageElement = document.querySelector('[data-about-page]')
		this.aboutPageElement.classList.add('show--education')
	}

	// скрыть элементы блока образования
	hideEducationElements() {
		// const aboutPageElement = document.querySelector('[data-about-page]')
		this.aboutPageElement.classList.remove('show--education')
	}



}

// aboutNavigationHandler()

// function aboutNavigationHandler() {

// 	const personLinkElement = document.querySelector('[data-about-link-person]')
// 	const educationLinkElement = document.querySelector('[data-about-link-education]')
// 	const technologiesLinkElement = document.querySelector('[data-about-link-technologies]')

// 	educationLinkElement.addEventListener('click', () => {
// 		console.log('2')
// 		hidePersonalElements()
// 		// showEducationElements()
// 	})
// }

// function showPersonalElements() {
// 	const aboutPageElement = document.querySelector('[data-about-page]')
// 	aboutPageElement.classList.add('show')
// }

// function hidePersonalElements() {
// 	const aboutPageElement = document.querySelector('[data-about-page]')
// 	aboutPageElement.classList.remove('show')
// }