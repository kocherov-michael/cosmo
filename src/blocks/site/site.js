import './site.scss'

// hoverSiteBlock()

// задаём стиль родителю при наведении на потомка
// function hoverSiteBlock () {
// 	const buttonList = document.querySelectorAll('.site__button')
// 	for ( let i = 0; i < buttonList.length; i++ ) {
// 		buttonList[i].addEventListener('mouseenter', () => {
// 			const parentElement = buttonList[i].closest('.site__link')
// 			parentElement.style = 'transform: translate(12px, -12px);'
// 		})
// 		buttonList[i].addEventListener('mouseleave', () => {
// 			const parentElement = buttonList[i].closest('.site__link')
// 			parentElement.style = ''
// 		})
// 	}
// }

toggleWebsites ()

function toggleWebsites() {
	const toggleList = document.querySelectorAll('.portfolio__toggle-item')

	for ( let i = 0; i < toggleList.length; i++ ) {
		
		toggleList[i].addEventListener('click', (event) => {
			for ( let i = 0; i < toggleList.length; i++ ) {
				toggleList[i].classList.remove('portfolio__toggle-item--choosen')

			}
			// if (toggleList[i] != event.currentTarget) {
			// }
			// const parentElement = buttonList[i].closest('.site__link')
			// parentElement.style = 'transform: translate(12px, -12px);'
			event.currentTarget.classList.add('portfolio__toggle-item--choosen')
		})

	}
}