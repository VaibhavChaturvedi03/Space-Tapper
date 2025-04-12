const spaceship = document.getElementById("spaceship");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let gravity = 0.5;
let lift = -8;
let velocity = 0;
let spaceshipY = window.innerHeight / 2;

let score = 0;
let obstacleX = window.innerWidth;
let obstacleY = Math.random() * (window.innerHeight - 100);

let gameRunning = true;

document.body.addEventListener("keydown", (e) => {
    if (e.code === "Space") velocity = lift;
});
document.body.addEventListener("click", () => {
    velocity = lift;
});

function gameOver() {
    gameRunning = false;

    // Show game over screen
    const gameOverScreen = document.getElementById("game-over");
    const finalScore = document.getElementById("final-score");

    finalScore.textContent = `Your Score: ${score}`;
    gameOverScreen.style.display = "block";
}


function update() {
    if (!gameRunning) return;

    velocity += gravity;
    spaceshipY += velocity;

    // Prevent going off screen
    if (spaceshipY < 0) spaceshipY = 0;

    if (spaceshipY > window.innerHeight - 30) {
        spaceshipY = window.innerHeight - 30;
        gameOver(); // End game if spaceship touches the ground
    }


    spaceship.style.top = spaceshipY + "px";

    // Move obstacle
    obstacleX -= 6;
    if (obstacleX < -50) {
        obstacleX = window.innerWidth;
        obstacleY = Math.random() * (window.innerHeight - 100);
        score++;
        scoreDisplay.textContent = "Score: " + score;
    }
    obstacle.style.left = obstacleX + "px";
    obstacle.style.top = obstacleY + "px";

    // Collision detection
    const shipRect = spaceship.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();

    if (
        shipRect.left < obsRect.right &&
        shipRect.right > obsRect.left &&
        shipRect.top < obsRect.bottom &&
        shipRect.bottom > obsRect.top
    ) {
        gameOver();
        return;
    }

    requestAnimationFrame(update);
}

update();
