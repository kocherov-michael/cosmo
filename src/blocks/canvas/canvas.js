import './canvas.scss'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
// скорость движения частиц
const SPEED = 0.2
// ширина канваса по ширине окна
canvas.width = document.body.clientWidth || window.innerWidth
canvas.height = document.body.clientHeight || window.innerHeight

window.onresize = () => {
	canvas.width = document.body.clientWidth || window.innerWidth
	canvas.height = document.body.clientHeight || window.innerHeight
}
// количество частиц зависит от размера окна
const POINTS_NUMBER = Math.round((canvas.width * canvas.height) / 40000)

// создаём массив с частицами, который заполняем объектами с параметрами частиц
const points = Array(POINTS_NUMBER).fill(0).map((e, i) => {
  const angle = Math.random() * Math.PI * 2

  return {
    x: 10 + Math.floor(Math.random() * (canvas.width - 20)),
		y: 10 + Math.floor(Math.random() * (canvas.height - 20)),
		// проекция скорости на ось X
    dx: SPEED * Math.cos(angle),
		// проекция скорости на ось Y
    dy: SPEED * Math.sin(angle),
    color: getRandomColor(),
    size: getRandomItem([3, 5, 3])
  }
})

setInterval(() => {
  clearCanvas()
  
  for (const point of points) {
    movePoint(point)
    drawPoint(point)
  }
})

function clearCanvas () {
  canvas.width = canvas.width
}

function drawPoint (point) {
  context.beginPath()
  context.moveTo(point.x - point.size, point.y)
  context.lineTo(point.x, point.y - point.size)
  context.lineTo(point.x + point.size, point.y)
  context.lineTo(point.x, point.y + point.size)
  context.closePath()
  context.fillStyle = point.color
  context.fill()
}

function movePoint (point) {
  const x = point.x + point.dx / 10
  const y = point.y + point.dy / 10
  
  if (0 < x && x < canvas.width) {
    point.x = x
  } else {
    point.dx *= -1
    point.x += point.dx
  }
  
  if (0 < y && y < canvas.height) {
    point.y = y
  } else {
    point.dy *= -1
    point.y += point.dy
  }
}

function getRandomBetween (min, max) {
	return min + Math.floor(Math.random() * (max - min + 1))
}

function getRandomItem (args) {
  return args[getRandomBetween(0, args.length - 1)]
}

function getRandomColor () {
  const opacityArr = [0.3, 0.7, 1]
  const colorArr = ['255,102,61', '0,171,223', '255,201,32', '255,255,255']
  return `rgba(${getRandomItem(colorArr)},${getRandomItem(opacityArr)})`
}
