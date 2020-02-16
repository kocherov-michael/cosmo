import './menu.scss'
import animateMenuIcon from '../menuIcon/menuIcon'
import AboutPage from '../about/about'
import ContactsPage from '../contacts/contacts'
import PortfolioPage from '../portfolio/portfolio'
// import showAboutPage from '../about/about'

moveElement('data-menu-about', 'data-about-header')
moveElement('data-menu-portfolio', 'data-portfolio-header')
moveElement('data-menu-contacts', 'data-contacts-header')

function moveElement (startDataSelector, finishDataSelector) {
	const menuListElement = document.querySelector(`[${startDataSelector}]`)
	const headerTextElement = document.querySelector(`[${finishDataSelector}]`)
	const mainContainerElement = document.querySelector('[data-main-container]')
	const centerTextElement = document.querySelector('[data-center-text]')

	
	// слушаем нажатие на элемент списка меню
	menuListElement.addEventListener('click', function(event){
		// смотрим откуда уходим
		const leavePage = mainContainerElement.getAttribute('data-main-container')
		console.log('leavePage', leavePage)
		// смотрим куда переходим
		const purposePage = menuListElement.getAttribute('data-menu-target')
		// console.log(purposePage)

		if (!window.contactsPage) {
			window.contactsPage = new ContactsPage()
		}
		if (!window.aboutPage) {
			window.aboutPage = new AboutPage()
		}
		if (!window.portfolioPage) {
			window.portfolioPage = new PortfolioPage()
		}
		// если никуда не уходим - просто закрываем меню
		if (leavePage === purposePage) {
			animateMenuIcon()
			return
		}
		// если уходим с главной страницы
		if (leavePage === 'main') {
			// скpываем социальные иконки 
			mainContainerElement.classList.add('hide-icons')
			// скрываем центральный текст
			centerTextElement.classList.add('center-text--animation')
			// скрываем заголовок целевой страницы
			headerTextElement.classList.add('hidden')
		}
		else if (leavePage === 'about') {
			// console.log('leave')
			aboutPage.leaveAboutPage()
		}
		else if (leavePage === 'contacts') {
			contactsPage.leaveContactsPage()
		}
		else if (leavePage === 'portfolio') {
			portfolioPage.leavePortfolioPage()
		}

		moveMenuText(menuListElement, headerTextElement, mainContainerElement, purposePage)


		// показываем целевую страницу
		if (purposePage === 'about') {
			aboutPage.showAboutPage()
		} 
		else if (purposePage === 'contacts') {
			contactsPage.showContactsPage()
		} 
		else if (purposePage === 'portfolio') {
			portfolioPage.showPortfolioPage()
		}

	})
}
function moveMenuText (menuListElement, headerTextElement, mainContainerElement, purposePage) {
		// получаем координаты целевого элемента
		const targetCoordinates = getCoords(headerTextElement)
		// console.log(targetCoordinates)
		// console.log('purposePage', purposePage)
		// console.log('headerTextElement', headerTextElement)
		// console.log(targetCoordinates)
		// координаты текущего элемента
		const leaveCoordinates = getCoords(menuListElement)
		// создаём дубликат элемента для его передвижения
		const movingTextElement = menuListElement.cloneNode(true)
		// скрываем текущий элемент
		menuListElement.classList.add('hidden')
		// даём клону position fixed и координаты
		movingTextElement.classList.add('menu-moving-text')
		movingTextElement.style.top = `${leaveCoordinates.top}px`
		movingTextElement.style.left = `${leaveCoordinates.left}px`

		document.body.append(movingTextElement)

		movingTextElement.classList.add('menu-moving-tagret')
		// передвигаем клон
		changeCoordinats (movingTextElement, leaveCoordinates, targetCoordinates)
		// закрываем меню
		animateMenuIcon()

		// задержка чтобы успел уехать текст с главной
		setTimeout(() => {
			// удаляем клон элемента, который приехал на нужное место
			movingTextElement.parentNode.removeChild(movingTextElement)
			headerTextElement.classList.remove('hidden')
			menuListElement.classList.remove('hidden')

			// скрываем уехавший центральный текст
			mainContainerElement.classList.add('container--hide-centerText')
			mainContainerElement.classList.add(`container--${purposePage}`)
		}, 1100)
}

// перемещаем элемент
function changeCoordinats (elem, leaveCoordinates, targetCoordinates) {
	// console.log(arguments)
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
			// animateMenuIcon()
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