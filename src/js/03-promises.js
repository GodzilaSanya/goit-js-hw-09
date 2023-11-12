import { Notify } from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', handlerInput);

function handlerInput(e) {
  e.preventDefault();
  const delay = Number(e.target.elements.delay.value);
  const step = Number(e.target.elements.step.value);
  const amount = Number(e.target.elements.amount.value);
  for (let i = 1, delayStep = delay; i <= amount; i++) {
    createPromise(i, delayStep)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayStep += step;
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position: position, delay: delay });
      } else {
        rej({ position: position, delay: delay });
      }
    }, delay);
  });
}
