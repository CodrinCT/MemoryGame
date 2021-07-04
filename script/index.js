
const tableBody = document.getElementById('game_body');
const body = document.getElementById('body');
const table = document.getElementById('game_table');
const strBtn = document.getElementById('startBtn');
const score = document.getElementById('score');
let scoreValue = 0;
let level = 0;
let isGameStarted = false;
let generatedGame;
let playerResponse;
let correctAnswer;

    window.addEventListener('load', ()=>{
        generatedGame = generateLvl(level)
    });

    strBtn.addEventListener('click',()=>{
        isGameStarted=true;
       playLvl(level);
    })

let i = 0;
function displayGeneratedPattern(generatedPattern){
let option = document.getElementById(generatedPattern[i]);
   option.style="background-color: blue; transition-duration: 0.5s;";
     setTimeout(()=>{
    option.style="background-color: white; transition-duration: 0.5s;";
        i++;
        if(i <generatedPattern.length){
            displayGeneratedPattern(generatedPattern);
        }      
   }, 1000)

   return generatedPattern;
}

 function playLvl(level){
        let generatedGamePattern;
        generatedGamePattern = generatePattern(level)
        correctAnswer = displayGeneratedPattern(generatedGamePattern);
        playerResponse = playerResponsePattern(generatedGame, level);
}

function compareAnswers(correctAnswers, playerResponse){
    if(playerResponse.toString() === correctAnswers.toString()){
        setTimeout(()=>{
        alert('Your response is correct, Congratulations!')
        },500);
        setTimeout(()=>{
            correctAnswers.forEach(element => {
            document.getElementById(element).style="background-color:white";
        });
        scoreValue +=10;
        score.innerHTML= scoreValue;
        level++;
        generateLvl(level);
        i=0;
         if(scoreValue > 0){
            score.style="color:green";
        }
        },300);
    }else{
        setTimeout(()=>{
        alert('Your response is wrong, try again!');
        playerResponse.forEach(element => {
            document.getElementById(element).style="background-color:white";
        })
        i=0;
        playerResponse=[];
        correctAnswer=[];
        scoreValue -=10;
        score.innerHTML= scoreValue;
        if(scoreValue < 0){
            score.style="color:red";
        }
     },300)
    }
}

let rowArray=[];
     function generateLvl(lvl){
    console.log('the lvl is: '+lvl);
     let gameSize = 4;
    if(lvl === 0){
        gameSize = 4;
        nrMaxPlayerResponses = 3;
    }else{
        while (tableBody.lastElementChild) {
            tableBody.removeChild(tableBody.lastElementChild);
        }
        gameSize = 4+lvl;
        nrMaxPlayerResponses += 1; 
    }
        let cellId = 0;
        for (let i = 0; i < gameSize; i++) {
            const row = document.createElement('tr');
            row.className = 'table_row';
            for (let j = 0; j < gameSize; j++) {
                const cell = document.createElement('td');
                cell.className = 'table_cell';
                cell.id=cellId;           
                row.appendChild(cell);
                rowArray.push(cell);
                cellId++;
            }
            tableBody.appendChild(row);
        }
        return rowArray;
}

function generatePattern(level){
    
    let correctAnswers = [];
    let nrCorrectAnswers = 0;
    if(level === 0){
        nrCorrectAnswers = 3;
    }
    else{
        nrCorrectAnswers = level + 3;
    }
    while(correctAnswers.length < nrCorrectAnswers){
        const randomCell = Math.floor(Math.random()*16);
        if(!correctAnswers.includes(randomCell)){
        correctAnswers.push(randomCell)
        }
    }
    return correctAnswers;
}

 function playerResponsePattern(cells,lvl){
     let playerResponsesArr=[]
     let nrPlayerResponses = 0;
     let nrMaxPlayerResponses = 3;
      if(lvl !== 0){
        nrMaxPlayerResponses = 3+lvl; 
    }
    for(let i=0; i< cells.length; i++){
        cells[i].addEventListener('click',()=>{
             if(nrPlayerResponses < nrMaxPlayerResponses){
                        playerResponsesArr.push(cells[i].id) 
                        nrPlayerResponses++;
                        const cellResp = document.getElementById(cells[i].id);
                        cellResp.style = "background-color:green; transition-duration: 0.2s;";
                         if(nrPlayerResponses === nrMaxPlayerResponses){
                            compareAnswers(correctAnswer, playerResponsesArr)
                             return playerResponsesArr;
                }
          }
        })
    }
}

