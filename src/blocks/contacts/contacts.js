import './contacts.scss'

export default class ContactsPage {
	constructor (args = {}) {
		this.contactsPageElement = document.querySelector('[data-contacts-page]')
		this.successPageElement = document.querySelector('[data-success-page]')
		this.mainContainerElement = document.querySelector('[data-main-wrapper]')
		this.formHandler()
		this.successButtonHandler()
	}

	showContactsPage (args = {}) {
		// получаем класс лого чтобы была возможность перейти на главную
		this.logo = args.logo
		// console.log('open')
		this.open = true
		// const mainContainerElement = document.querySelector('[data-main-wrapper]')
		// записываем, что мы на странице контактов
		this.mainContainerElement.setAttribute('data-main-wrapper', 'contacts')
		// задаём для контейнера контактов overflow:hidden
		// this.mainContainerElement.classList.add('wrapper--overflow')
		// console.log('contacts--show')
		setTimeout(() => {
			// показываем элементы страницы контактов
			this.contactsPageElement.classList.add('contacts--show')
			setTimeout(() => {
				// снимаем overflow:hidden после появления элементов страницы
				// this.mainContainerElement.classList.remove('wrapper--overflow')

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

	formHandler () {
		const submitButtonElement = document.querySelector('[data-submit]')
		
		submitButtonElement.addEventListener('click', (event) => {
			event.preventDefault()
			// проверяем поля на заполненность
			const result = this.validateFields()
			
			if (result) {
				// если заполнены, то отправляем сообщение на почту
				// console.log(result)	
				// this.sendMail(result)	
				this.leaveContactsPage()	
				this.showSuccessPage()
			}
		})
	}

	// проверка полей на заполненность
	validateFields () {
		// количество заполненных полей
		let trueCount = 0
		const resultObj = {}
		const nameElement = document.querySelectorAll('[data-input]')
		nameElement.forEach((element) => {
			// если инпут пустой, то сообщаем
			if (element.value.trim() === '') {
				// родительский элемент label
				const labelElement = element.closest('label')
				// добавляем класс уведомления
				labelElement.classList.add('input-empty')
				// если начинаем вводить символы, то убираем уведомление
				element.addEventListener('input', () => {
					labelElement.classList.remove('input-empty')
				})
			}
			else {
				trueCount++
				resultObj[element.name] = element.value
			}
		})
		// если количество заполненных полей равно количеству полей
		// то возвращаем объект с полями и значениями
		if (trueCount === nameElement.length) {
			return resultObj
		} else {
			return false
		}
	}

	sendMail (values) {
		// name, email, message
		;(async () => {
			let response = await fetch('assets/php/mail.php', {
				method: 'post', 
				body: JSON.stringify( values ),
				headers: {
					'content-type': 'application/json'
				}
			})
			let answerText = await response.text()
			// console.log('answerText', answerText)

			if (answerText === 'success') {
				// console.log('письмо отправлено')
				this.leaveContactsPage()
				this.showSuccessPage()
			}
			
			
		})()
	}

	showSuccessPage () {
		this.mainContainerElement.setAttribute('data-main-wrapper', 'success')
		this.mainContainerElement.classList.add('wrapper--success')
		setTimeout(() => {
			// показываем элементы страницы success
			this.successPageElement.classList.add('success--show')
		},1100)
	}

	leaveSuccessPage () {
		this.successPageElement.classList.add('success--hide-animation')
		setTimeout(() => {
			this.mainContainerElement.classList.remove('wrapper--success')
			this.successPageElement.classList.remove('success--hide-animation')
			this.successPageElement.classList.remove('success--show')
			
		},1100)
	}

	successButtonHandler () {
		const successButtonElement = document.querySelector('[data-success-button]')
		successButtonElement.addEventListener('click', () => {
			
			this.leaveSuccessPage()
			this.logo.showMainPage()
		})
	}
}