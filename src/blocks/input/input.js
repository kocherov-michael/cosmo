import './input.scss'

inputBehavior()
textareaResize()

// поведение инпутов и textarea при фокусе
function inputBehavior () {
	const inputList = document.querySelectorAll('[data-input]')
	for ( let i = 0; i < inputList.length; i++ ) {
		inputList[i].addEventListener('focus', (event) => {
			const parentElement = event.currentTarget.closest('label')
			parentElement.classList.add('label-focus')

			event.currentTarget.addEventListener('blur', (event) => {
				// если фокус потерян, но введены символы, то текст не опускаем
				if (!event.currentTarget.value.trim()) {
					event.currentTarget.value = ''
					const parentElement = event.currentTarget.closest('label')
					parentElement.classList.remove('label-focus')
				}
			})

		})
	}
}
// прослушка ввода текста в textarea
function textareaResize () {
	const textarea = document.querySelector('[data-input="message"]')
	textarea.addEventListener('keypress', resize)
}

// увеличение размера textarea по мере заполняемости
function resize() {
  setTimeout(() => {
    this.style.cssText = 'height:auto; padding:0';
    this.style.cssText = 'height:' + this.scrollHeight + 'px';
  }, 1);
}