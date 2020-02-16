import './sertificat.scss'
import MenuIcon from '../menuIcon/menuIcon'

export default class Sertificat {
	constructor ( args = {}) {
		// элемент иконки меню
		this.menuIconElement = document.querySelector('[data-menu-icon]')
		// запускаем прослушку картинки
		this.loopImg()
		// прослушка иконки крестика
		this.listenMenuIcon()
	}

	// увеличиваем картинку
	loopImg () {
		// находим все нужные картинки
		const sertificatsList = document.querySelectorAll('[data-sertificat]')
		for ( let i = 0; i < sertificatsList.length; i++ ) {
			
			sertificatsList[i].addEventListener('click', (event) => {
				// ширина окна
				this.windowX = window.innerWidth
				// высота окна
				this.windowY = window.innerHeight
				// выбираем наибольший размер для отрисовки радиуса окружности
				const maxSize = Math.max(window.innerWidth, window.innerHeight)
				// отступ клика от левого края
				this.clientX = event.clientX
				// отступ клика от верхнего края
				this.clientY = event.clientY

				// находим разницу между местом клика и центром страницы
				this.diffrentX = window.innerWidth / 2 - event.clientX 
				this.diffrentY = window.innerHeight / 2 - event.clientY


				this.changeMenuIcon()
	
				// создаём клон картинки
				this.newPictureElement = sertificatsList[i].cloneNode(true)
				this.newPictureElement.classList.add('sertificat__img-wrapper--active')
				// console.log(event.clientX)
				// console.log(event.clientY)
				// создаём обёртку для показа картинки
				this.newWrapperElement = document.createElement('div')
				this.newWrapperElement.classList.add('single-sertificat-wrapper')
				// задаём точку, из которой раскрывается обёртка
				
				this.newWrapperElement.style.left = `${this.clientX}px`
				this.newWrapperElement.style.top = `${this.clientY}px`
				// добаляем новую обёртку на страницу
				document.body.append(this.newWrapperElement)
				// добавляем картинку в новую обёртку
				this.newWrapperElement.append(this.newPictureElement)

				this.imgElement = this.newWrapperElement.querySelector('.sertificat__img')
				// плавно открываем обёртку
				setTimeout(() => {
					this.newWrapperElement.classList.add('single-sertificat-wrapper--show')
					this.newPictureElement.classList.add('sertificat__img-wrapper--show')
					// задаём радиус расширения окружности
					this.newWrapperElement.style.width = `${maxSize * 2}px`
					this.newWrapperElement.style.height = `${maxSize * 2}px`
					// ширина обёртки - по краям окна
					this.newPictureElement.style.width = `${this.windowX}px`
					this.newPictureElement.style.height = `${this.windowY}px`
					// переносим картинку в центр
					this.imgElement.style = `transform: translate(${this.diffrentX}px, ${this.diffrentY}px);`
				},0)
	
			})
		}
	}

	// изменяем иконку меню на крестик
	changeMenuIcon () {
		// const menuElement = document.querySelector('[data-menu]')
		
		// указываем, что мы открыли картинку
		this.menuIconElement.setAttribute('data-menu-icon', 'sertificate')
		// анимируем переход от бургера к крестику
		MenuIcon.animateMenuIcon()
		// добавляем крестику возможность анимации по ховеру
		this.menuIconElement.classList.add('menu-icon--animation')
		
	}
	// прослушиваем иконку крестика
	listenMenuIcon () {
		this.menuIconElement.addEventListener('click', () => {
			const menuIconAttribute = this.menuIconElement.getAttribute('data-menu-icon') 
			// если нажимаем при открытой картинке - закрываем картинку
			if (menuIconAttribute === 'sertificate' ) {
				this.closeImage()
				// удаляем информацию, что мы в картинке
				this.menuIconElement.setAttribute('data-menu-icon', '')
			}
		})
	}
	// закрываем картинку
	closeImage () {

		this.newPictureElement.classList.remove('sertificat__img-wrapper--show')
		this.newWrapperElement.classList.remove('single-sertificat-wrapper--show')

		this.newWrapperElement.style.width = ``
		this.newWrapperElement.style.height = ``

		this.newPictureElement.style.width = ``
		this.newPictureElement.style.height = ``
		setTimeout(() => {
			// удаляем добавленные элементы
				this.newPictureElement.parentNode.removeChild(this.newPictureElement)
				this.newWrapperElement.parentNode.removeChild(this.newWrapperElement)
		},800)
	}

}

