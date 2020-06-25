import './dropdown.scss'

export default class Filter{
	constructor (args = {}) {
		// родительский элемент
		this.dropdownElement = document.querySelector('[data-dropdown]')
		// обёртка
		this.dropdownWrapperElement = document.querySelector('[data-dropdown-wrapper]')
		// список
		this.dropdownListElement = document.querySelector('[data-dropdown-list]')
		// статус дропдауна открыто/закрыто
		this.dropdownIsOpen = false
		// кнопки переключения
		this.filterButtonsList = document.querySelectorAll('[data-portfolio-filter]')

		this.filterListeners()
	}

	// вешаем обработчики на переключатели
	filterListeners () {
	
		const filterDefaultElement = document.querySelector('[data-portfolio-filter="all"]')
		// высота 1 элемента списка, если она будет меньше 40, то заменяем её на 40, иначе ставим её 
		// (иногда появляется такой баг)
		this.elementHeight = filterDefaultElement.offsetHeight < 40 ? 40 : filterDefaultElement.offsetHeight
		
		// максимальныя высота обёртки
		this.dropdownMaxHeight = this.elementHeight * this.filterButtonsList.length
		// устанавливаем высоту обёртки по умолчанию
		this.dropdownWrapperElement.style.height = `${this.elementHeight}px`

		// ждём когда откроют
		this.dropdownWrapperElement.addEventListener('click', this.wrapperHandler.bind(this))
	
		// вешаем обработчики на элементы списка
		for ( let i = 0; i < this.filterButtonsList.length; i++ ) {
			// передаём инкремент в обработчик
			this.filterButtonsList[i].addEventListener('click', this.listItemsHandler.bind(this, i))
		}
	}
	// обработчик обёртки - открывает дропдаун
	wrapperHandler () {
		// элемент стрелки, по которой определяем показан ли дропдаун
		const chevronElement = document.querySelector('.dropdown__chevron')
		// если дропдаун скрыт, то не обрабатываем
		if (Filter.isHidden(chevronElement)) return
		// открываем обёртку
		this.dropdownWrapperElement.style.height = `${this.dropdownMaxHeight}px`
		// показываем весь список
		this.dropdownListElement.style.top = `0px`
		this.dropdownElement.classList.add('dropdown--active')
		// меняем статус на открыто
		this.dropdownIsOpen = true
	}

	// обработчик элемента списка
	listItemsHandler (i, event) {
		// если дропдаун открыт, предотвращаем нажатия на обёртку
		if (this.dropdownIsOpen) {
			event.stopPropagation()
		}
		// перемещаем список так, чтобы был виден только активный ппереключатель
		this.dropdownListElement.style.top = `-${this.elementHeight * i}px`
		// обёртку дропдауна уменьшаем до высоты одного элемента списка
		this.dropdownWrapperElement.style.height = `${this.elementHeight}px`
		this.dropdownElement.classList.remove('dropdown--active')
		this.dropdownIsOpen = false

		// если нажимаем по уже активному переключателю - то не обрабатываем
		if (event.currentTarget.classList.contains('dropdown__list-item--active')) {
			return
		}
		// снимаем выделение у всех элементов
		for ( let i = 0; i < this.filterButtonsList.length; i++ ) {
			this.filterButtonsList[i].classList.remove('dropdown__list-item--active')
		}

		// атрибут, по которому фильтруем
		const attribute = event.currentTarget.getAttribute('data-portfolio-filter')
		// Добавляем нажатому фильтру выделение
		event.currentTarget.classList.add('dropdown__list-item--active')
		// фильтруем элементы по атрибуту
		this.filterElements(attribute)
		
	}

	filterElements (attribute) {
		// фильтруемые элементы
		const filterElementsList = document.querySelectorAll('[data-filter-item]')
		// сначала убираем все элементы, которые фильтруем
		for ( let j = 0; j < filterElementsList.length; j++ ) {
			filterElementsList[j].classList.add('disappear')
		}
		// ждём пока исчезнут
		setTimeout(() => {
			for ( let j = 0; j < filterElementsList.length; j++ ) {
				// если элемент содердит класс, указанный в атрибуте
				if (filterElementsList[j].classList.contains(attribute)) {
					
					// убираем display: none;
					filterElementsList[j].classList.remove('hide')
					setTimeout(() => {
						// анимация появления
						filterElementsList[j].classList.remove('disappear')
					}, 100)
				} else {
					// если элемент не имеет нужный класс, добавляем display: none;
					filterElementsList[j].classList.add('hide')
				}
			}
		}, 400)
	}

	// проверка виден ли элемент
	static isHidden(elem) {
		return !elem.offsetWidth && !elem.offsetHeight;
	}
}
