let btn = document.querySelector('.btn'),
  input = document.querySelector('.input'),
  timeOut = document.querySelector('.time'),
  gameBox = document.querySelector('.game__block'),
  time = 0,
  score = 0,
  interval = 0,
  form = ['circle', 'square', 'triangle'];

btn.addEventListener('click', event => {
  event.preventDefault();
  if (input.value > 4) {
    time = input.value;
    input.value = '';
    score = 0;
    clearInterval(interval);
    start();
    let result = document.querySelector('.result');
    if (result) {
      result.style.display = 'none';
    }
  }
});

gameBox.addEventListener('click', event => {
  if (
    event.target.classList.contains('ball') ||
    event.target.classList.contains('square') ||
    event.target.classList.contains('triangle')
  ) {
    score++;
    event.target.remove();
    createBall();
  }
});

function start() {
  btn.disabled = true;
  timeOut.innerHTML = time;
  interval = setInterval(() => {
    decrease();
  }, 1000);
  createBall();
}

function decrease() {
  if (time == 0) {
    endGame();
  } else {
    let currentTime = --time;
    timeOut.innerHTML = currentTime;
  }
}

function endGame() {
  gameBox.innerHTML = `<h2 class="result">Вы набрали: ${score} очков</h2>`;
  btn.disabled = false;
}

function createBall() {
  let size = randomSize();
  let ball = document.createElement('div');
  let formType = randomForm();
  console.log(formType);
  if (formType == 'circle') {
    ball.classList.add('ball');
    ball.style.width = size + 'px';
    ball.style.height = size + 'px';
    ball.style.background = randomColor();
  } else if (formType == 'square') {
    ball.classList.add('square');
    ball.style.height = size + 'px';
    ball.style.width = size + 'px';
    ball.style.background = randomColor();
  } else {
    ball.classList.add('triangle');
    ball.style.background = 'rgb(34, 33, 33)';
    ball.style.borderRightWidth = size / 2 + 'px';
    ball.style.borderLeftWidth = size / 2 + 'px';
    ball.style.borderBottom = size + 'px solid ' + randomColor();
  }

  //   ball.classList.add('ball');

  let coor = gameBox.getBoundingClientRect();
  let x = random(0, coor.width - size);
  let y = random(0, coor.height - size);

  //   ball.style.width = size + 'px';
  //   ball.style.height = size + 'px';

  ball.style.top = y + 'px';
  ball.style.left = x + 'px';

  gameBox.append(ball);
}

function random(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function randomColor() {
  let redIndex = Math.floor(Math.random() * 256);
  let greenIndex = Math.floor(Math.random() * 256);
  let blueIndex = Math.floor(Math.random() * 256);
  let randColor = `rgb(${redIndex}, ${greenIndex}, ${blueIndex})`;
  return randColor;
}

function randomSize() {
  let randSize = Math.floor(Math.random() * (100 + 1 - 20) + 20);
  return randSize;
}

function randomForm() {
  let index = Math.floor(Math.random() * form.length);
  return form[index];
}
