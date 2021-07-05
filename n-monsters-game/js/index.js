import shuffle from './shuffle.js';
import {monsters} from './monsters.js';

const app = document.querySelector('#app');

function createBoard() {
  const shuffledMonsters = shuffle(monsters);
  const monstersElem = shuffledMonsters
    .map( (_, index) => `
      <div class="grid" data-index="${index}" aria-live="polite">
        <button>
          <img src="img/door.svg" alt="closed door" />
        </button>
      </div>
    `,
    ).join('');

  app.innerHTML = `<div class="row">${monstersElem}</div>`;
}

function displayMonster(event){
  if(!event.target.matches('.grid img')) return;
  const monsterNum = event.target.closest('[data-index]').dataset.index;
  const elem = document.querySelector(`[data-index="${monsterNum}"]`);
  const monster = monsters[monsterNum];
  elem.innerHTML = `<img src="img/${monster.name}.svg" alt="${monster.alt}" />`;
}

document.addEventListener('click', displayMonster);
createBoard();
