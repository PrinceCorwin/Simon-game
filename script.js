// algorithm
// global variables
let counter = 0;
let colorArray = [];
let audioArray = [];
let allColors = ["green", "red", "yellow", "blue"];
let allSounds = [
  "./sounds/green.mp3",
  "./sounds/red.mp3",
  "./sounds/yellow.mp3",
  "./sounds/blue.mp3",
];
let complete = false;
// preload audio files to negate delay
let audio = new Audio("./sounds/green.mp3");
audio = new Audio("./sounds/blue.mp3");
audio = new Audio("./sounds/yellow.mp3");
audio = new Audio("./sounds/red.mp3");
audio = new Audio("./sounds/wrong.mp3");

// start button event listener
function listenForStart() {
  $("#start").on("click", function () {
    $("#start").text("PLAY AGAIN");
    $("#start").off("click");
    $("#start").addClass("noStart");
    // gameOver();
    simonPlay();
  });
}

listenForStart();

// event listener for player clisks on colors
function listenForPlayer() {
  $(".btn").click(function (event) {
    playerPlay(event);
  });
}

// simonPlay function
function simonPlay() {
  counter = 0;
  console.log(counter, colorArray, audioArray);
  let rndNum = Math.floor(Math.random() * 4);

  // push random color to colorArray and audioArray
  console.log("colorArray: " + colorArray);
  colorArray.push(allColors[rndNum]);
  audioArray.push(allSounds[rndNum]);

  console.log(colorArray, audioArray);
  // loop through current simon array and light up colors then listen for player click
  for (let i = 0; i < colorArray.length; i++) {
    setTimeout(() => {
      $("#" + colorArray[i]).addClass("pressed");
      audio = new Audio(audioArray[i]);
      audio.play();
      setTimeout(() => {
        $("." + colorArray[i]).removeClass("pressed");
      }, 200);
    }, 500 * i + 1000);
    if (i === colorArray.length - 1) {
      setTimeout(() => {
        listenForPlayer();
        $("#result").text("");
      }, 500 * i + 500);
    }
  }
}

//   action when player clicks color (check vs simon pattern)
function playerPlay(event) {
  console.log("event id: " + event.target.id);
  $("#" + event.target.id).addClass("player-pressed");
  setTimeout(() => {
    $("#" + event.target.id).removeClass("player-pressed");
  }, 200);
  if (event.target.id === colorArray[counter]) {
    audio = new Audio("./sounds/" + event.target.id + ".mp3");
    audio.play();
  } else {
    audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("#result").text("POORLY!");
    $("#score").text(`${colorArray.length - 1}`);
    gameOver();
    return;
  }
  console.log("counter: " + counter);
  console.log(colorArray.length - 1);
  // check if color clicked is correct according to simon pattern at current index
  if (counter === colorArray.length - 1) {
    $(".btn").off("click");
    // update player stats
    $("#result").text("WISELY!");
    $("#score").text(`${counter + 1}`);
    simonPlay();
    return;
  }
  counter++;
}

// GAME OVER FUNCTION
function gameOver() {
  $(".btn").off("click");
  counter = 0;
  colorArray = [];
  audioArray = [];
  $("#start").removeClass("noStart");
  $("#start").on("click", function () {
    $("#score").text("");
    $("#result").text("");
    $("#start").addClass("noStart");
    $("#start").off("click");
    simonPlay();
  });
}
