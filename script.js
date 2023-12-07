let gameContainerEl = document.querySelector("#gameContainer");
let startContainerEl = document.querySelector("#startContainer");
let nameInputEl = document.querySelector("#nameInput");
let startButtonEl = document.querySelector("#startButton");
let formEl = document.querySelector("#form");

let userName = "";

let gameWon = false;
let gameActive = false;

let correctGuesses = 9;
let neededGuesses = 0;

const maxTime = 500;
const endTimeout = 5000;
let timer = maxTime;

let cardsArray = [];

let scoreData = [];
loadPlayerData();
//loadPlayerData();

//Card generator Function
function createCards() {
  //Generate the HTML
  for (let i = 0; i < cardsArray.length; i++) {
    let card = document.createElement("div");
    let face = document.createElement("img");
    let back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Attach the info to the cards
    face.src = cardsArray[i].url;
    card.setAttribute("name", cardsArray[i].name);
    //Attch the cards to the gameContainer
    gameContainerEl.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", function (e) {
      toggleCard(card);
      compareCards(e);
    });
  }
}

function shuffleCards() {
  cardsArray = cardsArray.concat(cardsArray);
  cardsArray.sort(() => Math.random() - 0.5);
}

//Check cards
function compareCards(e) {
  let clickedCard = e.target;
  selectCard(clickedCard);

  let selectedCards = document.querySelectorAll(".selected");

  //Logic
  if (selectedCards.length !== 2) {
    return;
  }
  if (checkEqualCards(selectedCards[0], selectedCards[1])) {
    winCondition();
    disablePointerEvents(selectedCards[0]);
    disablePointerEvents(selectedCards[1]);
  } else {
    setTimeout(function () {
      if (gameActive === false) {
        return;
      }
      toggleCard(selectedCards[0]);
      toggleCard(selectedCards[1]);
    }, 1000);
  }
  unselectCard(selectedCards[0]);
  unselectCard(selectedCards[1]);

  console.log(correctGuesses);
  console.log(neededGuesses);
}

function winCondition() {
  correctGuesses += 1;
  if (correctGuesses >= neededGuesses) {
    gameActive = false;
    storePlayerData()
    setTimeout(resetGame, endTimeout);
  }
}

window.setInterval(gameTimer, 1000);

function disablePointerEvents(card) {
  card.style.pointerEvents = "none";
}

function selectCard(card) {
  card.classList.add("selected");
}

function unselectCard(card) {
  card.classList.remove("selected");
}

function toggleCard(card) {
  card.classList.toggle("toggleCard");
}

function addToggleCard(card) {
  card.classList.add("toggleCard");
}

function checkEqualCards(card1, card2) {
  return card1.getAttribute("name") === card2.getAttribute("name");
}

function gameTimer() {
  if (gameActive === false) {
    return;
  }
  timer -= 1;

  let timerEl = document.querySelector("#gameTimer");
  timerEl.innerHTML = "Timer: " + timeConvert(timer);
  if (timer <= 0) {
    endGame();
  }
}

function endGame() {
  gameActive = false;
  let cardEl = document.querySelectorAll(".card");
  for (let i = 0; i < cardEl.length; i++) {
    addToggleCard(cardEl[i]);
  }
  setTimeout(resetGame, endTimeout);
}

function timeConvert(timer) {
  let minutes = Math.floor(timer / 60);
  let seconds = timer - minutes * 60;
  return minutes + ":" + seconds;
}

function storePlayerData() {
  scoreData.push({ time: timer, name: userName });
  scoreData.sort((b, a) => b.time - a.time);
  localStorage.setItem("scores", JSON.stringify(scoreData));
  createScoreBoard()

  console.log(scoreData);
}

function loadPlayerData() {
  scoreData = JSON.parse(localStorage.getItem("scores")) || [];
  console.log(scoreData);
  createScoreBoard()
}

function createScoreBoard() {
  clearScoreBoard();
  let scoreBoardEl = document.querySelector("#scoreBoard");
  for (let i = 0; i < scoreData.length; i++) {
    let userScoreEl = document.createElement("div");
    userScoreEl.classList.add("score");
    userScoreEl.innerHTML =
      "Name: " + scoreData[i].name + " Time: " + timeConvert(scoreData[i].time);
    scoreBoardEl.append(userScoreEl);
  }
}

function clearScoreBoard() {
  let scores = document.querySelectorAll(".score");
  for (let i = 0; i < scores.length; i++) {
    scores[i].remove();
  }
}

async function getData() {
  let apiUrl = "data.json";
  try {
    let response = await fetch(apiUrl);
    let result = await response.json();
    cardsArray = result;
    neededGuesses = cardsArray.length;
    startGame();
  } catch {
    console.log("API error");
  }
}

function resetGame() {
  let card = document.querySelectorAll(".card");
  console.log(card);
  for (let i = 0; i < card.length; i++) {
    card[i].remove();
  }
  timer = maxTime;
  startContainerEl.classList.remove("start-container-hidden");
}

function startGame() {
  gameActive = true;
  correctGuesses = 9;
  shuffleCards();
  createCards();
}

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  userName = nameInputEl.value;
  getData();
  startContainerEl.classList.add("start-container-hidden");
});


