
function choiceTranslate(choice){
    let choiceList = ["rock", "paper", "scissor"]
    if (typeof choice === "number"){
        choice %= 3;
        return choiceList[choice]
    }
    else if(typeof choice === "string"){
        choice = choice.toLowerCase();
        return choiceList.indexOf(choice)
    }
    else {
        return;
    }
}


function getComputerChoice(){
    let choice = Math.floor(Math.random()*4);
    return choiceTranslate(choice)
}

function getHumanChoice(){
    let choice = prompt("Choose to play(rock/paper/scissor): ")
    return choice
}

function RPSwinner(player1, player2){
    let playerI = choiceTranslate(player1)
    let playerII = choiceTranslate(player2)
    let diff = Math.abs(playerII - playerI)

    if (diff == 2){
        return (playerI > playerII) ? 2 : 1
    }
    else if (diff == 1){
        return (playerI > playerII) ? 1 : 2
    }
    else{
        return 0;
    }
}

