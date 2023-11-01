let buttonColors = ["red","blue","green","yellow"];

let gamePattern = [];
let userClickedPattern = [];

var level = 0
var isGameStarted = false;
var idx = 0;

$(document).ready(function () {
    $(document).keydown(function() {
    if (!isGameStarted) {
        $("#level-title").text("level " + level);        
        nextSequence();
        isGameStarted = true;
    }})
    
});

$("div[type='button']").click(function () {
var userChosenColor = this.id;
userClickedPattern.push(userChosenColor);

animatePress(userChosenColor);
playSound(userChosenColor);
checkAnswer(userChosenColor);
});

function checkAnswer(currentLevel) {
  if (currentLevel == gamePattern[idx]) {    
    idx++;
    if (idx == gamePattern.length) {
      levelUp();
    }
  } else {
    gameOver();
    restartGame();
  }
}

function nextSequence() {
    userClickedPattern = []
    level++;
    $("h1").text("level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
    
}

function playSound(id) {
    var audio = new Audio("sounds/" + id + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100)
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
}
function restartGame() {
    level = 0;
    isGameStarted = false;
    gamePattern = [];
    idx = 0;

}

function levelUp() {
    setTimeout(function() {
        nextSequence()}, 600
    );
    idx = 0;
    // userClickedPattern = [];
}


