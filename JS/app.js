const CHOICELIST = ["rock", "paper", "scissor"];
const startGame = document.querySelector(".start-game-button");
const roundMax = document.querySelector(".user-input-type");

function playerInScoreBoard(node, name, color, uniqueClass) {
  const player1 = document.createElement("div");
  player1.classList.add("player", uniqueClass);

  const player1Name = document.createElement("div");
  player1Name.classList.add("player-name");
  if (color == "Y") {
    player1Name.style.cssText = "background-color:yellow;";
  } else {
    player1Name.style.cssText = "background-color:white;";
  }

  player1Name.textContent = name;
  player1.appendChild(player1Name);

  const player1Score = document.createElement("div");
  player1Score.classList.add("player-score");
  player1Score.textContent = "0";
  player1.appendChild(player1Score);
  node.appendChild(player1);
}
function createScoreBoard(node, playerName, player1Color) {
  const scoreBoard = document.createElement("div");
  scoreBoard.classList.add("score-board");
  playerInScoreBoard(scoreBoard, playerName, player1Color, "player-one");

  const vsSign = document.createElement("div");
  vsSign.classList.add("dash");
  vsSign.textContent = "—";
  scoreBoard.appendChild(vsSign);
  let player2Color = oppositeColor(player1Color);
  playerInScoreBoard(scoreBoard, "COMPUTER", player2Color, "player-two");
  node.append(scoreBoard);
}

function createCurrentRound(node, color) {
  const currentRound = document.createElement("div");
  currentRound.classList.add("current-round");

  const player1Choice = document.createElement("div");
  player1Choice.classList.add("player-one");
  choice(player1Choice, "paper", color);

  const round = document.createElement("div");
  round.classList.add("round");
  const roundText = document.createElement("div");
  roundText.classList.add("round-text");
  roundText.textContent = "Round";
  const roundCount = document.createElement("span");
  roundCount.classList.add("round-count", "round-text");
  roundCount.textContent = "1";
  roundText.appendChild(roundCount);
  const verses = document.createElement("div");
  verses.classList.add("verses");
  verses.textContent = "Vs";

  round.appendChild(roundText);
  round.appendChild(verses);

  const player2Choice = document.createElement("div");
  player2Choice.classList.add("player-two");
  choice(player2Choice, "rock", oppositeColor(color));

  currentRound.appendChild(player1Choice);
  currentRound.appendChild(round);
  currentRound.appendChild(player2Choice);

  node.appendChild(currentRound);
}

function createOptionSection(node, color) {
  const playerOption = document.createElement("div");
  playerOption.classList.add("player-option");
  option(playerOption, "rock", color);
  option(playerOption, "paper", color);
  option(playerOption, "scissor", color);
  node.appendChild(playerOption);
}

function choice(node, name, color) {
  option(node, name, color, "div");
}

function option(node, name, color, element = "button") {
  const optionElement = document.createElement(element);
  let classAdd = "option";
  if (element === "div") {
    classAdd = "choice";
  }
  optionElement.classList.add(name, classAdd);
  const capitalizedName = name[0].toUpperCase() + name.slice(1);
  const imageIcon = document.createElement("img");
  imageIcon.classList.add("option-icon", name);
  imageIcon.src = `/Images/${color} ${name}.png`;
  imageIcon.alt = capitalizedName;
  optionElement.prepend(imageIcon);
  if (element === "button") {
    const text = document.createElement("div");
    text.classList.add("option-name-div");
    text.textContent = capitalizedName;
    optionElement.appendChild(text);
  }
  node.appendChild(optionElement);
}

function createUI(playerName, optionColor) {
  const game = document.createElement("div");
  game.classList.add("game-section");
  createScoreBoard(game, playerName, optionColor);
  const mainSection = document.createElement("div");
  mainSection.classList.add("main-section");

  createCurrentRound(mainSection, optionColor);
  createOptionSection(mainSection, optionColor);
  game.appendChild(mainSection);

  const screenGame = document.querySelector(".game-tabs");
  screenGame.prepend(game);
}

function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3);
  return CHOICELIST[choice];
}

