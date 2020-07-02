const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard = null, secondCard = null;
let lockBoard = false;

function flipCard() {
  if(lockBoard) return;
  if(firstCard === this) return;
  this.classList.toggle("flip");

  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  if(firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
    checkForCompletion();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
    firstCard = secondCard = null;
  }, 1000);
}

function resetBoard() {
  hasFlippedCard = lockBoard = false;
}

function checkForCompletion() {
  // console.log(cards);
  // console.log(Array.from(cards));
  // console.log(cards.every(card => card.classList.contains("flip")));
  if(Array.from(cards).every(card => card.classList.contains("flip"))) {
    setTimeout(() => {
      alert("Congratulations...");
      return false;
    }, 1500);
    return false;
  }
}

(function shuffle() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  })
})();



cards.forEach(card => card.addEventListener("click", flipCard));