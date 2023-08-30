import Notiflix from "notiflix";
const delayInput = document.querySelector('[name="delay"]')
const stepInput = document.querySelector('[name="step"]')
const amountInput = document.querySelector('[name="amount"]')
const submitButton = document.querySelector('[type="submit"]')

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
  if (shouldResolve) {
    resolve ({position, delay})
  } else {
   reject({position, delay})
  }
}, delay)
  })
}

submitButton.addEventListener('click', handleClick)

function handleClick(event) {
  event.preventDefault()
  let delay = parseInt(delayInput)
  let step = parseInt(stepInput.value)
  let amount = parseInt(amountInput.value)
  for (let i = 0; i < amount; i += 1) {
    let position = i + 1
    createPromise(position, delay).then(({position, delay}) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {clickToClose: true})
    }).catch(({position, delay}) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`, {clickToClose: true})
    })
    delay += step
  }
}