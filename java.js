function players(name,xo){
  this.name = name;
  this.xo = xo;
  return {name,xo};
}

function gameLogic(){
  let player = players("John: ","X");
  let player2  = players("Apple: ","O");
  let gameboard = [[player.name],[player.xo],[player2.name],[player2.xo]];
  let winingCombination = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  return {gameboard, winingCombination};
}

let display = (() =>{ 
let box1 = [...document.querySelectorAll('.box')];
let winner = document.getElementById('winner');
let reset = document.getElementById('reset');
let Score = document.getElementById('Score');
let score1 = document.createElement('p');
let score2 = document.createElement('p');
Score.appendChild(score1);  
Score.appendChild(score2); 
let state = 1;
let board = [];
let comb = gameLogic().winingCombination;

let scoreplayer1 = 0
let scoreplayer2 = 0

box1.forEach(element => {
  element.addEventListener('click', xoDisplay);
})
 
function xoDisplay(e){
  if (state == 1 && e.target.innerText == ""){
    e.target.innerText = gameLogic().gameboard[1];
    board.splice(e.target.id , 0, e.target.innerText);
    state = 0;
  } else if (state == 0 && e.target.innerText == "") {
    e.target.innerText = gameLogic().gameboard[3]
    state = 1;
    board.splice(e.target.id , 0, e.target.innerText);
  } 
  win(checkWinO,checkWinX,draw)
  stopClick() 
  score()
}

function checkWinX() {
  return comb.some((combination) => {
    return combination.every((i) => {
      return box1[i].innerText === "X";
    });
  });
}

function checkWinO() {
  return comb.some((combination) => {
    return combination.every((i) => {
      return box1[i].innerText === "O";
    }); 
  });
}

function draw() {
  return box1.every((box1) => {
    return box1.innerText === "X" || box1.innerText === "O";
  });
}

function win(checkWinO,checkWinX,draw){
  if(checkWinX() == true ){
    winner.innerText = "Winner " + gameLogic().gameboard[0];
    scoreplayer1++ ;
  } else if (checkWinO() == true){ 
    winner.innerHTML = "Winner " + gameLogic().gameboard[2];
    scoreplayer2++;
  }else if(draw() == true){
    winner.innerText = "DRAW";
  }
}

function stopClick(){
  // if(checkWinX() == true || checkWinO() == true || draw() == true);
  if (winner.textContent !== "")
  box1.forEach(element => {
    element.removeEventListener('click', xoDisplay);
  })
}

reset.addEventListener('click',resetGame)

function resetGame(){
  box1.forEach(e => e.innerText = "");
  winner.innerText = "";
  box1.forEach(element => {
    element.addEventListener('click', xoDisplay);
  })
}

function score(){
score1.innerText = gameLogic().gameboard[0] + ` ${scoreplayer1}`;
score2.innerText = gameLogic().gameboard[2] + ` ${scoreplayer2}`;
}
score()

})()