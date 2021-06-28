const app = document.querySelector('#app');

/* eslint-disable no-param-reassign */
const monsters = [
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
  'sock',
];

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function dsiplayShuffledMonsters() {
  const shuffledMonsters = shuffle(monsters);
  const monstersElem = shuffledMonsters
    .map(
      (monster, index) => `
      <div class="grid"><img src="img/${monster}.svg" alt="shuffled monster number ${index}" /></div>
    `,
    )
    .join('');
  app.innerHTML = `<div class="row">${monstersElem}</div>`;
}

dsiplayShuffledMonsters();
