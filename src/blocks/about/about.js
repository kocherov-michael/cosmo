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
			this.showAboutElements()
			this.showPersonalElements()

			if (!this.navigationListenerIsOn) {
				this.aboutNavigationHandler()
			}

		}
	}

	// прослушка кнопок навигации внутри страницы
	aboutNavigationHandler() {
		console.log('navigation listener')
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
			// showEducationElements()
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
		const aboutPageElement = document.querySelector('[data-about-page]')
		aboutPageElement.classList.add('show--personal')
	}

	// скрыть элементы персонального блока
	hidePersonalElements() {
		const aboutPageElement = document.querySelector('[data-about-page]')
		aboutPageElement.classList.remove('show--personal')
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