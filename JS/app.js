
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
