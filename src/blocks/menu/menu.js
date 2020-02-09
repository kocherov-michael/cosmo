import './menu.scss'
import animateMenuIcon from '../menuIcon/menuIcon'
// import showAboutPage from '../about/about'

moveElement('data-menu-about', 'data-about-header')
moveElement('data-menu-portfolio', 'data-about-header')
moveElement('data-menu-contacts', 'data-about-header')

function moveElement (startDataSelector, finishDataSelector) {
	const menuListElement = document.querySelector(`[${startDataSelector}]`)
	const headerTextElement = document.querySelector(`[${finishDataSelector}]`)
	const mainContainerElement = document.querySelector('[data-main-container]')
	const centerTextElement = document.querySelector('[data-center-text]')
	
	// слушаем нажатие на элемент списка меню
	menuListElement.addEventListener('click', function(event){
		// скываем социальные иконки 
		mainContainerElement.classList.add('hide-icons')
		// получаем дата-атрибут страницы, на которую переходим
		const openPageClass = menuListElement.getAttribute(startDataSelector)
		// console.log(openPageClass)

		const targetPageElement = document.querySelector(`[${openPageClass}]`)

		// mainContainerElement.classList.toggle('about-me')

		// скрываем центральный текст
		centerTextElement.classList.add('center-text--animation')

		headerTextElement.classList.add('hidden')

		const targetCoordinates = getCoords(headerTextElement)
		// console.log('target', targetCoordinates)
		
		const leaveCoordinates = getCoords(this)
		// console.log('leave', leaveCoordinates)

		const movingTextElement = this.cloneNode(true)
		this.classList.add('hidden')

		movingTextElement.classList.add('menu-moving-text')
		movingTextElement.style.top = `${leaveCoordinates.top}px`
		movingTextElement.style.left = `${leaveCoordinates.left}px`

		document.body.append(movingTextElement)

		movingTextElement.classList.add('menu-moving-tagret')

		changeCoordinats (movingTextElement, leaveCoordinates, targetCoordinates)
		setTimeout(() => {
			movingTextElement.parentNode.removeChild(movingTextElement)
			headerTextElement.classList.remove('hidden')
			menuListElement.classList.remove('hidden')
			// скываем уехавший центральный текст
			mainContainerElement.classList.add('about-me')
			// показываем текст и фотографию
			targetPageElement.classList.add('show')
			// showAboutPage()
		}, 1100)
	})
}

// перемещаем элемент
function changeCoordinats (elem, leaveCoordinates, targetCoordinates) {
	const leaveX = leaveCoordinates.top
	const leaveY = leaveCoordinates.left
	const targetX = targetCoordinates.top
	const targetY = targetCoordinates.left

	let startX
	let startY
	let finishX
	let finishY

	if (targetX < leaveX) {
		startX = leaveX
		finishX = targetX
	} else {
		startX = targetX
		finishX = leaveX
	}

	if (targetY < leaveY) {
		startY = leaveY
		finishY = targetY
	} else {
		startY = targetY
		finishY = leaveY
	}

	// шаг перерисовки элемента
	let stepX = 10
	let stepY = 10
	
	let currentX = startX
	let currentY = startY
	let timerId = setInterval(() => {
		
		let deltaX = (startX - finishX) / stepX
		let deltaY = (startY - finishY) / stepY

		currentX -= deltaX
		elem.style.top = `${currentX}px`

		currentY -= deltaY
		elem.style.left = `${currentY}px`
		
		// если элемент приближается к финишу - уменьшаем шаг для более точного позиционирования
		if (5 > (currentX - finishX)) {
			// console.log(deltaX)
			stepX = 2000
		}

		if (5 > (currentY - finishY)) {
			stepY = 200
		}

		if (currentX <= finishX) {
			
			clearInterval(timerId)
			animateMenuIcon()
		}
	}, 10);

}

// находим координаты верхней левой точки элемента
function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}