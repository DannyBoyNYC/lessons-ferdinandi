// time stamp

// Variables
var monsters = [
    'sock!', 'monster1.svg', 'monster2.svg', 'monster3.svg', 'monster4.svg', 'monster5.svg', 'monster6.svg', 'monster7.svg', 'monster8.svg', 'monster9.svg', 'monster10.svg', 'monster11.svg'
];

var audioBg = document.querySelector('.audio-bg');
var audio = document.querySelector('.audio-lose');

var correctAnswers = 0;
var correctAnswersElem = document.querySelector('.correct-answers');
var rootElem = document.getElementById('app');
rootElem.textContent = '';

var row = document.createElement('div');
row.classList.add('row');
rootElem.prepend(row);

// methods

var shuffle = function (array) {
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

var prepMonsters = function () {
    audioBg.currentTime = 0;
    audioBg.play();

    var monsterMash = shuffle(Array.from(monsters));

    for (var i =0; i<monsterMash.length; i++){
        var monster = document.createElement('div');
        monster.classList.add('grid');
        if (monsterMash[i].lastIndexOf('.svg') !== -1){
            monster.classList.add(monsterMash[i].replace('.svg', ''));
        } else {
            monster.classList.add('sock');
        }
        row.appendChild(monster);
    }
};

var playAgain = function () {
    var playBtn = document.createElement('button');
    playBtn.setAttribute('class', 'btn');
    playBtn.innerHTML = 'Play Again?';
    playBtn.addEventListener('click', reload, false);
    document.querySelector('.boom').append(playBtn);
};

var reload = function () {
    window.location.reload();
};

var winner = function () {
    correctAnswersElem.innerText = 'You\'re a WINNER!';
    correctAnswersElem.classList.add('boom');
    rootElem.textContent = '';
    playAgain();
};


var clickListeners = function (e) {
    if (!e.target.closest('.row')) return;
    document.querySelector('h1 + p').innerText = '';
    var classes = Array.from(e.target.classList);
    if (classes[1].includes('monster')) {
        e.target.classList.add('reveal');
        correctAnswers += 1;
        if (correctAnswers === 11) {
            winner();
        } else {
            correctAnswersElem.innerText = `You've collected ${correctAnswers} monsters`;
        }
        
    } else if (classes[1].includes('sock')) {
        correctAnswersElem.innerText = 'You\'re a LOSER BABY!';
        correctAnswersElem.classList.add('boom');
        rootElem.textContent = '';
        audioBg.pause();
        audio.currentTime = 0;
        audio.play();
        playAgain();
    }
};

// event listeners and inits
prepMonsters();
document.addEventListener('click', clickListeners, false);

// scratchpad
// var image = document.createElement('img');
// image.setAttribute('src', monsterMash[i]);
// monster.appendChild(image);