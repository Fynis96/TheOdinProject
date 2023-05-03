let pcScore = 0;
let cpScore = 0;
let round = 0;
let gameOver = false;


function computerPlay() {
    let randomNumber = Math.floor(Math.random()*3) + 1;
    if(randomNumber === 1){
        return 'Rock';
    }
    else if(randomNumber === 2){
        return 'Paper';
    }
    else if(randomNumber === 3){
        return 'Scissors';
    }
}


function play(pc, cp) {
    if (pc === 'Rock' && cp === 'Scissors' || pc === 'Paper' && cp === 'Rock' || pc === 'Scissors' && cp === 'Paper') {
        console.log("Congratulations, you beat the guy.");
        pcScore++;
        divScore.innerHTML = 'Score: ' + pcScore.toString();
        if(pcScore >= 5){
            divResult.innerHTML = 'Player Wins!';
        }
        return 'win';
    }
    else if(cp === 'Rock' && pc === 'Scissors' || cp === 'Paper' && pc === 'Rock' || cp === 'Scissors' && pc === 'Paper'){
        console.log("No win here brother.");
        cpScore++;
        return 'lose';
    }
    else if(pc ==='Rock' && cp === 'Rock' || pc ==='Paper' && cp === 'Paper' || pc === 'Scissors' && cp === 'Scissors'){
        console.log("Y'all chose the same thing");
        return 'tie';
    }
}




document.querySelector(".buttonbox").addEventListener('click', function(event){
    //console.log(event);
    if(event.target.innerHTML === 'Rock'){
        play('Rock', computerPlay());
        console.log('rock');
    }
    else if(event.target.innerHTML === 'Paper'){
        play('Paper', computerPlay());
        console.log('paper');
    }
    else if(event.target.innerHTML === 'Scissors'){
        play('Scissors', computerPlay());
        console.log('scissors');
    }
})

const divScore = document.querySelector('.score');
const divResult = document.querySelector('.results');


//Function checkScore(p1, p2)
//For styles, the pc/cp are huddled around big blackjack looking table which holds scoreboard, and the hands when they move forward. Uss CSS transition to push those forward nicely from both sides
//add a win condition with the score, like a 2 out of 3 kind of situation so that it doesn't just go on infinitely
