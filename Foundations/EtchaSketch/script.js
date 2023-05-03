// TODO: Finish functionality for all buttons
// TODO: add style to the page, spruce it up a bit



let color = 'black'
let Clicked = true;


function populateBoard(size) 
{
    let board = document.querySelector('.grid');
    let squares = board.querySelectorAll("div");
    squares.forEach((div) => div.remove());
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    board.style.gridTemplateRows = `repeat(${size} , 1fr)`

    let amount = size * size;
    for(let i = 0; i < amount; i++)
    {
        let square = document.createElement('div');
        square.style.backgroundColor = 'white';
        square.addEventListener('mouseover', (e) => { if (Clicked == true){square.style.backgroundColor = color;}}); //Add a Clicked bool to toggle painting on and off
        board.insertAdjacentElement('beforeend', square);
    }

}

function changeSize(input)
{   
    if (input >= 4 & input <= 80)
    {
        populateBoard(input)
    }
    else
    {
        console.log('too much or too little')
    }
}

populateBoard(16);


function clicked()
{
    if (Clicked == true)
    {
        Clicked = false;
    }
    else
    {
        Clicked = true;
    }
}