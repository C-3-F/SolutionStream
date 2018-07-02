/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores = [0, 0];
var roundScore = 0;
var currentPlayer = 0;

var dice = 0;
newGame();

function newGame() {
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  scores[0] = 0;
  scores[1] = 0;
  roundScore = 0;
  currentPlayer = 0;
  dice = 0;
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.btn-roll').classList.add('btn-active');
  document.querySelector('.btn-hold').classList.add('btn-active');
  document.querySelector('.btn-roll').classList.remove('btn-disabled');
  document.querySelector('.btn-hold').classList.remove('btn-disabled');
  document.querySelector('.btn-roll').disabled = false;
  document.querySelector('.btn-hold').disabled = false;
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('#name-0').innerHTML = 'PLAYER 1';
  document.querySelector('#name-1').innerHTML = 'PLAYER 2';
}

function roll() {
  dice = Math.floor(Math.random() * 6) + 1;
}

function switchPlayer() {
  scores[currentPlayer] += roundScore;
  document.querySelector('#score-' + currentPlayer).innerHTML = scores[currentPlayer];
  if (currentPlayer == 0) {
    currentPlayer = 1;
  } else {
    currentPlayer = 0;
  }
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.player-0-panel').classList.toggle('active');
  roundScore = 0;
}

function winner() {
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
  document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
  document.querySelector('#name-' + currentPlayer).innerHTML = 'WINNER';
  scores[currentPlayer] += roundScore;
  document.querySelector('#score-' + currentPlayer).innerHTML = scores[currentPlayer];
  document.querySelector('#current-' + currentPlayer).innerHTML = '0';
  document.querySelector('.btn-roll').disabled = true;
  document.querySelector('.btn-hold').disabled = true;
  document.querySelector('.btn-roll').classList.toggle('btn-active');
  document.querySelector('.btn-hold').classList.toggle('btn-active');
  document.querySelector('.btn-roll').classList.toggle('btn-disabled');
  document.querySelector('.btn-hold').classList.toggle('btn-disabled');
}

document.querySelector('#current-' + currentPlayer).innerHTML = dice;
document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', () => {
  roll();
  console.log('roll' + dice);
  var diceDom = document.querySelector('.dice');
  diceDom.style.display = 'block';
  diceDom.src = 'dice-' + dice + '.png';

  if (dice === 1) {
    document.querySelector('#current-' + currentPlayer).innerHTML = '0';
    roundScore = 0;
    this.switchPlayer();
  } else {
    roundScore += dice;
    document.querySelector('#current-' + currentPlayer).innerHTML = roundScore;
    if (roundScore + scores[currentPlayer] >= 30) {
      winner();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  document.querySelector('#current-' + currentPlayer).innerHTML = '0';
  this.switchPlayer();
});

document.querySelector('.btn-new').addEventListener('click', newGame);
