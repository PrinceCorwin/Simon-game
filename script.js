// algorithm
// global variables

let counter = 0;
let colorArray = [];
let audioArray = [];

// color array has double values so it works with the setInterval function to animate "Simon" word. Only indexes 0-3 are used by simonPlay function
let allColors = [
  "green",
  "red",
  "yellow",
  "blue",
  "white",
  "green",
  "red",
  "yellow",
  "blue",
  "white",
];
let allSounds = [
  "./sounds/green.mp3",
  "./sounds/red.mp3",
  "./sounds/yellow.mp3",
  "./sounds/blue.mp3",
];
let letterClasses = ["#s", "#i", "#m", "#o", "#n"];

// create animation for "Simon" in title
let simonColorInterval = setInterval(interval, 250);
let j = 4;
function interval() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      $(letterClasses[i]).css("color", allColors[j + i]);
    }, 50 * i);
  }
  j--;
  if (j === -1) {
    j = 4;
  }
}

// preload audio files to negate delay (doesn't always work)
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
  // random number 0-3 to choose random index from colorArray
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
    // if lit up color is last color in pattern, listen for player click
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
  // if color clicked is correct, play corresponding sound
  if (event.target.id === colorArray[counter]) {
    audio = new Audio("./sounds/" + event.target.id + ".mp3");
    audio.play();
  } else {
    // on wrong click, play wrong.mp3 and end game
    audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("#result").text("POORLY!");
    $("#score").text(`${colorArray.length - 1}`);
    gameOver();
    return;
  }
  console.log("counter: " + counter);
  console.log(colorArray.length - 1);
  // check if color clicked is last color in pattern, update result and score, and let Simon play
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
  // show start button again and listen for start game click
  $("#start").removeClass("noStart");
  $("#start").on("click", function () {
    $("#score").text("");
    $("#result").text("");
    $("#start").addClass("noStart");
    $("#start").off("click");
    simonPlay();
  });
}
