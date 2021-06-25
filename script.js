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
// preload audio files to negate delay
let audio = new Audio("./sounds/green.mp3");
audio = new Audio("./sounds/blue.mp3");
audio = new Audio("./sounds/yellow.mp3");
audio = new Audio("./sounds/red.mp3");
audio = new Audio("./sounds/wrong.mp3");
function listenForStart() {
  $("#start").on("click", function () {
    document.getElementById("start").innerText = "PLAY AGAIN";
    $("#start").off("click");
    simonPlay();
  });
}
listenForStart();

function listenForPlayer() {
  $(".btn").click(function (event) {
    playerPlay(event);
  });
}
// simonPlay function
function simonPlay() {
  counter = 0;

  let rndNum = Math.floor(Math.random() * 4);

  // push random color to colorArray and audioArray
  console.log("colorArray: " + colorArray);
  colorArray.push(allColors[rndNum]);
  audioArray.push(allSounds[rndNum]);

  console.log(colorArray, audioArray);
  // create pause between color blips based on colorArray length (default time + (length*added time))
  // light up simon (add .pressed class, then remove it) and play audio with values of colorArray and audioArray, and pause between blips
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
        document.getElementById("result").innerText = "";
      }, 500 * i + 500);
    }
  }
}

//   player's turn
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
    document.getElementById("result").innerText = "POORLY!";
    gameOver();
    return;
  }
  console.log("counter: " + counter);
  console.log(colorArray.length - 1);
  if (counter === colorArray.length - 1) {
    $(".btn").off("click");
    document.getElementById("result").innerText = "WISELY!";
    document.getElementById("score").innerText = counter + 1;
    simonPlay();
    return;
  }
  counter++;
  // return;
}

// GAME OVER FUNCTION
function gameOver() {
  $(".btn").off("click");
  counter = 0;
  colorArray = [];
  audioArray = [];
  $("#start").on("click", function () {
    document.getElementById("score").innerText = "";
    document.getElementById("result").innerText = "";

    $("#start").off("click");
    simonPlay();
  });
}
// show player stats
// run keyListen
