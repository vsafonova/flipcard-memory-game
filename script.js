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
      card.classList.toggle("toggleCard");
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
  clickedCard.classList.add("flipped");

  let flippedCards = document.querySelectorAll(".flipped");

  //Logic
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("match");
      winCondition();
      flippedCards[0].style.pointerEvents = "none";
      flippedCards[1].style.pointerEvents = "none";
    } else {
      console.log("wrong");
      setTimeout(function () {
        flippedCards[0].classList.remove("toggleCard");
        flippedCards[1].classList.remove("toggleCard");
      }, 1000);
    }
    flippedCards[0].classList.remove("flipped");
    flippedCards[1].classList.remove("flipped");
  }
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
