
const buttonColors = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = true;

$(document).keypress(function(){
    if(started){
        nextSequence();
        started = false;
    }
})


// what's next that user will click on(and storing that in gamePattern)
function nextSequence(){
    level++;
    $("h1").text("level "+level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // showing user with animation and sound.
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


// adding eventListener to buttons
$(".btn").click(function(){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    checkAnswer(userChosenColor);
});


// checking userClickedPattern with gamePattern
function checkAnswer(lastClickedColor){
    let index = userClickedPattern.length-1;
    if(userClickedPattern[index]!=gamePattern[index]){
        wrong();
    }else{
        playSound(lastClickedColor);
        animatePress(lastClickedColor);
    }

    // checking to reset userClickedPattern after each successful level.
    if(index+1===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
        userClickedPattern = [];
    }
}


// when user clicks wrong button
function wrong(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key To Restart");
    gamePattern = [];
    userClickedPattern = [];
    started = true;
    level = 0;
}


// when user clicks on any button
function playSound(name){
    let sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}


// animation to clicked buttons
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
