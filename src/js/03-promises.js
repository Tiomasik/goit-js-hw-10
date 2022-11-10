import Notiflix from 'notiflix';

const refs = {
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  formEl: document.querySelector('.form')
};

const dataPromise = {
  firstDelay: 0,
  step: 0,
  amount: 0,
  position: 0,
  delay: 0,
};

refs.inputDelay.addEventListener('input', onInputDelay);
refs.inputStep.addEventListener('input', onInputStep);
refs.inputAmount.addEventListener('input', onInputAmount);
refs.formEl.addEventListener('submit', onStartMesenger);

function onStartMesenger(evt) {
  evt.preventDefault()

  for (let index = 0; index < dataPromise.amount; index += 1) {
    dataPromise.position += 1
    if (Number(dataPromise.position) === 1) {
    dataPromise.delay += Number(dataPromise.firstDelay);
  } else {
    dataPromise.delay += Number(dataPromise.step);
  }
    createPromise(dataPromise).then(onMakePromiseSuccess).catch(onMakePromiseError);
  }

  // refs.formEl.reset();
  dataPromise.position = 0;
  dataPromise.delay = 0;
}

function createPromise({position, delay}) {
  const shouldResolve = Math.random() > 0.3;
 
  return new Promise((resolve, reject) => {

    setTimeout(() => {     
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`)
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`)
      }
    }, delay)
  })
}

function onMakePromiseSuccess(result) {
  Notiflix.Notify.success(result)
}

function onMakePromiseError(error) {
  Notiflix.Notify.failure(error);
}

function onInputDelay(evt) {
  dataPromise[`firstDelay`] = `${evt.target.value}`;
}

function onInputStep(evt) {
  dataPromise[`step`] = `${evt.target.value}`;
}

function onInputAmount(evt) {
  dataPromise[`amount`] = `${evt.target.value}`;
}

