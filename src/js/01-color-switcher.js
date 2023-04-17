const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
let colorInterval = null;
refs.buttonStart.addEventListener('click', startRandomcolor);
refs.buttonStop.addEventListener('click', stopRandomColor);
function startRandomcolor() {
  refs.buttonStart.disabled = true;
  refs.buttonStop.disabled = false;
  colorInterval = setInterval(() => {
    refs.body.style.background = getRandomHexColor();
  }, 1000);
}
function stopRandomColor() {
  clearInterval(colorInterval);
  refs.buttonStart.disabled = false;
  refs.buttonStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
