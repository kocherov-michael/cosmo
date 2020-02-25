import './sertificatsSlider.scss'

// const slider = new SertificatsSlider({selector: '.sertificats-slider'})

export default class SertificatsSlider {
	constructor(args = {}) {
		this.sliderElement = document.querySelector(args.selector)
		this.sliderContainerElement = this.sliderElement.querySelector('[data-slider-container]')
		this.sliderItems = this.sliderElement.querySelectorAll('[data-slider-item]')
		this.paginationElement = this.sliderElement.querySelector('[data-slider-pagination]')
		// активная карточка
		this.activeImg = 0
		// длина смещения обёртки с карточками относительно дефолтного положения
		this.moveLength = 0
		// координата первого касания при свайпе
		this.firstTapPosition = null
		// готовность к свайпу
		this.readyToSlide = true
		this.paginationItemsArr = []
		this.touchListener()
		this.addPagination()
	}

	// обработка свайпов
	touchListener () {
		for (let i = 0; i < this.sliderItems.length; i++) {
			this.sliderItems[i].addEventListener("touchmove", (event) => {
				event.stopPropagation()
				// координаты касания по X
				const touchPoint = event.changedTouches[0].pageX
				if (!this.firstTapPosition) {
					this.firstTapPosition = touchPoint
				}
				// разница между первым и текущим касанием
				const difference = this.firstTapPosition - touchPoint
				
				// если перемещение есть, то вызываем функцию со знаком перемещения
				if ( Math.abs(difference) > 10) {
					if (this.readyToSlide) {
						// передаём +1 либо -1
						this.shiftImg (Math.sign(difference))
						// чтобы не срабатывали остальные обработчики
						this.readyToSlide = false
					}
					return
				}
			})

			// слушаем конец касания
			this.sliderItems[i].addEventListener("touchend", () => {
				
				this.firstTapPosition = null
				this.readyToSlide = true
			})
		}
	}

	// добавляем и прослушиваем элементы пагинации
	addPagination () {
		this.paginationElement.innerHTML = ''
		for (let i = 0; i < this.sliderItems.length; i++) {
			const paginationItemElement = document.createElement('div')
			paginationItemElement.classList.add('sertificats-slider__pagination-item')
			if( i === this.activeImg ) {
				paginationItemElement.classList.add('sertificats-slider__pagination-item--active')
			}
			this.paginationElement.append(paginationItemElement)
			// добавляем элемент пагинации в массив для дальнейшей обработки
			this.paginationItemsArr.push(paginationItemElement)
			// клики по элементам пагинации
			paginationItemElement.addEventListener('click', () => {
				const delta = i - this.activeImg
				
				this.shiftImg (delta)
			})
		}
	}
	
	// передвигаем карточки на заданную позицию
	shiftImg ( delta ) {
		// если переключаеся дальше края, то отмена
		if (((this.activeImg + delta) < 0) || ((this.activeImg + delta) > (this.sliderItems.length - 1))) return
		// определяем процент каждой части от блока
		const blockPart = 100 / (this.sliderItems.length)
		this.moveLength -= blockPart * delta
		this.activeImg += delta 

		this.move(this.moveLength)
		this.showActiveImg()
	}

	// подсвечиваем активный элемент пагинации
	showActiveImg () {
		for ( let i = 0; i < this.paginationItemsArr.length; i++) {
			this.paginationItemsArr[i].classList.remove('sertificats-slider__pagination-item--active')
			if ( i === this.activeImg) {
				this.paginationItemsArr[i].classList.add('sertificats-slider__pagination-item--active')
			}
		}
	}

	// передвигаем обёртку для показа нужной карточки
	move (translate) {
		this.sliderContainerElement.style.transform = `translateX(${translate}%)`
	}
}
