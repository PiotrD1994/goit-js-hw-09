import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const input = document.querySelector('#datetime-picker')
const startButton = document.querySelector('[data-start]')
const daysCount = document.querySelector('[data-days]')
const hoursCount = document.querySelector('[data-hours]')
const minutesCount = document.querySelector('[data-minutes]')
const secondsCount = document.querySelector('[data-seconds]')

const timer = document.querySelector('.timer')

timer.style.display = 'flex'
timer.style.gap = '30px'

const field = document.querySelectorAll('.field')

field.forEach(field => {
field.style.display = 'flex'
field.style.flexDirection = 'column'
field.style.alignItems = 'center'
})

const label = document.querySelectorAll('.label')

label.forEach(label => {
    label.style.textTransform = 'uppercase'
    label.style.fontSize = '10px'
    label.style.fontWeight = 'bold'
})

const value = document.querySelectorAll('.value')

value.forEach(value => {
    value.style.fontSize = '30px'
})


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      datetimePicker(selectedDates);
    },
  };

flatpickr('#datetime-picker', {...options})
let intervalId = 0

function datetimePicker(selectedDates) {
    if (selectedDates[0].getTime() <= new Date()) {
        Notiflix.Notify.failure('Please choose a date in the future', {clickToClose: true})
        startButton.disabled = true
        return;
    } else {
    startButton.disabled = false
}
}
startButton.addEventListener('click', handleclick)

function handleclick() {
    startButton.disabled = true
    input.disabled = true
    intervalId = setInterval(updateCountdown, 1000)
    function updateCountdown() {
        const chosenDate = new Date(input.value)
        const currentDate = new Date()
        const timeDifference = chosenDate - currentDate
        const {days, hours, minutes, seconds} = convertMs(timeDifference)
        daysCount.textContent = addLeadingZero(days)
        hoursCount.textContent = addLeadingZero(hours)
        minutesCount.textContent = addLeadingZero(minutes)
        secondsCount.textContent = addLeadingZero(seconds)
        if (timeDifference <= 0) {
            clearInterval(intervalId)
            startButton.disabled = true
            return;
        } else {
            startButton.disabled = false
        }
    }
}
function addLeadingZero(value) {
    return value.toString().padStart(2,'0')
}

function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor(((ms % day) % hour) / minute);
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      return { days, hours, minutes, seconds };
    }