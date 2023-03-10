const startBtnRef = document.querySelector('button[data-start]');
const stoptBtnRef = document.querySelector('button[data-stop]');
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// const color = getRandomHexColor();
// document.body.style.backgroundColor = color;
startBtnRef.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtnRef.disabled = true;
  stoptBtnRef.disabled = false;
}

stoptBtnRef.addEventListener('click', () => {
  clearInterval(intervalId);
  startBtnRef.disabled = false;
  stoptBtnRef.disabled = true;
});
