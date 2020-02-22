import './contacts.scss'

export default class ContactsPage {
	constructor (args = {}) {
		this.contactsPageElement = document.querySelector('[data-contacts-page]')
		this.mainContainerElement = document.querySelector('[data-main-wrapper]')
	}

	showContactsPage () {
		// console.log('open')
		this.open = true
		// const mainContainerElement = document.querySelector('[data-main-wrapper]')
		// записываем, что мы на странице контактов
		this.mainContainerElement.setAttribute('data-main-wrapper', 'contacts')
		// задаём для контейнера контактов overflow:hidden
		this.mainContainerElement.classList.add('wrapper--overflow')
		// console.log('contacts--show')
		setTimeout(() => {
			// показываем элементы страницы контактов
			this.contactsPageElement.classList.add('contacts--show')
			setTimeout(() => {
				// снимаем overflow:hidden после появления элементов страницы
				this.mainContainerElement.classList.remove('wrapper--overflow')

			}, 800)
		},1100)
	}

	get openStatus() {
		return this.open
	}

	leaveContactsPage () {
		this.contactsPageElement.classList.add('contacts--hide-animation')
		setTimeout(() => {
			this.mainContainerElement.classList.remove('wrapper--contacts')
			this.contactsPageElement.classList.remove('contacts--hide-animation')
			this.contactsPageElement.classList.remove('contacts--show')
		},1100)
	}
}