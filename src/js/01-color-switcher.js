
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector('body')
}

class ColorBody {
    constructor() {
        this.intervalShowColor = null;
    }

    startShowColor() {
        refs.btnStart.setAttribute('disabled', 'disabled');
        refs.btnStop.removeAttribute('disabled');
        
        this.intervalShowColor = setInterval(() => {
            refs.bodyEl.style.backgroundColor = getRandomHexColor();
        }, 1000)
    }

    stoptShowColor() {
        refs.btnStop.setAttribute('disabled', 'disabled');
        refs.btnStart.removeAttribute('disabled');
        clearInterval(this.intervalShowColor)
    }

}

const colorBody = new ColorBody();

const clickBtnStart = refs.btnStart.addEventListener('click', colorBody.startShowColor.bind(colorBody));
const clickBtnStop = refs.btnStop.addEventListener('click', colorBody.stoptShowColor.bind(colorBody));

