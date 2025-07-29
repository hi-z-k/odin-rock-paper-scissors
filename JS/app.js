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

function playRound() {
  let player1 = getHumanChoice();
  let player2 = getComputerChoice();

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

function scoreBoard(score1, score2){
  return `Player I (${score1} - ${score2}\) Player II`
}

function RPSGame(bestOf) {
  let pl1Score = 0;
  let pl2Score = 0;
  let round = 1;

  while (round <= bestOf) {
    console.log(
      `\nRound ${round} - Scoreboard:\n  ${scoreBoard(pl1Score,pl2Score)}`
    );
    let winner = playRound();

    if (winner === 1) pl1Score++;
    else if (winner === 2) pl2Score++;
    round++;
  }

  console.log(`\nFinal Results:\n  ${scoreBoard(pl1Score,pl2Score)}`);
  if (pl1Score === pl2Score) {
    console.log(">> It is a tie");
  } else {
    console.log(`>> The winner is Player ${pl1Score > pl2Score ? 1 : 2}`);
  }
}
