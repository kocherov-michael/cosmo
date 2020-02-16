import './sertificat.scss'
// import Menu from '../menu/menu'
// console.log('8')

loopImg()

function loopImg () {
	const sertificatsList = document.querySelectorAll('[data-sertificat]')
	for ( let i = 0; i < sertificatsList.length; i++ ) {
		sertificatsList[i].addEventListener('click', (event) => {

			// создаём клон картинки
			const newPictureElement = sertificatsList[i].cloneNode(true)
			newPictureElement.classList.add('sertificat__img-wrapper--active')
			// console.log(event.clientX)
			// console.log(event.clientY)
			// создаём обёртку для показа картинки
			const newWrapperElement = document.createElement('div')
			newWrapperElement.classList.add('single-sertificat-wrapper')
			// задаём точку, из которой раскрывается обёртка
			newWrapperElement.style.left = `${event.clientX}px`
			newWrapperElement.style.top = `${event.clientY}px`
			// добаляем новую обёртку на страницу
			document.body.append(newWrapperElement)
			// добавляем картинку в новую обёртку
			document.body.append(newPictureElement)
			// плавно открываем обёртку
			setTimeout(() => {
				newWrapperElement.classList.add('single-sertificat-wrapper--show')
				newPictureElement.classList.add('sertificat__img-wrapper--show')
			},0)
			// плавно показываем картинку
			setTimeout(() => {
				newWrapperElement.style.left = `0`
				newWrapperElement.style.top = `0`
				// newWrapperElement.classList.remove('single-sertificat-wrapper--show')
				newWrapperElement.classList.add('single-sertificat-wrapper--open')
			},800)

			// moveMenuText(sertificatsList[i])
			// const newElement = sertificatsList[i].cloneNode(true)
			// newElement.classList.add('sertificat__img-wrapper--active')

			// document.body.append(newElement)

			// setTimeout(() => {

			// 	newElement.classList.add('sertificat__img-wrapper--show')
			// },0)

			// newElement.addEventListener('click', () => {
			// 	newElement.classList.remove('sertificat__img-wrapper--show')

			// 	// ждём пока исчезнет картинка
			// 	setTimeout(() => {
			// 		newElement.parentNode.removeChild(newElement)
			// 	},400)
			// })

		})
	}
}

