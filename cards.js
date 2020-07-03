const mainContainer = document.querySelector(".memory-game");
const pageHeading = document.querySelector(".page-heading");
const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard = null, secondCard = null;
let lockBoard = false;

const data = [["Writing", "Embroidery", "Drawing & Painting", "Singing", "Room Cleaning", "Learning"], ["Tirunelveli", "Sikkim", "Bangalore", "Chennai", "Pondicherry", "Manali"], ["Kulfi Ice cream", "Pani Puri", "Panneer Manchurian", "Milagu Rasam", "Cotton Candy", "Curd Rice"], ["Miffy & Frnds", "Happy Box", "Ear Rings", "PikNik", "Filter Kaapi", "Nature"], ["Mutta Kanni", "Baby Ma", "Chamathu Ponnu", "Papa", "Gayu", "Angry Bird"], ["Dora", "Deivam Thandha Veedu", "Milk Skin", "Eyeliner Smudges", "Power Cut", "Fake Frnds"], ["Kitchen Set", "Greeting Card", "Barbie Doll", "Gee Boom Ba", "Malli Poo", "Balavikas"], ["5 W's", "Live Learn Explore", "Help Ever, Hurt Never", "Ceilings on desire", "Appreciate Life", "Cry and Comeback"], ["Amma Venum", "Mammu Sapten", "Thachiko", "I love you ma", "Aiyooo", "Daddy is my best frnd"], ["Richard Parker", "Childhood Gang", "Red Star", "Arangeram", "Cash Prizes", "Night Owl"], ["Amma", "Amma", "Amma", "Amma", "Amma", "Amma"], ["trust", "respect", "admire", "love", "celebrate", "miss"]];

const headings = ["Hobbies", "Places", "Food", "Likes", "Names", "Dislikes", "Experience", "Life Quotes", "Dialogues", "Highlights", "Love of my life", "I ____ you"];
let step = 0;


function loadCards() {
  console.log([...data, ...data]);
  let cardsHTML = "";
  let totalCardOptions = [...data[step], ...data[step]];
  for(let i = 0; i < totalCardOptions.length; i++) {
    cardsHTML += `<section class="memory-card" data-framework=${totalCardOptions[i]} onclick="flipCard(this)">
      <div class="front-face">${totalCardOptions[i]}</div>
      <img class="back-face" src="./images/badge.png">
    </section>`;
  }
  mainContainer.innerHTML = cardsHTML;
  pageHeading.innerHTML = headings[step];
  shuffle();
}

loadCards();

function flipCard(cardElement) {
  console.log("flip card");
  console.log(cardElement);
  if(lockBoard) return;
  if(firstCard === cardElement) return;
  cardElement.classList.toggle("flip");

  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = cardElement;
  } else {
    hasFlippedCard = false;
    secondCard = cardElement;
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
  firstCard = null, secondCard = null;
  hasFlippedCard = lockBoard = false;
}

function checkForCompletion() {
  // console.log(cards);
  // console.log(Array.from(cards));
  // console.log(cards.every(card => card.classList.contains("flip")));
    const cards = document.querySelectorAll(".memory-card");
    if(Array.from(cards).every(card => card.classList.contains("flip"))) {
      if(data.length-1 === step) {
        setTimeout(() => {
          alert("Thank you padips..");
          return false;
        }, 1500);
        return false;
      } else {
        setTimeout(() => {
          step++;
          loadCards();
        }, 2000);
      }
    }
}

function shuffle() {
  const cards = document.querySelectorAll(".memory-card");
  cards.forEach(card => {
    console.log("random style order");
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
    console.log(card);
  })
}

// cards.forEach(card => card.addEventListener("click", flipCard));
