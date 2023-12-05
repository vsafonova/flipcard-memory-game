let gameContainerEl = document.querySelector("#gameContainer");
let correctGuesses = 0;
let cardsArray = [
  {
    name: "Darkness",
    url: "darkness.jpg",
  },
  {
    name: "double",
    url: "double.jpg",
  },
  {
    name: "fairy",
    url: "fairy.jpg",
  },
  {
    name: "fighting",
    url: "fighting.jpg",
  },
  {
    name: "fire",
    url: "fire.jpg",
  },
  {
    name: "grass",
    url: "grass.jpg",
  },
  {
    name: "lightning",
    url: "lightning.jpg",
  },
  {
    name: "metal",
    url: "metal.jpg",
  },
  {
    name: "psychic",
    url: "psychic.jpg",
  },
  {
    name: "water",
    url: "water.jpg",
  },
];
cardsArray = cardsArray.concat(cardsArray);
let neededGuesses = cardsArray.length / 2;

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
    face.src = "images/" + cardsArray[i].url;
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
  }

  console.log(correctGuesses);
  console.log(neededGuesses);
}

shuffleCards();

createCards();

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

function checkEqualCards(card1, card2) {
  return card1.getAttribute("name") === card2.getAttribute("name");
}
