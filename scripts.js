//initial value for number of squares(difficulty level)
let numberOfSquares = 9;
let colors = [];
let pickedColor;
//getting all DOM elements needed
const squares = document.querySelectorAll('.square');
const colorDisplay = document.querySelector('.color-to-guess');
const message = document.querySelector('.message');
const header = document.querySelector('header');
const resetBtn = document.querySelector('.reset-btn');
const easyBtn = document.querySelector('.easy-btn');
const mediumBtn = document.querySelector('.medium-btn');
const hardBtn = document.querySelector('.hard-btn');
const modeBtns = document.querySelectorAll('.mode');

//function initializing the game - created in order to clean up the code a little bit
function init() {
    modeButtonsSetup();
    squaresSetup();
    reset();
}

//setting up buttons responsible for selection of difficulty mode
function modeButtonsSetup() {
    for(let i = 0; i < modeBtns.length; i++) {
        //adding event listeners to buttons
        modeBtns[i].addEventListener('click', function() {
            //just in case remove 'selected' class from all buttons, so that none is highlighted
            modeBtns[0].classList.remove('selected');
            modeBtns[1].classList.remove('selected');
            modeBtns[2].classList.remove('selected');
            //and then add 'selected' class to clicked button
            this.classList.add('selected');
            //set numberOfSquares depending on the game mode that user chooses
            if(this.textContent === 'Easy') {
                numberOfSquares = 3;
            } else if(this.textContent === 'Medium') {
                numberOfSquares = 6;
            } else {
                numberOfSquares = 9;
            }
            //reset game to reflect all above changes
            reset();
        });
    }
}

//setting up squares and defining what happens when they are clicked
function squaresSetup() {
    for(let i = 0; i < squares.length; i++) {
        //set initial background colors on squares
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener('click', function() {
            //color of clicked square assigned to variable
            let clickedColor = this.style.backgroundColor;
            //check if clicked color is the same as picked color
            if(clickedColor === pickedColor) {
                message.textContent = 'Correct!';
                header.style.backgroundColor = clickedColor;
                changeColors(clickedColor);
                resetBtn.textContent = 'New Game';
            } else {
                this.style.backgroundColor = '#E8EAF6';
                this.style.boxShadow = 'none';
                this.style.cursor = 'default';
                message.textContent = 'Try again.';
            }
        });
    }
}

//reset function
function reset() {
    //generate all new colors
    colors = generateRandomColors(numberOfSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match pickedColor
    colorDisplay.textContent = pickedColor;
    //set default background color for header
    header.style.backgroundColor = '#3F51B5';
    //set reset button content back to default
    resetBtn.textContent = 'New set of colors';
    //set message back to default
    message.textContent = 'Guess above color';
    //change colors of squares
    for(let i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.boxShadow = '0 1px 3px 1px rgba(0,0,0,0.4)';
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = 'none';
        }
        squares[i].style.backgroundColor = colors[i];
    }
}

//event listener for reset button triggerring above reset function
resetBtn.addEventListener('click', function() {
    reset();
});

//generates random RGB color and returns it
function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

//generated random color is pushed to array "num" times, depending on amount of squares(difficulty mode)
//colors obviously are different with every iteration
function generateRandomColors(num) {
    //make an array
    let arr = [];
    //repeat num times
    for(let i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor());
    }
    //return array with randomColors
    return arr;
}

//function returns a color to guess from within the colors array
//numberOfSquares controls function, so that it will pick a color only from array range
function pickColor() {
    let random = Math.floor(Math.random() * numberOfSquares);
    return colors[random];
}

//changing colors of squares(used when correct square is clicked and all squares change background using this function)
function changeColors(color) {
    //loop through all squares
    for(let i = 0; i < squares.length; i++) {
        //set background color of all squares to match clicked(correct) square background
        squares[i].style.backgroundColor = color;
        squares[i].style.cursor = 'pointer';
        squares[i].style.boxShadow = '0 1px 3px 1px rgba(0,0,0,0.4)';
    }    
}

//set up the game
init();
