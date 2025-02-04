
const colorBox = document.getElementById("colorBox");
const colorOptions = document.getElementById("colorOptions");
const gameInstructions = document.getElementById("gameInstructions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let score = 0;
let targetColor = "";


function randomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

function startGame() {
    gameStatus.textContent = "";
    gameInstructions.textContent = "Guess the correct color!";

    let colors = [];
    for (let i = 0; i < 6; i++) {
        colors.push(randomColor());
    }
    

        

    targetColor = colors[Math.floor(Math.random() * 6)];
    colorBox.style.backgroundColor = targetColor;
    
 
    colorOptions.innerHTML = "";
    colors.forEach(color => {
        let button = document.createElement("button");
        button.classList.add("color-btn");
        button.style.backgroundColor = color;
        button.setAttribute("data-testid", "colorOption");
        button.addEventListener("click", () => checkGuess(color));
        colorOptions.appendChild(button);
    });
}

function checkGuess(selectedColor) {
    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct! 🎉";
        score++;
        scoreDisplay.textContent = score;
        setTimeout(startGame, 1000);
    } else {
        gameStatus.textContent = "Wrong! Try again.";
    }
}

newGameButton.addEventListener("click", startGame);


startGame();
