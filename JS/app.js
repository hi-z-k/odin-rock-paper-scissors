const CHOICELIST = ["rock", "paper", "scissor"];
const startGame = document.querySelector(".start-game-button")
const roundMax= document.querySelector(".user-input-type")

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
    player1Choice.classList.add("player-one")
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
    player2Choice.classList.add("player-two")
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
      classAdd = ["choice"]
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

function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3)
  return CHOICELIST[choice]
}

function getHumanChoice() {
  let choice = prompt("Choose to play(rock/paper/scissor): ")
  return CHOICELIST[choice]
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

function isOption(e){
  return CHOICELIST.reduce((a,c)=>a||e.target.classList.contains(c),false)
}

function choiceUpdate(playerNum,choice,color){
  const playerChoice = document.querySelector(`.current-round .player-${playerNum} .choice img`)
  playerChoice.src = `../Images/${color} ${choice}.png`
}

startGame.addEventListener("click", () => {
  document.querySelector(".start-game-section").style.display = "none";
  createUI();

  choiceUpdate("one", "scissor", "W");
  choiceUpdate("two", "paper", "Y");
});
