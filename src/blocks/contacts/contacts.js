import './contacts.scss'

export default class ContactsPage {
	constructor (args = {}) {
		this.contactsPageElement = document.querySelector('[data-contacts-page]')
		// this.showContactsPage()
		// this.launch = true
		// this.open = false
		// console.log('this.open', this.open)
	}

	showContactsPage () {
		// console.log('open')
		this.open = true
		const mainContainerElement = document.querySelector('[data-main-container]')
		// записываем, что мы на странице контактов
		mainContainerElement.setAttribute('data-main-container', 'contacts')
		// задаём для контейнера контактов overflow:hidden
		mainContainerElement.classList.add('container--overflow')
		// console.log('contacts--show')
		setTimeout(() => {
			// показываем элементы страницы контактов
			this.contactsPageElement.classList.add('contacts--show')
			setTimeout(() => {
				// снимаем overflow:hidden после появления элементов страницы
				mainContainerElement.classList.remove('container--overflow')

			}, 800)
		},1100)
	}

	get openStatus() {
		return this.open
	}

	get launchStatus() {
		return this.launch
	}

	static hideContactsPage () {
		const contactsPageElement = document.querySelector('[data-contacts-page]')
		const mainContainerElement = document.querySelector('[data-main-container]')
		contactsPageElement.classList.add('contacts--hide-animation')
		setTimeout(() => {
			contactsPageElement.classList.remove('contacts--hide-animation')
			mainContainerElement.classList.remove('container--contacts')
		},1100)
	}
}