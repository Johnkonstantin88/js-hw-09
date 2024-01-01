import Notiflix from 'notiflix';

const submitForm = document.querySelector('.form');
submitForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  if (delay.value < 0 || step.value < 0 || amount.value < 0) {
    Notiflix.Notify.warning(`❗ Please enter a positive number`);
  } else {
    for (let i = 0; i < amount.value; i += 1) {
      let position = i + 1;
      const stepDelay = Number(delay.value) + step.value * i;

      createPromise(position, stepDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// function onSubmit(e) {
//   e.preventDefault();

//   const form = e.target;
//   const firstDelay = e.currentTarget.delay;
//   const delay = e.currentTarget.step;
//   const amount = e.currentTarget.amount;

//   const promiseNumbers = [];
//   let sum = 0;

//   while (promiseNumbers.length < amount.value) {
//     promises.push((sum += 1));
//   }

//   setTimeout(() => {
//     promises.forEach((promise, index) => {
//       setTimeout(() => {
//         createPromise(promise, delay.value)
//           .then(({ position, delay }) => {
//             Notiflix.Notify.success(
//               `✅ Fulfilled promise ${position} in ${delay}ms`
//             );
//           })
//           .catch(({ position, delay }) => {
//             Notiflix.Notify.failure(
//               `❌ Rejected promise ${position} in ${delay}ms`
//             );
//           });
//       }, delay.value * index);
//     });
//   }, firstDelay.value);
// }

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }
