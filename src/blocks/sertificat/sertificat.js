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
		// статус кликабельности элемента
		this.openStatus = false
	}

	// увеличиваем картинку
	loopImg () {
		// находим все нужные картинки
		const sertificatsList = document.querySelectorAll('[data-sertificat]')
		for ( let i = 0; i < sertificatsList.length; i++ ) {
			
			sertificatsList[i].addEventListener('click', (event) => {
				// проверяем, не открыта ли уже новая обёртка с элементом
				if (this.openStatus) return
				this.openStatus = true
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

				// анимация иконки меню при нажатии
				this.changeMenuIcon()

				// создаём клон картинки
				this.newPictureElement = this.createClone(sertificatsList[i])
	
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

				// this.imgElement = this.newWrapperElement.querySelector('.sertificat__img')
				// плавно открываем обёртку
				setTimeout(() => {
					this.newWrapperElement.classList.add('single-sertificat-wrapper--show')
					this.newPictureElement.classList.add('sertificat__img-wrapper--show')
					// задаём радиус расширения окружности
					this.newWrapperElement.style.width = `${maxSize * 2.5}px`
					this.newWrapperElement.style.height = `${maxSize * 2.5}px`
					// ширина обёртки - по краям окна
					this.newPictureElement.style.width = `${this.windowX}px`
					if (this.windowX >= 768) {
						console.log('>768')
						this.newPictureElement.style.height = `${this.windowY}px`
					}
					// this.newPictureElement.style.height = `auto`
				},0)
	
			})
		}
	}

	// создание клона сертификата
	createClone (element) {
		// находим картинку в элементе 
		const imgElement = element.querySelector('img')
		// получаем url картинки
		const url = imgElement.getAttribute('src')
		// создаём обёртку, в которую положим картинку
		const newElement = document.createElement('div')
		newElement.classList.add('sertificat__img-wrapper--active')
		
		// когда вернулась загруженная картинка - вставляем её в обёртку
		Sertificat.loadImage(url).then(image => {
			image.classList.add('sertificat__img')
			newElement.append(image)
			
			// даём изображению координаты центра экрана
			if (this.windowX >= 768) {
				image.style = `transform: translate(${this.diffrentX}px, ${this.diffrentY}px);`
			}
			else {
				image.style = `transform: translate(${this.diffrentX}px, ${this.diffrentY}px); width: ${this.windowX - 50}px; `
			}

		})
		
		return newElement
	}

	// метод загрузки изображения
	static loadImage (url) {
		return new Promise((resolve, reject) => {
			const image = new Image()
			image.src = url
			// кодда изображение загрузилось - возвращаем картинку
			image.onload = () => resolve(image)
		})
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

		// this.newPictureElement.style.width = ``
		// this.newPictureElement.style.height = ``
		setTimeout(() => {
			// удаляем добавленные элементы
			this.newPictureElement.parentNode.removeChild(this.newPictureElement)
			this.newWrapperElement.parentNode.removeChild(this.newWrapperElement)
			// меняем статус, что элемент теперь кликабелен
			this.openStatus = false
		},800)
	}

}

