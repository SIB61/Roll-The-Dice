
const gameView = {
  gameBoard: document.getElementById("game-board"),
  circles: document.querySelectorAll(".box>div"),
  playButton: document.getElementById("play-button"),
  scoreText: document.getElementById("score"),
  target:document.getElementById("target"),
  modal: document.getElementById("modal-body"),
  remainingAttempt: document.getElementById("attempt-remaining"),
  modalTitle: document.getElementById("modal-title"),
  modalSubtitle: document.getElementById("modal-subtitle"),
  modalButton:document.getElementById("modal-button"),
  maxAttempt: document.getElementById("max-attempt"),
  level: document.getElementById("level")
};

let game = {
  level: 1,
  maxAttempt: setMaxAttempt(),
  target: setTarget(),
  score: 0,
  attemptCount: 0,
};

setRemainingAttempt();

gameView.playButton.addEventListener("click", (e) => {
  onPlayButtonClick();
});

function onPlayButtonClick() {
  makeAttempt();
  const randomNumber = Math.ceil(Math.random() * 5);
  const newScore = game.score + randomNumber;
  if (newScore <= game.target) {
    addCircle(randomNumber);
    countScore(randomNumber);
    if (newScore == game.target) {
      showPopup(
        "Well Played! Win Win Win!",
        `Target achieved with ${game.maxAttempt - game.attemptCount} attempts remaining`,
        "Next Level"
      );
      levelUp();
    }
  }

  if (game.attemptCount >= game.maxAttempt && newScore != game.target) {
    showPopup("Unfortunate! Try Again", "Better luck next time", "Play Again");
  }
}

gameView.modalButton.addEventListener("click", (e) => {
  toggleModal();
  restartGame();
});

function makeAttempt() {
  game.attemptCount++;
  setRemainingAttempt(game.maxAttempt - game.attemptCount);
}

function showPopup(title, subtitle, buttonText) {
  toggleModal();
  console.log(title, subtitle, buttonText);
  gameView.modalTitle.innerText = title;
  gameView.modalSubtitle.innerText = subtitle;
  gameView.modalButton.innerText = buttonText;
}

function setMaxAttempt() {
  const maxAttemptCount = Math.floor(Math.random() * 25);
  if (maxAttemptCount == 0)
  showPopup("Unfortunate! Try Again", "Better luck next time", "Play Again");
  gameView.maxAttempt.innerText = maxAttemptCount;
  return maxAttemptCount;
}

function setRemainingAttempt(){
  gameView.remainingAttempt.innerText = game.maxAttempt - game.attemptCount;
}

function setTarget() {
  let targetScore = 25 + Math.floor(Math.random() * 25);
  gameView.circles[targetScore - 1].innerHTML = `<img style="opacity:0.7" src="./goal.svg" alt="">`;
  gameView.target.innerText = targetScore;
  return targetScore;
}

function resetTarget() {
  if (game.target) gameView.circles[game.target - 1].innerHTML = ``;
  return setTarget();
}

function restartGame() {
  game.maxAttempt = setMaxAttempt();
  game.attemptCount = 0;
  setRemainingAttempt(game.maxAttempt);
  game.target = resetTarget();
  game.score = 0;
  gameView.scoreText.innerText = "0"
  gameView.circles.forEach((element) => element.classList.remove("circle","animate-1","animate-2","animate-3","animate-4","animate-5"));
}

function levelUp() {
  game.level++;
  gameView.level.innerText = game.level;
}

function addCircle(circleCount) {
  for (let i = game.score; i < game.score + circleCount; i++) {
    gameView.circles[i].classList.add("circle", `animate-${i - game.score + 1}`);
  }
}

function countScore(count) {
  game.score += count;
  gameView.scoreText.innerText = game.score;
}

function toggleModal() {
  gameView.modal.classList.toggle("hide");
}

