const formEl = document.querySelector('form');
let position = 0;
let inputDelay = 0;
let inputStep = 0;
let inputAmount = 0;

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res({ position, delay });
      }
      // Reject
      rej({ position, delay });
    }, inputDelay);
  });
}

function submit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget;
  inputDelay = Number(delay.value);
  inputStep = Number(step.value);
  inputAmount = Number(amount.value);
  for (let i = 1; i <= inputAmount; i += 1) {
    position = i;
    createPromise(position, inputDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    inputDelay += inputStep;
  }
  formEl.reset();
}

formEl.addEventListener('submit', submit);
