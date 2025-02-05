/* Color Guessing Game - Vanilla JavaScript */

// Select elements
const colorBox = document.getElementById("colorBox");
const colorOptions = document.getElementById("colorOptions");
const gameInstructions = document.getElementById("gameInstructions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let score = 0;
let targetColor = "";

// Generate random RGB color
function randomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

// Generate a similar but slightly different color
function similarColor(baseColor) {
    const [r, g, b] = baseColor.match(/\d+/g).map(Number);
    return `rgb(${Math.min(Math.max(r + Math.floor(Math.random() * 80 - 40), 0), 255)}, ${Math.min(Math.max(g + Math.floor(Math.random() * 80 - 40), 0), 255)}, ${Math.min(Math.max(b + Math.floor(Math.random() * 80 - 40), 0), 255)})`;
}

// Start new game
function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    resetGame();
}

function resetGame() {
    gameStatus.textContent = "";
    gameInstructions.textContent = "Guess the correct color!";

    // Generate color options
    const baseColor = randomColor();
    let colors = [baseColor];
    for (let i = 1; i < 6; i++) {
        colors.push(similarColor(baseColor));
    }

    // Shuffle colors array
    colors = colors.sort(() => Math.random() - 0.5);

    // Select random target color from the shuffled array
    targetColor = colors[Math.floor(Math.random() * 6)];
    colorBox.style.backgroundColor = targetColor;

    // Display color options
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

// Check if selected color is correct
function checkGuess(selectedColor) {
    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct! 🎉";
        score++;
        scoreDisplay.textContent = score;
        setTimeout(resetGame, 1000);
    } else {
        gameStatus.textContent = "Wrong! Try again.";
    }
}

// Event listener for new game button
newGameButton.addEventListener("click", startGame);

// Initialize game
startGame();
