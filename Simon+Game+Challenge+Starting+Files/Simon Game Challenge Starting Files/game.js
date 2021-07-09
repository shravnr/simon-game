let gamePattern = [];

let userClickedPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let started = false;
let level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(event) {
    let idOfColour = event.target;
    let userChosenColour = $(idOfColour).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.random();
    randomNumber = randomNumber * 4;
    randomNumber = Math.floor(randomNumber);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    let selection = "#" + randomChosenColour;
    playSound(randomChosenColour);
    $(selection).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
};

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
};

function playSound(name) {
    var audio = new Audio('sounds/'+ name + '.mp3');
    audio.play();
};
function startOver() {
    started = false;
    level = 0;
    gamePattern = []; 
}
function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            },1000)
        } 
    } else {
        var gameOver = new Audio('sounds/wrong.mp3');
        gameOver.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
