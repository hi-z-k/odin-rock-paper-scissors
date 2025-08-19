function choiceTranslate(choice) {
  let choiceList = ["rock", "paper", "scissor"];
  if (typeof choice === "number") {
    choice %= 3;
    return choiceList[choice];
  } else if (typeof choice === "string") {
    choice = choice.toLowerCase();
    return choiceList.indexOf(choice);
  } else {
    return;
  }
}

function getComputerChoice() {
  let choice = Math.floor(Math.random() * 4);
  return choiceTranslate(choice);
}

function getHumanChoice() {
  let choice = prompt("Choose to play(rock/paper/scissor): ");
  return choice;
}

function RPSwinner(player1, player2) {
  let playerI = choiceTranslate(player1);
  let playerII = choiceTranslate(player2);
  let diff = Math.abs(playerII - playerI);

  if (diff == 2) {
    return playerI > playerII ? 2 : 1;
  } else if (diff == 1) {
    return playerI > playerII ? 1 : 2;
  } else if (diff == 0) {
    return 0;
  }
}

function playRound(player1, player2) {
  console.log(`  (${player1} - ${player2}\)\n`);

  let winner = RPSwinner(player1, player2);
  if (winner == 1) {
    console.log(`>> Player 1 wins this round!`);
  } else if (winner == 2) {
    console.log(`>> Player 2 wins this round!`);
  } else {
    console.log(">> It is a tie!");
  }

  return winner;
}

function scoreBoard(score1, score2) {
  return `Player I (${score1} - ${score2}\) Player II`;
}

function RPSGame(bestOf) {
  let pl1Score = 0;
  let pl2Score = 0;
  let round = 1;

  while (round <= bestOf) {
    console.log(
      `\nRound ${round} - Scoreboard:\n  ${scoreBoard(pl1Score, pl2Score)}`
    );
    let winner = playRound();

    if (winner === 1) pl1Score++;
    else if (winner === 2) pl2Score++;
    round++;
  }

  console.log(`\nFinal Results:\n  ${scoreBoard(pl1Score, pl2Score)}`);
  if (pl1Score === pl2Score) {
    console.log(">> It is a tie");
  } else {
    console.log(`>> The winner is Player ${pl1Score > pl2Score ? 1 : 2}`);
  }
}

// RPSGame(3)
function RPSuiGame(bestOf) {
  const optionMenu = document.querySelector(".player-option");
  let roundsLeft = bestOf;
  const roundCount = document.querySelector(".round-count");
  let round = 1;
  roundCount.textContent = `Round ${round} of ${bestOf}`;
  function RPSUI(e) {
    let btnOption = e.target.getAttribute("class");
    let userChoice = btnOption;
    if (
      userChoice == "rock" ||
      userChoice == "paper" ||
      userChoice == "scissor"
    ) {
      let computerChoice = getComputerChoice();
      let winner = playRound(userChoice, computerChoice);

      document.querySelector(".player-one.choice").textContent = userChoice;
      document.querySelector(".player-two.choice").textContent = computerChoice;

      alert(choiceTranslate(winner));
      roundsLeft--;
      if (roundsLeft === 0) {
        optionMenu.removeEventListener("click", RPSUI);
      }
      if (roundsLeft > 0) round++;
      roundCount.textContent = `Round ${round} of ${bestOf}`;
    }
  }

  optionMenu.addEventListener("click", RPSUI);
}



//  Start-game UI to game UI

const startGame = document.querySelector(".start-game-button")
const roundMax= document.querySelector(".user-input-type")


// when the button is clicked 
// it removes the div and replace it with the game one

function playerInScoreBoard(node, name, uniqueClass){
   const player1 = document.createElement("div")
      player1.classList.add("player",uniqueClass)

      const player1Name = document.createElement("div")
        player1Name.classList.add("player-name")
        player1Name.textContent = name
      player1.appendChild(player1Name)

      const player1Score = document.createElement("div")
        player1Score.classList.add("player-score")
        player1Score.textContent = "1"
      player1.appendChild(player1Score)
    node.appendChild(player1)
}
function createScoreBoard(node){
    const scoreBoard = document.createElement("div")
      scoreBoard.classList.add("score-board")
        playerInScoreBoard(scoreBoard,"p1","player-one")
        
        const vsSign = document.createElement("div")
          vsSign.classList.add("dash")
          vsSign.textContent = "—"
        scoreBoard.appendChild(vsSign)
        
        playerInScoreBoard(scoreBoard,"p2","player-two")
      node.append(scoreBoard)
}

function createCurrentRound(node){
  const currentRound = document.createElement("div")
    currentRound.classList.add("current-round")

    const player1Choice = document.createElement("div")
    player1Choice.classList.add("player-one", "choice")
    choice(player1Choice,"paper","Y")

    const round = document.createElement("div")
      round.classList.add("round")
      const roundCount = document.createElement("div")
        roundCount.classList.add("round-count")
        roundCount.textContent = "Round"
      const verses = document.createElement("div")
        verses.classList.add("verses")
        verses.textContent = "Vs"
    
    
    round.appendChild(roundCount)
    round.appendChild(verses)


    const player2Choice = document.createElement("div")
    player2Choice.classList.add("player-two", "choice")
    choice(player2Choice,"rock","W")
    
  currentRound.appendChild(player1Choice)
  currentRound.appendChild(round)
  currentRound.appendChild(player2Choice)


  node.appendChild(currentRound)
}


function createOptionSection(node, color){
  const playerOption = document.createElement("div")
    playerOption.classList.add("player-option")
    option(playerOption,"rock",color)
    option(playerOption,"paper",color)
    option(playerOption,"scissor",color)
  node.appendChild(playerOption)
}

function choice(node,name,color){
  option(node,name,color,"div")
}

function option(node,name,color,element="button"){
   const optionElement = document.createElement(element)
   let classAdd = ["option"]
    if (element === "div"){
      classAdd.push("choice")
    }
    classAdd.forEach((cls) => optionElement.classList.add(cls))
    optionElement.classList.add(name)
      const capitalizedName = name[0].toUpperCase()+name.slice(1)
      const imageIcon = document.createElement("img")
        imageIcon.classList.add("option-icon", name)
        imageIcon.src = `../Images/${color} ${name}.png`
        imageIcon.alt = capitalizedName
    optionElement.prepend(imageIcon)
    if (element === "button"){
      const text = document.createElement("div")
      text.classList.add("option-name-div")
      text.textContent = capitalizedName
      optionElement.appendChild(text)
    }
  node.appendChild(optionElement)
}


function createUI(){
  const game = document.createElement("div")
    game.classList.add("game-section")
    createScoreBoard(game)
    const mainSection = document.createElement("div")
    mainSection.classList.add("main-section")

    createCurrentRound(mainSection)
    createOptionSection(mainSection,"Y")
    game.appendChild(mainSection)

  const screenGame = document.querySelector(".game-tabs")
  screenGame.prepend(game) 
}


startGame.addEventListener("click",()=>{
  document.querySelector(".start-game-section").style.display = "none"
  createUI()
})
RPSuiGame(4)
  
