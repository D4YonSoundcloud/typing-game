const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// list of words

const words = [
  "var x = 10;",
  "let i = 0;",
  "const j = i;",
  "i++;",
  "function()",
  "export default",
  "while(i>0)",
  "new arr = []",
  "import",
  "from",
  "&&",
  "||",
  "this",
  "true;",
  "false;",
  "arrowFunction = () =>",
  "var temp = arr[i]",
  "arr[i] = arr[i+1]",
  "arr[i+1] = temp",
  "constructor(){}",
  "this.head = null",
  "this.tail = null",
  "class singlyLinkedList {}",
  "module.export",
  "arr.push(val)",
  "arr.shift()",
  "class Graph {}",
  "render () {}",
  "return ()",
  "for(let i of arr)",
  "if(!this.head) return false"
];

//set difficulty in value to local storage, if none then default to medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//set difficulty and select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//random word
let randomWord;

//Init score
let score = 0;

//init time
let time = 10;

//focus on text on load
text.focus();

//start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    //end game
    gameOver();
  }
}

//game over and then show end screen
function gameOver() {
  endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p> Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;
  endgameEl.style.display = "flex";
}

addWordToDOM();

text.addEventListener("input", e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    //clear
    e.target.value = "";
    if (difficulty === "hard") {
      time += 1;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

//settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

//settings select
settingsForm.addEventListener("change", e => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
