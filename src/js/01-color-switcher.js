function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const startButton = document.querySelector('[data-start]')
  const stopButton = document.querySelector('[data-stop]')
  const body = document.body

  let currentBackgroundColor = null

  startButton.addEventListener('click', startColor)
  stopButton.addEventListener('click', stopColor)

  function startColor() {
    startButton.disabled = true
    stopButton.disabled = false
    currentBackgroundColor = setInterval (() => {
    const randomColor = getRandomHexColor()
    body.style.backgroundColor = randomColor}, 1000)
  }

function stopColor() {
    startButton.disabled = false
    stopButton.disabled = true
    clearInterval(currentBackgroundColor)
}