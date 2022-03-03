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
const guessedLettersArray = [];


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
    message.innerText="";
    const inputValue = input.value;
    const checkDoubleInput = inputValidation(inputValue);
    if (checkDoubleInput) {
        typeGuess(inputValue);
    }
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

const typeGuess = function (inputValue) {
    inputValue = inputValue.toUpperCase();
    if (guessedLettersArray.includes(inputValue)) {
        message.innerText = "Try another letter you haven't picked 😉";
    } else {
        guessedLettersArray.push(inputValue);
        console.log(guessedLettersArray);
    }
};