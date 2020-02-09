import './button.scss'

// // buttonHoverEffect('data-resume-button')

// function buttonHoverEffect (dataSelector) {

// 	const buttonElement = document.querySelector(`[${dataSelector}]`)
// 	const buttonHoverElement = buttonElement.querySelector('.button__container')
// 	const buttonBorderElement = buttonElement.querySelector('.button__border')
// 	const overflowContainerElement = buttonElement.closest('[data-button-overflow]')
// 	// const positionArr = []
// 	// const transitionArr = []
// 	// buttonElement.addEventListener('mouseenter', () => {
// 		buttonHoverElement.addEventListener('mouseenter', () => {
// 		setTimeout(() => {
// 			overflowContainerElement.classList.add('about__button--overflow-visible')
// 			// buttonElement.addEventListener('mousemove', mouseMoveListener )
// 			buttonHoverElement.addEventListener('mousemove', mouseMoveListener )

// 		}, 400)
// 	})

// 	function mouseMoveListener (event) {
// 		console.log('1')
// 		// объект данных
// 		const pos = buttonHoverElement.getBoundingClientRect()
// 		// ширина элемента
// 		const elementWidth = pos.x

// 		const rightSidePosition = pos.right

		
		
		
		
// 		// положение левого края блока на странице
// 		const leftSidePosition = pos.left
// 		// положение курсора на странице
// 		const cursorpositionX = event.pageX
		
// 		// buttonElement.style.transform = `translate(10px, -10px);`
		
// 		// центр элемента X
// 		const centerX = (pos.right - pos.left) / 2
// 		const centerY = (pos.bottom - pos.top) / 2
// 		// положение курсора на элементе
// 		const cursorInElemX = event.pageX - pos.left
// 		const cursorInElemY = event.pageY - pos.top

// 		const ratioX = (cursorInElemX - centerX) / (0 - centerX)
// 		const ratioY = (cursorInElemY - centerY) / (0 - centerY)

// 		buttonBorderElement.style.transform = `translate(${5 * ratioX }px, ${5 * ratioY }px)`

		
// 		buttonHoverElement.addEventListener('mouseleave', mouseLeaveListener )
// 		// buttonElement.addEventListener('mouseleave', mouseLeaveListener )

		

// 	}

// 	function mouseLeaveListener () {
// 		overflowContainerElement.classList.remove('about__button--overflow-visible')
// 		buttonBorderElement.style.transform = `translate(0px, 0px)`
// 		buttonHoverElement.removeEventListener('mousemove', mouseMoveListener )
// 		buttonHoverElement.removeEventListener('mouseleave', mouseLeaveListener )
// 		// buttonElement.removeEventListener('mousemove', mouseMoveListener )
// 		// buttonElement.removeEventListener('mouseleave', mouseLeaveListener )
// 	}






// }

// находим координаты верхней левой точки элемента
// function getButtonCoords(elem) {
//   var box = elem.getBoundingClientRect();

//   return {
//     top: box.top + pageYOffset,
//     left: box.left + pageXOffset
//   };

// }