function RPSwinner(player1, player2) {
  let playerI = CHOICELIST.indexOf(player1);
  let playerII = CHOICELIST.indexOf(player2);
  let diff = Math.abs(playerII - playerI);

  if (diff == 2) {
    return playerI > playerII ? 2 : 1;
  } else if (diff == 1) {
    return playerI > playerII ? 1 : 2;
  } else if (diff == 0) {
    return 0;
  }
}

function isOption(e) {
  return CHOICELIST.reduce(
    (a, c) => a || e.target.classList.contains(c),
    false
  );
}
function optionOf(e) {
  let choicePicked = CHOICELIST.filter((c) => e.target.classList.contains(c));
  if (choicePicked.length == 1) return choicePicked[0];
}

function choiceUpdate(playerNum, choice, color) {
  const playerChoice = document.querySelector(
    `.current-round .player-${playerNum} .choice img`
  );
  playerChoice.src = `../Images/${color} ${choice}.png`;
}

function declareWinner(p1, p2) {
  let winner = RPSwinner(p1, p2);
  const verses = document.querySelector(".current-round .round .verses");
  if (winner) verses.textContent = `Player ${winner} WINS`;
  else verses.textContent = `It is a TIE`;
  return winner;
}

function scoreFirst(maxScore) {
  if (playerScore("one") == maxScore) return 1;
  else if (playerScore("two") == maxScore) return 2;
  else return false;
}

function currentRound() {
  return parseInt(document.querySelector(`.round-count`).textContent);
}

function roundIncrement() {
  const roundCount = document.querySelector(`.round-count`);
  let rounds = parseInt(roundCount.textContent);
  roundCount.textContent = ++rounds;
}

function playerScoreObj(playerNum) {
  return document.querySelector(`.player-${playerNum} .player-score`);
}
function playerScore(playerNum) {
  const plObj = playerScoreObj(playerNum);
  return parseInt(plObj.textContent);
}

function scoreUpdate(winnerPlayer) {
  if (winnerPlayer === 1) {
    winnerPlayer = "one";
  } else if (winnerPlayer === 2) {
    winnerPlayer = "two";
  } else return;
  const pScore = playerScoreObj(winnerPlayer);
  let score = parseInt(pScore.textContent);
  pScore.textContent = ++score;
}

function removeUI() {
  const tab = document.querySelector(".game-section");
  tab.remove();
}

function oppositeColor(color) {
  if (color === "Y") return "W";
  else if (color === "W") return "Y";
}

function colorChosen() {
  const radio = document.querySelector('input[name="color"]:checked');
  return radio ? radio.value : null;
}
function usernameInput() {
  const userName = document.querySelector(".username-input");
  return userName ? userName.value : null;
}
function scoreInput() {
  const score = document.querySelector(".score-input");
  return score ? score.value : null;
}
function inputs() {
  const username = usernameInput();
  const score = scoreInput();
  const color = colorChosen();
  if (!username || !score || !color) return false;
  let data = {};
  data["username"] = username.toUpperCase();
  data["score"] = score;
  data["color"] = color;
  return data;
}

function newGame(){
  const startSection = document.querySelector(".start-game-section");
  removeUI();
  startSection.style.display = "flex";
}

function RPSGAME(userName, color, maxScore) {
  let gameWinner = false;
  const computerColor = oppositeColor(color);
  const startSection = document.querySelector(".start-game-section");
  startSection.style.display = "none";
  createUI(userName, color);
  const playerOptions = document.querySelector(".player-option");
  playerOptions.addEventListener("click", (e) => {
    let p1Choice = optionOf(e);
    if (!p1Choice) return;
    let p2Choice = getComputerChoice();
    choiceUpdate("one", p1Choice, color);
    choiceUpdate("two", p2Choice, computerColor);
    let winner = declareWinner(p1Choice, p2Choice);
    scoreUpdate(winner);
    roundIncrement();
    gameWinner = scoreFirst(maxScore);
    if (gameWinner) {
      alert(`Player ${gameWinner} won the game`);
      newGame()
    }
  });
}
const newgameLink = document.querySelector(".right-hero.new-game")
newgameLink.addEventListener("click", newGame)

startGame.addEventListener("click", () => {
  let data = inputs();
  if (data) {
    RPSGAME(data.username, data.color, data.score);
  } else {
    alert("Please fill all the inputs and try again");
  }
});