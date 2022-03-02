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


//set up star symbols as placeholders
const placeholderSymbol = function (placeholderWord) {
    const placeholderLetters = [];
    for (let letter of placeholderWord) {
        placeholderLetters.push("⭐");
    }
    progress.innerText = placeholderLetters.join("");
};

placeholderSymbol(placeholderWord);


//add event listener to capture letter input
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const inputValue = input.value;
    console.log(inputValue);
    input.value="";
});

//add function to validate input
const inputValidation = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please input a letter of your choice!"
    } else if (input.length > 1) {
        message.innerText = "Only one letter for every turn!"
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Hint: A to Z, no numbers and symbols!"
    } else {
        return input;
    }
};