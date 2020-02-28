const cards = document.querySelectorAll('.card');

let klikOnce = false;
let lockBoard = false;
let firstCard, secondCard;
var namaInput= document.getElementById("form")

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!klikOnce) {
    // first click
    klikOnce = true;
    firstCard = this;
    // console.log(this)
    return;
  }

  // second click
  secondCard = this;
  // console.log(this)

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.nama === secondCard.dataset.nama;

  if( isMatch)
  {
    disableCards();
  }
  else{
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [klikOnce, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

