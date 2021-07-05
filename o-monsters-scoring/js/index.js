import shuffle from './shuffle.js';
import {monsters} from './monsters.js';

let app = document.querySelector('#app');
let status = document.querySelector('h2');
let playAgainBtn = document.querySelector('.playButton');
let playing = true;

let score = 0;

function clickHandler(event) {
  if(playing === false) {
    playAgainBtn.disabled = false;
    playAgainBtn.onClick = setUpGame();
    return;
  }
  let btn = event.target.closest('[data-monster]');
  if (!btn) return;
  let monster = monsters[btn.getAttribute('data-monster')];
  if (!monster) return;

  if (monster.name === 'sock') {
    status.innerText = 'You LOST!';
    playing = false;
    document.querySelectorAll('app button').forEach( button => button.disabled = true);
    playAgainBtn.disabled = false;
  }

  score++;

  if (score === monsters.length) {
    status.innerText = 'You WON!';
  }

  let img = document.createElement('img');
  img.src = `img/${monster.name}.svg`;
  img.alt = monster.alt;
  btn.replaceWith(img);
}



function setUpGame() {
  score = 0;
  status.innerText = '';
  playing = true;
  shuffle(monsters);
  app.innerHTML = `
  <div class="row">
    ${monsters
      .map(function (_, index) {
        return `
        <div class="grid" aria-live="polite">
          <button data-monster="${index}"><img alt="Door ${index + 1}" src="img/door.svg"></button>
        </div>`;
      })
      .join('')}
  </div>`;
}


document.addEventListener('click', clickHandler);
setUpGame();