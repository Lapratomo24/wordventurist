//console.log("It's connected!");

//global variables
const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess-btn");
const input = document.querySelector(".letter");
const progress = document.querySelector(".progress");
const remainingGuesses = document.querySelector(".remaining-guesses");
const remainingGuessesSpan = document.querySelector(".remaining-guesses span");
const message = document.querySelector(".message");
const restartButton = document.querySelector(".restart-btn");
const congrats = document.querySelector(".congrats");
const retry = document.querySelector(".retry");

let placeholderWord = "football";
let guessedLettersArray = [];
let guessesLeft = 8;

//function to fetch data containing words; data is derived from a text file I created
const getData = async function () {
    const response = await fetch("https://gist.githubusercontent.com/Lapratomo24/2fb585c3cfac6f355459db5af2211f45/raw/88baadc5bfbdf4c0e5c963287c9551943b919bdd/gistfile1.txt");
    const randomWords = await response.text();
    const wordArray = randomWords.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    placeholderWord = wordArray[randomIndex].trim();
    placeholderSymbol(placeholderWord);
};

getData();

//set up question symbols as placeholders
const placeholderSymbol = function (placeholderWord) {
    const placeholderLetters = [];
    for (let letter of placeholderWord) {
        placeholderLetters.push("❔");
    }
    progress.innerText = placeholderLetters.join("");
};

//add event listener to capture letter input
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText="";
    const inputValue = input.value;
    const checkDoubleInput = inputValidation(inputValue);
    if (checkDoubleInput) {
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
        message.innerHTML = 'Only <span class="emphasize">one</span> letter for every turn!'
    } else if (!input.match(acceptedLetter)) {
        message.innerHTML = '<span class="emphasize">Hint</span>: A to Z, no numbers and symbols!'
    } else {
        return input;
    }
};

//add function to include each new letter in an array of guessed letters
const typeGuess = function (inputValue) {
    inputValue = inputValue.toUpperCase();
    if (guessedLettersArray.includes(inputValue)) {
        message.innerText = "Try another letter you haven't picked 😉";
    } else {
        guessedLettersArray.push(inputValue);
        letterUpdate();
        guessCount(inputValue);
        progressUpdate(guessedLettersArray);
    }
};

//add function to display all guessed letters
const letterUpdate = function () {
    guessedLetters.innerHTML = "";
    for (let letter of guessedLettersArray) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetters.append(li);
    }
};

//add function to replace each question symbol with every correct guessed letter
const progressUpdate = function (guessedLettersArray) {
    const wordUppercase = placeholderWord.toUpperCase();
    const wordArray = wordUppercase.split("");
    const replaceSymbol = [];
    for (let letter of wordArray) {
        if (guessedLettersArray.includes(letter)) {
            replaceSymbol.push(letter.toUpperCase());
        } else {
            replaceSymbol.push("❔");
        }
    }
    progress.innerText = replaceSymbol.join("");
    youWon();
};

//add function for all kinds of messages
const guessCount = function (inputValue) {
    const uppercaseWord = placeholderWord.toUpperCase();
    if (!uppercaseWord.includes(inputValue)) {
        message.innerHTML = `The word <span class="emphasize">does not</span> contain the letter ${inputValue} 🤔`;
        guessesLeft -= 1;
    } else {
        message.innerText = "Good guess! 👍";
    }
    if (guessesLeft === 0) {
        message.innerHTML = `Sorry, the correct word is <span class="emphasize">${placeholderWord}</span> 😅`;
        restartGame();
        congrats.classList.add("hide");
        retry.classList.remove("hide");
    } else if (guessesLeft === 1) {
        remainingGuessesSpan.innerHTML = `only <span class="emphasize">${guessesLeft}</span> guess`;
    } else {
        remainingGuessesSpan.innerHTML = `<span class="emphasize">${guessesLeft}</span> guesses`;
    }
};

//add function for a winning message
const youWon = function () {
    if (placeholderWord.toUpperCase() === progress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">That's correct, congrats! 🎉</p>`;
        congrats.classList.remove("hide");
        restartGame();
    }
};

//add function to restart the game
const restartGame = function () {
    guessButton.classList.add("hide");
    remainingGuesses.classList.add("hide");
    guessedLetters.classList.add("hide");
    restartButton.classList.remove("hide");
    congrats.classList.remove("hide");
};

//add event listener for restart button click
restartButton.addEventListener("click", function (){
    message.classList.remove("win");
    guessesLeft = 8;
    guessedLettersArray = [];
    remainingGuessesSpan.innerText = `${guessesLeft} guesses`;
    guessedLetters.innerHTML = "";
    message.innerText = "";
    
    getData();

    guessButton.classList.remove("hide");
    remainingGuesses.classList.remove("hide");
    guessedLetters.classList.remove("hide");
    restartButton.classList.add("hide");
    congrats.classList.add("hide");
    retry.classList.add("hide");
});