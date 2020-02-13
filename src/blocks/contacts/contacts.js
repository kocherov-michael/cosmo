import './contacts.scss'

export default class ContactsPage {
	constructor (args = {}) {
		this.contactsPageElement = document.querySelector('[data-contacts-page]')
		this.mainContainerElement = document.querySelector('[data-main-container]')
	}

	showContactsPage () {
		// console.log('open')
		this.open = true
		// const mainContainerElement = document.querySelector('[data-main-container]')
		// записываем, что мы на странице контактов
		this.mainContainerElement.setAttribute('data-main-container', 'contacts')
		// задаём для контейнера контактов overflow:hidden
		this.mainContainerElement.classList.add('container--overflow')
		// console.log('contacts--show')
		setTimeout(() => {
			// показываем элементы страницы контактов
			this.contactsPageElement.classList.add('contacts--show')
			setTimeout(() => {
				// снимаем overflow:hidden после появления элементов страницы
				this.mainContainerElement.classList.remove('container--overflow')

			}, 800)
		},1100)
	}

	get openStatus() {
		return this.open
	}

	// get launchStatus() {
	// 	return this.launch
	// }

	leaveContactsPage () {
		this.contactsPageElement.classList.add('contacts--hide-animation')
		setTimeout(() => {
			this.mainContainerElement.classList.remove('container--contacts')
			this.contactsPageElement.classList.remove('contacts--hide-animation')
			this.contactsPageElement.classList.remove('contacts--show')
		},1100)
	}
}