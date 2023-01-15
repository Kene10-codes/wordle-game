let words = [
  "Zebra",
  "Sling",
  "Crate",
  "Brick",
  "press",
  "truth",
  "sweet",
  "salty",
  "alert",
  "check",
  "roast",
  "toast",
  "shred",
  "cheek",
  "shock",
  "czech",
  "woman",
  "wreck",
  "court",
  "coast",
  "flake",
  "think",
  "smoke",
  "unrig",
  "slant",
  "ultra",
  "vague",
  "pouch",
  "radix",
  "yeast",
  "zoned",
  "cause",
  "quick",
  "bloat",
  "level",
  "civil",
  "civic",
  "madam",
  "house",
  "delay",
];

let container = document.querySelector(".container");
let winScreen = document.querySelector(".win-screen");
let submitButton = document.querySelector(".submit");

let inputCount, tryCount, inputRow;
let backSpaceCount = 0;
let randomWord, finalWord;

// Touch Eevent func
function isTouchDevice() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (err) {
    return false;
  }
}

async function StartGame() {
  winScreen.classList.add("hide");
  container.innerHTML = "";
  inputCount = 0;
  successCount = 0;
  tryCount = 0;
  finalWord = "";

  // Create the grid
  for (let i = 0; i < 6; i++) {
    let inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");
    for (let j = 0; j < 5; j++) {
      inputGroup.innerHTML = `<input type="text" class="input-box" onkeyup="checker(event)" maxLength="1" disabled />`;
    }

    await container.appendChild(inputGroup);
  }

  inputRow = document.querySelectorAll(".input-group");
  inputBox = document.querySelectorAll("input-box");
  UpdateDivConfig(inputRow[tryCount].firstChild, false);
  randomWord = GetRandomWord();
  console.log(randomWord);
}

// Get randomw word
function GetRandomWord() {
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
}

function UpdateDivConfig(element, disabledStatus) {
  element.disabled = disabledStatus;
  if (!disabledStatus) {
    element.focus();
  }
}

// Logic func to handle user inputs
function checked(e) {
  let value = e.target.value.toUpperCase();
  // Disable current input box
  UpdateDivConfig(e.target, true);
  if (value.length == 1) {
    //  if word is less than and the button is a backspace key
    if (inputCount < 5 && e.key != "Backspace") {
      finalWord = finalWord + value;
      if (inputCount < 4) {
        UpdateDivConfig(e.target.nectSibling, false);
      }
    }
    inputCount += 1;
  } else if (value.length == 0 && e.key == "Backspace") {
    finalWord = finalWord.substring(0, finalWord.length - 1);
    if (inputCount == 0) {
      UpdateDivConfig(e.target, false);
      return false;
    }
    UpdateDivConfig(e.target, value);
    e.target.previousSibling.value = "";
    // Enable previous and decrement count
    UpdateDivConfig(e.target.previousSibling, false);
    inputCount = -1;
  }
}

window.addEventListener("keyup", (e) => {
  if (inputCount > 4) {
    if (isTouchDevice()) {
      submitButton.classList.remove("hide");
    }
    if (e.key == "Enter") {
      //validateWord();
      console.log("okay");
    } else if (e.key == "Backspace") {
      inputRow[tryCount].lastChild, (value = "");
      finalWord = finalWord.substring(0, finalWord.length - 1);
      UpdateDivConfig(inputRow[tryCount].lastChild, false);
      inputCount -= 1;
    }
  }
});

// Comparison Logix
async function ValidateWord() {
  if (isTouchDevice()) {
    submitButton.classList.add("hide");
  }
  let failed = false;
}

// Update DisableStatus
window.onload = StartGame();
