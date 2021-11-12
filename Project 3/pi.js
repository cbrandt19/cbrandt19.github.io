let index = 0;
let highScore = 0;
let $highScore = $("h4");
let imageOffset = 565;

let piArray100 = [1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9, 5, 0, 2, 8, 8, 4, 1, 9, 7, 1, 6, 9, 3, 9, 9, 3, 7, 5, 1, 0, 5, 8, 2, 0, 9, 7, 4, 9, 4, 4, 5, 9, 2, 3, 0, 7, 8, 1, 6, 4, 0, 6, 2, 8, 6, 2, 0, 8, 9, 9, 8, 6, 2, 8, 0, 3, 4, 8, 2, 5, 3, 4, 2, 1, 1, 7, 0, 6, 7, 9];

let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let button4 = document.getElementById("button4");
let button5 = document.getElementById("button5");
let button6 = document.getElementById("button6");
let button7 = document.getElementById("button7");
let button8 = document.getElementById("button8");
let button9 = document.getElementById("button9");
let button0 = document.getElementById("button0");

function restart()
{
  index = 0;
  document.getElementById("piPrefix").innerHTML = "3    .";
  imageOffset = window.innerWidth / 2;
  /*imageOffset = 565; */
}

function gameOver()
{
  imageOffset = 565;
  document.getElementById("piPrefix").style.left = imageOffset + "px";

  if (index > highScore)
  {
    highScore = index;
    document.getElementById("HS").innerHTML = "High Score: " + highScore;
    $highScore.show("normal");
    document.getElementById("piPrefix").innerHTML = "New High Score!!";
    console.log("new high score");
  }
  else
  {
    document.getElementById("piPrefix").innerHTML = "Game Over!";
  }
}

function addToPrefix()
{
  let oldPrefix = document.getElementById("piPrefix").innerHTML;
  let newPrefix = oldPrefix + "    " + piArray100[index].toString();
  document.getElementById("piPrefix").innerHTML = newPrefix;
}

function scroll() {
  imageOffset -= 30;
  document.getElementById("piPrefix").style.left = imageOffset + "px";
}


function checkNumb(input)
{
  if (input == piArray100[index])
  {
    addToPrefix()
    console.log("correct!");
    index = index + 1;
    scroll();
  }
  else
  {
    console.log("incorrect!");
    gameOver();
  }
}

button1.addEventListener("click", function(){ checkNumb(1)});
button2.addEventListener("click", function(){ checkNumb(2)});
button3.addEventListener("click", function(){ checkNumb(3)});
button4.addEventListener("click", function(){ checkNumb(4)});
button5.addEventListener("click", function(){ checkNumb(5)});
button6.addEventListener("click", function(){ checkNumb(6)});
button7.addEventListener("click", function(){ checkNumb(7)});
button8.addEventListener("click", function(){ checkNumb(8)});
button9.addEventListener("click", function(){ checkNumb(9)});
button0.addEventListener("click", function(){ checkNumb(0)});

$("#showHS").click(function() {
    $highScore.toggle("normal");
});
$("#restart").click(restart);
$("#revealPi").click(function() {
  $("#piCheat").fadeToggle("slow");
});

function keyboardInput()
{
  if (event.key === '1')
  {
    checkNumb(1);
  }
  else if (event.key === '2')
  {
    checkNumb(2);
  }
  else if (event.key === '3')
  {
    checkNumb(3);
  }
  else if (event.key === '4')
  {
    checkNumb(4);
  }
  else if (event.key === '5')
  {
    checkNumb(5);
  }
  else if (event.key === '6')
  {
    checkNumb(6);
  }
  else if (event.key === '7')
  {
    checkNumb(7);
  }
  else if (event.key === '8')
  {
    checkNumb(8);
  }
  else if (event.key === '9')
  {
    checkNumb(9);
  }
  else if (event.key === '0')
  {
    checkNumb(0);
  }
}

document.addEventListener('keypress', keyboardInput);