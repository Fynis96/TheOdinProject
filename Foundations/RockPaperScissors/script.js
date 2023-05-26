let pcScore = 0;
let cpScore = 0;
let round = 0;
let gameOver = false;

function computerPlay() {
  const options = ['Rock', 'Paper', 'Scissors'];
  const randomNumber = Math.floor(Math.random() * options.length);
  return options[randomNumber];
}

function play(pc, cp) {
  if (
    (pc === 'Rock' && cp === 'Scissors') ||
    (pc === 'Paper' && cp === 'Rock') ||
    (pc === 'Scissors' && cp === 'Paper')
  ) {
    showMessage("Congratulations, you beat the guy.");
    pcScore++;
    divScore.textContent = `Player Score: ${pcScore} | Computer Score: ${cpScore}`;
    if (pcScore >= 5) {
      divResult.textContent = 'Player Wins!';
    }
    return 'win';
  } else if (
    (cp === 'Rock' && pc === 'Scissors') ||
    (cp === 'Paper' && pc === 'Rock') ||
    (cp === 'Scissors' && pc === 'Paper')
  ) {
    showMessage("Computer Wins.");
    cpScore++;
    return 'lose';
  } else if (
    (pc === 'Rock' && cp === 'Rock') ||
    (pc === 'Paper' && cp === 'Paper') ||
    (pc === 'Scissors' && cp === 'Scissors')
  ) {
    showMessage("Y'all chose the same thing");
    return 'tie';

    const playerScoreElement = document.querySelector('.player-score');
  playerScoreElement.textContent = playerScore;

    const computerScoreElement = document.querySelector('.computer-score');
  computerScoreElement.textContent = computerScore;
  }
}

function handleButtonClick(event) {
  const choice = event.target.innerHTML;
  play(choice, computerPlay());
  console.log(choice.toLowerCase());
}

function showMessage(message) {
  const messageBox = document.querySelector('.message');
  messageBox.textContent = message;
}

document.querySelector(".buttonbox").addEventListener('click', handleButtonClick);

const divScore = document.querySelector('.score');
const divResult = document.querySelector('.results');