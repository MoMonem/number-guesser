// game functions
// 1. must guess a num between a min and a max
// 2. player gets a certain nummber of guesses
// 3. Notify players of the number of guesses remaining
// 4. Notify the player of the correct answer if lose
// 5. let player choose to play again

// UI elements
const inputField = document.querySelector("#guess-input"),
  submitButton = document.querySelector("#guess-btn"),
  playAgainButton = document.querySelector("#play-again-btn"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  message = document.querySelector(".message"),
  game = document.querySelector("#game");

// Event listeners
document.addEventListener("DOMContentLoaded", setMinMax);
submitButton.addEventListener("click", guessNumber);
playAgainButton.addEventListener("click", function (e) {
  submitButton.style.display = "block";
  playAgainButton.style.display = "none";
  document.location.reload();
});

// Variables
let min = Math.floor(Math.random() * 10),
  max = min + Math.floor(Math.random() * 10),
  attempts = 0,
  theNum = randomIntFromInterval(min, max);

console.log(theNum);
// functions
function setMinMax() {
  minNum.textContent = min;
  maxNum.textContent = max;
  playAgainButton.style.display = "none";
}

function guessNumber(e) {
  attempts += 1;

  if (
    inputField.value < min ||
    inputField.value > max ||
    inputField.value == null ||
    isNaN(inputField.value)
  ) {
    attempts -= 1;
    message.textContent =
      "You added a number that is out of range. Enter a new number!";
  } else if (attempts == 3) {
    inputField.disabled = true;
    // submitButton.disabled = true;
    message.textContent = `You lost, the correct number is ${theNum}`;
    submitButton.style.display = "none";
    playAgainButton.style.display = "inline-block";
  } else {
    resultDecoration();
  }
  inputField.value = "";
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function resultDecoration() {
  if (inputField.value == theNum) {
    inputField.style.borderColor = "green";
    message.style.color = "green";
    inputField.disabled = true;
    // submitButton.disabled = true;
    message.textContent = "That is correct, you won. Congrats!";
    submitButton.style.display = "none";
    playAgainButton.style.display = "inline-block";
  } else {
    inputField.style.borderColor = "red";
    message.style.color = "red";
    message.textContent = `${inputField.value} is incorrect, you have ${
      3 - attempts
    } attempts left`;
  }
}
