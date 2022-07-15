var buttoncolors=["red", "blue", "green", "yellow"];

var gamepattern=[];
var userClickedPattern=[];

var started=false;
var level=0;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id"); // to access the text of button using id attribute
    userClickedPattern.push(userChosenColour);

    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(gamepattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamepattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttoncolors[randomNumber];
    gamepattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // for creating a flash animation

    playSound(randomChosenColour);
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    },100);
}

function playSound(event){
    var aud= new Audio("sounds/"+ event + ".mp3");
    aud.play();
}


function startOver(){
    level = 0;
    gamepattern = [];
    started = false;  
}
