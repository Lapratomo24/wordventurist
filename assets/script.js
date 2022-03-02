//console.log("It's connected!");

//global variables
const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess-btn");
const input = document.querySelector(".letter");
const progress = document.querySelector(".progress");
const remainingGuesses = document.querySelector(".remaining-guesses");
const remainingGuessesSpan = document.querySelector("remaining-guesses span");
const message = document.querySelector(".message");
const restartButton = document.querySelector(".restart-btn");

const placeholderWord = "football";

const placeholderSymbol = function (placeholderWord) {
    const placeholderLetters = [];
    for (let letter of placeholderWord) {
        placeholderLetters.push("⭐");
    }
    progress.innerText = placeholderLetters.join("");
};

placeholderSymbol(placeholderWord);