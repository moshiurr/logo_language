//all the needed variables
const MAX_SIZE = 25;  
var floorArray = new Array(MAX_SIZE); //floor 25x25 array

//some photo variables
const def_photo = './assets/floor.png';
const filled_photo = './assets/filled_floor.png';

const r_turtle = './assets/right_turtle.png';
const l_turtle = './assets/left_turtle.png';
const u_turtle = './assets/up_turtle.png';
const d_turtle = './assets/down_turtle.png';

// temp variable to hold the current position photo before swaping with the turtle
var curTemp_photo = def_photo;

/**
* 0 = pen Up
* 1 = pen down
**/
var penStatus = 0;
/**
* 1 = move right
* 2 = move down
* 3 = move left
* 0 = move up
**/
let curDirection = 1;


//default turtle postion
var xPos = 0;
var yPos = 0;

//all the buttons variables
const upBtn = document.getElementById('up');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const downBtn = document.getElementById('down');
const penUp = document.getElementById('penUp');
const penDown = document.getElementById('penDown');
const moveBtn = document.getElementById('move');
const resetBtn = document.getElementById('reset');

//current selected direction button
var curDirBtn = rightBtn;

//converting floorArray from 1D array to 2D array
for(var i=0; i<floorArray.length; i++) floorArray[i] = new Array(MAX_SIZE);

// initializing the floor with default value
for(var i=0; i<floorArray.length; i++){

  // creating a div element that will hold a image inside
  const outerDiv = document.createElement('div');

  for(var j=0;j<floorArray.length; j++){

    // creating the image element
    const floorImg = document.createElement('img');

    // setting the image source to default photo of the floor
    floorImg.src = def_photo;

    // adding a class for some styles
    floorImg.classList.add('img')

    // adding the image element to the div
    outerDiv.appendChild(floorImg);

    //storing the image element to 2D array for future use
    floorArray[i][j]=floorImg;
  }
  //adding the div element to it parent div to show in webpage
  document.getElementById('floor').appendChild(outerDiv);
}

//inital position of the turtle
floorArray[0][0].src = r_turtle; 

//all event listener
resetBtn.addEventListener('click', resetFloor, false);
rightBtn.addEventListener('click', turnRight, false);
upBtn.addEventListener('click', turnUp, false);
downBtn.addEventListener('click', turnDown, false);
leftBtn.addEventListener('click', turnLeft, false);
moveBtn.addEventListener('click', makeMove, false);

penUp.addEventListener('click', penChangeUp, false);
penDown.addEventListener('click', penChangeDown, false);

//all the functions are below

//this functions reset the floor to the default value
function resetFloor(){
  for(var i=0; i<floorArray.length;i++){
    for(var j=0; j<floorArray.length; j++){
      floorArray[i][j].src = def_photo;
    }
  }

  xPos = 0;
  yPos = 0;

  floorArray[xPos][yPos].src = r_turtle;
  curTemp_photo = def_photo;
  penChangeUp();
  turnRight();
}

//change the current direction of turtle to it's right
function turnRight(){
  curDirection = 1;
  floorArray[xPos][yPos].src = r_turtle;
  curDirBtn.classList.toggle('selected');
  rightBtn.classList.toggle('selected');
  curDirBtn = rightBtn;
  changePresentDirStatus('Right');
}

//change the current direction of turtle to it's down
function turnDown(){
  curDirection = 2;
  floorArray[xPos][yPos].src = d_turtle;
  curDirBtn.classList.toggle('selected');
  downBtn.classList.toggle('selected');
  curDirBtn = downBtn;
  changePresentDirStatus('Down');
}

//change the current direction of turtle to it's left
function turnLeft(){
  curDirection = 3;
  floorArray[xPos][yPos].src = l_turtle;
  curDirBtn.classList.toggle('selected');
  leftBtn.classList.toggle('selected');
  curDirBtn = leftBtn;
  changePresentDirStatus('Left');
}

//change the current direction of turtle to it's up
function turnUp(){
  curDirection = 0;
  floorArray[xPos][yPos].src = u_turtle;
  curDirBtn.classList.toggle('selected');
  upBtn.classList.toggle('selected');
  curDirBtn = upBtn;
  changePresentDirStatus('Up');
}

//change the current turtle pen status to Pen UP
function penChangeUp() {
  penStatus = 0;
  document.getElementById('penStatus').innerText = 'Up';
  if(penDown.classList.contains('selected')){
    penDown.classList.remove('selected');
    penUp.classList.add('selected');
  }
}

//change the current turtle pen status to Pen Down
function penChangeDown() {
  penStatus = 1;
  document.getElementById('penStatus').innerText = 'Down';

  //current position gets filled with color
  curTemp_photo = filled_photo;

  if(penUp.classList.contains('selected')){
    penUp.classList.remove('selected');
    penDown.classList.add('selected');
  }
}

//make the turtle move based on it's current condition
function makeMove(){
  if(penStatus) move();
  else seek();
}

//turtle moves along the floor with pen status down, leaving trace
function move() {

  if(!validMove()) return;

  switch(curDirection){
    case 0: 
      floorArray[xPos--][yPos].src = filled_photo;
      curTemp_photo = floorArray[xPos][yPos].src;
      turnUp();
      break;
    case 1:
      floorArray[xPos][yPos++].src = filled_photo;
      curTemp_photo = floorArray[xPos][yPos].src;
      turnRight();
      break;
    case 2:
      floorArray[xPos++][yPos].src = filled_photo;
      curTemp_photo = floorArray[xPos][yPos].src;
      turnDown();
      break;
    case 3:
      floorArray[xPos][yPos--].src = filled_photo;
      curTemp_photo = floorArray[xPos][yPos].src;
      turnLeft();
      break;
    default:
      break;
  }
}

//turtle moves along the floor with pen status up, not leaving any trace
function seek(){
  if(!validMove()) return;

  switch(curDirection){
    case 0: 
      floorArray[xPos--][yPos].src = curTemp_photo;
      curTemp_photo = floorArray[xPos][yPos].src;
      turnUp();
      break;
    case 1:
      floorArray[xPos][yPos++].src = curTemp_photo;
      curTemp_photo = floorArray[xPos][yPos].src;
      turnRight();
      break;
    case 2:
      floorArray[xPos++][yPos].src = curTemp_photo;
      curTemp_photo = floorArray[xPos][yPos].src;
      turnDown();
      break;
    case 3:
      floorArray[xPos][yPos--].src = curTemp_photo;
      curTemp_photo = floorArray[xPos][yPos].src;
      turnLeft();
      break;
    default:
      break;
  }
}

//change the string on the webpage that shows the current direction status
function changePresentDirStatus(string){
  document.getElementById('dir').innerText = string;
}

//check the turte's move if it is valid or not
function validMove(){
  switch(curDirection){
    case 0: 
      if((xPos - 1) < 0) return false;
      else return true;
    case 1: 
    if((yPos + 1) >= MAX_SIZE) return false;
    else return true;
    case 2:
      if((xPos+1)>= MAX_SIZE) return false;
      else return true;
    case 3:
      if((yPos - 1) < 0) return false;
      else return true;
    default:
      return false;
  }
}