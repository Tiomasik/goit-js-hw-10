import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    inputEl: document.querySelector('input[id="datetime-picker"]'),
    btnStart: document.querySelector('button[data-start]'),
    timeDays: document.querySelector('span[data-days]'),
    timeHours: document.querySelector('span[data-hours]'),
    timeMinutes: document.querySelector('span[data-minutes]'),
    timeSeconds: document.querySelector('span[data-seconds]')
}

refs.timeDays.style.color = "green";
refs.timeHours.style.color = "violet";
refs.timeMinutes.style.color = "yellow";
refs.timeSeconds.style.color = "red";

const dateNow = new Date();
let dateSelected;

class Timer {
    constructor({ onFaceTime }) {
        this.onFaceTime = onFaceTime;
        this.intervalTime = null;
    }
    
    getDifferenceTime() {
        refs.btnStart.setAttribute('disabled', 'disabled');
        refs.inputEl.setAttribute('disabled', 'disabled');

        this.intervalTime = setInterval(() => {
            const dateCurent = new Date();
            this.differenceTime = dateSelected - dateCurent; 
            const time = this.convertMs(this.differenceTime);
            this.onFaceTime(time);

            if (this.differenceTime <= 0) {
                this.stopTime()
                updateTimeFace({ days : "00", hours: "00", minutes: "00", seconds: "00" })
            }
        }, 1000);
    }

    stopTime() {
        clearInterval(this.intervalTime);
    }

    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = this.pad(Math.floor(ms / day));
        const hours = this.pad(Math.floor((ms % day) / hour));
        const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
        const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    }

    pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onFaceTime: updateTimeFace
});

function updateTimeFace({ days, hours, minutes, seconds }) {
    refs.timeDays.textContent = days;
    refs.timeHours.textContent = hours;
    refs.timeMinutes.textContent = minutes;
    refs.timeSeconds.textContent = seconds;
}

const clickBtn = refs.btnStart.addEventListener('click', timer.getDifferenceTime.bind(timer));

const fp = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (dateNow >= selectedDates[0].getTime()) {
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {
            refs.btnStart.removeAttribute('disabled');
            dateSelected = selectedDates[0].getTime()
        }
    },
});
