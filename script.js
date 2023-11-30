let gameContainerEl = document.querySelector("#gameContainer");

let cardsArray = [
  "darkness.jpg",
  "double.jpg",
  "fairy.jpg",
  "fighting.jpg",
  "fire.jpg",
  "grass.jpg",
  "lightning.jpg",
  "metal.jpg",
  "psychic.jpg",
  "water.jpg",
  "darkness.jpg",
  "double.jpg",
  "fairy.jpg",
  "fighting.jpg",
  "fire.jpg",
  "grass.jpg",
  "lightning.jpg",
  "metal.jpg",
  "psychic.jpg",
  "water.jpg",
];

function createCards() {
  //Generate the HTML
  for (let i = 0; i < cardsArray.length; i++) {
    let card = document.createElement("div");
    let face = document.createElement("img");
    let back = document.createElement("div");

    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    console.log(cardsArray[i]);
    console.log("images/" + cardsArray[i]);
    face.src = "images/" + cardsArray[i];
   //Attch the cards to the gameContainer
    gameContainerEl.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);
  }
}

function shuffleCards() {
  cardsArray.sort(() => Math.random() - 0.5);
  console.log(cardsArray);
}

shuffleCards();

createCards();

