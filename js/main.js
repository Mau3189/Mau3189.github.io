const body = document.querySelector('body')
const label = document.querySelector('#fl')

let colors = ['./img/fl-vanilla.webp', './img/fl-choco.webp', './img/fl-mm.webp', './img/fl-straw.webp']

let FPS = 60

let width
  , height
  , velocityX = 1
  , velocityY = 1
  , pause = true
  , previousColor = 0
;

setInterval(() => {
  if (pause) return;

  let rect = label.getBoundingClientRect()

  let left = rect.x
  let top = rect.y

  if (left + rect.width >= width || left <= 0) {
    velocityX = -velocityX
    let randomColor = getRandomColor()
    label.src = randomColor
  }
  if (top + rect.height >= height || top <= 0) {
    velocityY = -velocityY
    let randomColor = getRandomColor()
    label.src = randomColor
  }

  label.style.left = rect.x + velocityX + 'px'
  label.style.top = rect.y + velocityY + 'px'
}, 1000 / FPS)


const reset = () => {
  width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  ;

  height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  ;

  pause =
    width <= label.getBoundingClientRect().width ||
    height <= label.getBoundingClientRect().height
  ;

  label.style.left = 'calc(15vw)'
  label.style.top = 'calc(15vh)'
  label.src = colors[0]
}


const getRandomColor = () => {
  let currentColor = -1
  
  do {
    currentColor = Math.floor(Math.random() * colors.length);
  } while (previousColor == currentColor);
  
  previousColor = currentColor
  
  return colors[currentColor]
}

reset()

window.addEventListener('resize', reset, true)