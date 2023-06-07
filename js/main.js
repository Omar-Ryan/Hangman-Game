// letters
const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  span.className = "letter-box";
  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);
  lettersContainer.appendChild(span);
});
// object of words + categories
const words = {
  programing: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "prestige",
    "inception",
    "parasite",
    "interstellar",
    "whiplash",
    "memento",
    "coco",
    "up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
// get random property
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
// category words
let randomPropValue = words[randomPropName];
// random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];
// set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;
//+ " " + randomValueValue ;
//
// select letter guess
let lettersGuessContainer = document.querySelector(".letters-guess");
// convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);
// create span depend on word
lettersAndSpace.forEach((letter) => {
  //empty span
  let emptySpan = document.createElement("span");
  if (letter === " ") {
    emptySpan.className = "with-space";
  }
  lettersGuessContainer.appendChild(emptySpan);
});

// select guess span
let guessSpan = document.querySelectorAll(".letters-guess span");

// set Wrong Attempts
let wrongAttempts = 0;

// set correct Attempts
let correctAttempts = 0;

// select the Draw Element
let theDraw = document.querySelector(".hangman-draw");

// handle clicking on letters
document.addEventListener("click", (e) => {
  // set the Chose status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    // get click letter
    let theClickLetter = e.target.innerHTML.toLowerCase();
    //the chosen word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      if (theClickLetter === wordLetter) {
        // set Status To Correct
        theStatus = true;

        // loop on all guess spans
        guessSpan.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickLetter;
          }
        });
        // If letter is correct
        if (theStatus === true) {
          // increase the wrong attempts
          correctAttempts++;
          if (correctAttempts === theChosenWord.length) {
            stepGame();
            lettersContainer.classList.add("correct");
          }
        }
      }
    });

    // outside Loop

    // If letter is wrong
    if (theStatus !== true) {
      // increase the wrong attempts
      wrongAttempts++;
      // add class wrong on the draw element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    }
  }
});

// End Game
function endGame() {
  // create popup
  let div = document.createElement("div");
  div.className = "popup";
  // create text
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueValue}`
  );
  div.appendChild(divText);
  document.body.appendChild(div);
}
// Step Game
function stepGame() {
  // create popup-2
  let div = document.createElement("div");
  div.className = "popup-2";
  // create text
  let divText = document.createTextNode(
    `Congratulations , Click On Refresh To The Next Word => Numbers The Wrong Attempts: (${wrongAttempts}) `
  );
  div.appendChild(divText);
  document.body.appendChild(div);
}
