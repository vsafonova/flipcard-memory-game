let gameContainerEl = document.querySelector("#gameContainer");
let correctGuesses = 0;
let timer = 1200;
let gameActive = true;
let gameWon = false;
let nameArray = [];
let timeArray = [];
let timeIndex = 0;
let cardsArray = [];
let neededGuesses = 0;
console.log(cardsArray);

loadPlayerData();
getData();

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
  neededGuesses = cardsArray.length / 2;
  cardsArray.sort(() => Math.random() - 0.5);
  console.log(cardsArray);
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
    console.log("match");
    winCondition();
    disablePointerEvents(selectedCards[0]);
    disablePointerEvents(selectedCards[1]);
  } else {
    console.log("wrong");
    setTimeout(function () {
      toggleCard(selectedCards[0]);
      toggleCard(selectedCards[1]);
    }, 1000);
  }
  unselectCard(selectedCards[0]);
  unselectCard(selectedCards[1]);
}

function winCondition() {
  correctGuesses += 1;
  if (correctGuesses >= neededGuesses) {
    console.log("You win");
    gameActive = false;
    storePlayerData();
  }

  console.log(correctGuesses);
  console.log(neededGuesses);
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
}

function timeConvert(timer) {
  let minutes = Math.floor(timer / 60);
  let seconds = timer - minutes * 60;
  return minutes + ":" + seconds;
}

function storePlayerData() {
  timeArray[timeIndex] = timer;
  nameArray[timeIndex] = prompt("Enter your name");
  timeIndex += 1;
  localStorage.setItem("playerTimes", JSON.stringify(timeArray));
  localStorage.setItem("playerNames", JSON.stringify(nameArray));
}

function loadPlayerData() {
  timeArray = JSON.parse(localStorage.getItem("playerTimes")) || [];
  nameArray = JSON.parse(localStorage.getItem("playerNames")) || [];
  timeIndex = timeArray.length;
  console.log(timeArray);
  console.log(nameArray);
  createScoreBoard();
}

function createScoreBoard() {
  let scoreBoardEl = document.querySelector("#scoreBoard");
  for (let i = 0; i < timeIndex; i++) {
    let userScoreEl = document.createElement("div");
    userScoreEl.innerHTML =
      "name: " + nameArray[i] + " time:" + timeConvert(timeArray[i]);
    scoreBoardEl.append(userScoreEl);
  }
}

async function getData() {
  let apiUrl = "data.json";
  try {
    let response = await fetch(apiUrl);
    let result = await response.json();
    cardsArray = result;
    shuffleCards();
    createCards();
    console.log(response);
    console.log(result);
  } catch {
    console.log("API error");
  }
}
