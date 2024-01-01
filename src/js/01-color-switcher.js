const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.body,
};

const switcher = {
  intervalId: null,
  activeStatus: false,
  start() {
    if (this.activeStatus) {
      return;
    }
    this.intervalId = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    this.activeStatus = true;
  },

  stop() {
    clearInterval(this.intervalId);
    this.activeStatus = false;
    refs.body.style.backgroundColor = `#fafafa`;
  },
};

refs.startBtn.addEventListener('click', () => {
  switcher.start();
});

refs.stopBtn.addEventListener('click', () => {
  switcher.stop();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
