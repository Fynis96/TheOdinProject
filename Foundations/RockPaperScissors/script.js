let pcScore = 0;
let cpScore = 0;
let round = 0;
let gameOver = false;

const spanPcScore = document.querySelector('.player-score');
const spanCpScore = document.querySelector('.computer-score');
const divResult = document.querySelector('.results');

function computerPlay() {
    const options = ['Rock', 'Paper', 'Scissors'];
    const randomNumber = Math.floor(Math.random() * options.length);
    return options[randomNumber];
}

function disableButtons() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.disabled = true;
        button.classList.add('disabled');
    });
}

function enableButtons() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.disabled = false;
        button.classList.remove('disabled');
    });
}

function play(pc, cp) {
    if (gameOver) {
        return;
    }

    if (pc === cp) {
        showMessage("Y'all chose the same thing");
        return 'tie';
    }

    const playerWins = (pc === 'Rock' && cp === 'Scissors') ||
        (pc === 'Paper' && cp === 'Rock') ||
        (pc === 'Scissors' && cp === 'Paper');

    if (playerWins) {
        showMessage("Congratulations, you beat the guy.");
        pcScore++;
        spanPcScore.textContent = pcScore;
        if (pcScore >= 5) {
            divResult.textContent = 'Player Wins!';
            gameOver = true;
            disableButtons();
            toggleReplayButton(true);
        }
        return 'win';
    }

    showMessage("Computer Wins.");
    cpScore++;
    spanCpScore.textContent = cpScore;
    if (cpScore >= 5) {
        divResult.textContent = 'Computer Wins!';
        gameOver = true;
        disableButtons();
        toggleReplayButton(true);
    }
    return 'lose';
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

function toggleReplayButton(show) {
    const replayButton = document.querySelector('.replay-button');
    replayButton.classList.toggle('hidden', !show);
}

function resetGame() {
    pcScore = 0;
    cpScore = 0;
    gameOver = false;
    spanPcScore.textContent = '0';
    spanCpScore.textContent = '0';
    divResult.textContent = 'Take your pick.';
    enableButtons();
    toggleReplayButton(false);
}

function handleReplayClick() {
    resetGame();
    showMessage("New game started. Good luck!");
}

document.querySelector(".buttonbox").addEventListener('click', handleButtonClick);
document.querySelector('.replay-button').addEventListener('click', handleReplayClick);