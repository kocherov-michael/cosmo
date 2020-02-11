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
				console.log('menu')
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

	addPersonalElements() {
		const personalPageElement = this.aboutPageElement.querySelector('[data-personal-page]')

		personalPageElement.classList.remove('hide')
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
			this.hidePersonalElements()
			this.showEducationElements()
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
		// const aboutInfoElement = this.aboutPageElement.querySelector('[data-about-info]')
		// const aboutButtonElement = this.aboutPageElement.querySelector('[data-about-button]')

		// aboutInfoElement.classList.remove('hide')
		// aboutButtonElement.classList.remove('hide')
		this.aboutPageElement.classList.add('show--personal')
		// console.log(this.aboutPageElement)

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