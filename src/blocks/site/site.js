import './site.scss'

hoverSiteBlock()

// задаём стиль родителю при наведении на потомка
function hoverSiteBlock () {
	const buttonList = document.querySelectorAll('.site__button')
	for ( let i = 0; i < buttonList.length; i++ ) {
		buttonList[i].addEventListener('mouseenter', () => {
			const parentElement = buttonList[i].closest('.site__link')
			parentElement.style = 'transform: translate(12px, -12px);'
		})
		buttonList[i].addEventListener('mouseleave', () => {
			const parentElement = buttonList[i].closest('.site__link')
			parentElement.style = ''
		})
	}
}