// Variables
var monsters = [
  'sock',
  'monster1',
  'monster2',
  'monster3',
  'monster4',
  'monster5',
  'monster6',
  'monster7',
  'monster8',
  'monster9',
  'monster10',
  'monster11',
];

var audioBg = document.querySelector('.audio-bg');
var audio = document.querySelector(`.audio-lose`);

var correctAnswers = 0;
var correctAnswersElem = document.querySelector('.correct-answers');
var rootElem = document.getElementById('app');

var row = document.createElement('ul');
row.classList.add('row');
rootElem.prepend(row);

// methods
var shuffle = function(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

var prepMonsters = function() {
  audioBg.currentTime = 0;
  audioBg.play();

  var monsterMash = shuffle(monsters);

  row.innerHTML = monsterMash
    .map((monster, index) => {
      return `<li class="grid" aria-live="polite">
        <button><img src="img/door.svg" data-monster-id=${index} alt="Click on a door to see what\'s behind it" /></button>
      </li>`;
    })
    .join('');
};

var playAgain = function() {
  var playBtn = document.createElement('button');
  playBtn.setAttribute('class', 'btn');
  playBtn.innerText = 'Play Again?';
  playBtn.addEventListener('click', reload, false);
  document.querySelector('.boom').after(playBtn);
};

var reload = function() {
  window.location.reload();
};

var winner = function() {
  correctAnswersElem.innerText = `You're a WINNER!`;
  correctAnswersElem.classList.add('boom');
  rootElem.textContent = '';
  playAgain();
};

var clickListeners = function() {
  var monster = event.target.closest('[data-monster-id]');
  if (!monster) return;

  var id = monster.getAttribute('data-monster-id');
  monster.parentNode.innerHTML = `<img alt="${monsters[id]}" src="img/${monsters[id]}.svg" />`;
  console.log(monsters[id]);
  if (monsters[id] !== 'sock') {
    if (correctAnswers === 11) {
      winner();
    } else {
      correctAnswers += 1;
      correctAnswersElem.innerText = `You've collected ${correctAnswers} monsters`;
    }
  } else if (monsters[id] === 'sock') {
    correctAnswersElem.innerText = `You're a LOSER BABY!`;
    correctAnswersElem.classList.add('boom');
    audioBg.pause();
    audio.currentTime = 0;
    audio.play();
    playAgain();
  }
};

// event listeners and inits
prepMonsters();
document.addEventListener('click', clickListeners, false);
