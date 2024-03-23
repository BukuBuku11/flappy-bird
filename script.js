document.addEventListener("DOMContentLoaded", () => {
  // --- Background ---
  const gameBackground = document.querySelector(".game-container");
  const startBtn = document.querySelector(".start-btn");

  // --- Bird Mechanics ---
  const bird = document.querySelector(".bird");
  let birdLeft;
  if (window.innerWidth < 480) {
    birdLeft = 20;
  } else {
    birdLeft = 35;
  }
  let birdBottom = 30;
  let gravity = 1;
  let isGameOver = false;
  let isGameStart = false;

  let createBarTimerID;

  // --- Bars Creation ---
  function createBars() {
    // let barBottom = 5.4;
    let barLeft;
    if (window.innerWidth < 480) {
      barLeft = 80;
    } else {
      barLeft = 65;
    }
    let barsObstacle;
    let topObstacle;

    barsObstacle = document.createElement("div");
    topObstacle = document.createElement("div");

    barsObstacle.classList.add("bars");
    topObstacle.classList.add("top-bar");

    gameBackground.appendChild(barsObstacle);
    gameBackground.appendChild(topObstacle);

    let randomBarHeight = Math.random() * -5; // Random height of bars
    let barBottom = randomBarHeight;

    barsObstacle.style.bottom = barBottom + "vh";
    topObstacle.style.top = barBottom + "vh";
    barsObstacle.style.left = barLeft + "vw";
    topObstacle.style.left = barLeft + "vw";

    function moveBar() {
      barLeft -= 2;
      barsObstacle.style.left = barLeft + "vw";
      topObstacle.style.left = barLeft + "vw";

      if (barLeft < 20 && window.innerWidth > 720) {
        clearInterval(barTimerID);
        gameBackground.removeChild(barsObstacle);
        gameBackground.removeChild(topObstacle);
      }

      if (
        (barLeft > 34.5 &&
          barLeft < 35.5 &&
          birdLeft === 35 &&
          (birdBottom < barBottom + 44 || birdBottom > barBottom + 60)) ||
        birdBottom === 0
      ) {
        gameOver();
        clearInterval(barTimerID);
      }
    }
    let barTimerID = setInterval(moveBar, 100);
  }
  if (!isGameOver) {
    createBarTimerID = setInterval(createBars, 1500);
  }

  function startGame() {
    isGameStart = true;
    bird.style.bottom = birdBottom + "vh";
    bird.style.left = birdLeft + "vw";

    if (birdBottom > -1) {
      birdBottom -= gravity;
    } else {
      gameOver();
    }
  }

  function birdJump() {
    if (birdBottom < 60) {
      birdBottom += 5;
    }
  }

  // --- Game Over ---
  let gameStartTimerID;
  const reStartBtn = document.querySelector(".restart-btn");

  function gameOver() {
    clearInterval(gameStartTimerID);
    clearInterval(createBarTimerID);
    isGameOver = true;
    highScoreList();
  }

  // --- Score Counter ---
  let counter = 0;
  const scoreValue = document.querySelector(".score-value");
  const highScoreValue = document.querySelector(".high-score-value");
  let scoreTimerID;
  function scoreStart() {
    if (isGameStart) {
      counter++;
      scoreValue.textContent = counter;
    }
    if (isGameOver) {
      clearInterval(scoreTimerID);
      highScoreValue.textContent = "HI:" + counter;
    }
  }
  scoreTimerID = setInterval(scoreStart, 500);

  // --- Highscore ---
  function highScoreList() {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(counter + 1);
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }

  // --- Responsiveness ---

  // --- Event Listeners ---
  document.addEventListener("click", birdJump);
  startBtn.addEventListener("click", () => {
    gameStartTimerID = setInterval(startGame, 100);
  });
  reStartBtn.addEventListener("click", () => {
    location.reload();
  });
});
