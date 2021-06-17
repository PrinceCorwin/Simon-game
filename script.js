// algorithm
// event listener for any key

// preload audio files to negate delay
let audio = new Audio("./sounds/green.mp3");
audio = new Audio("./sounds/blue.mp3");
audio = new Audio("./sounds/yellow.mp3");
audio = new Audio("./sounds/red.mp3");
audio = new Audio("./sounds/wrong.mp3");

initialize();
// create empty colorArray and audioArray
function initialize() {
  let colorArray = [];
  let audioArray = [];
  let allColors = ["green", "red", "yellow", "blue"];
  let allSounds = [
    "./sounds/green.mp3",
    "./sounds/red.mp3",
    "./sounds/yellow.mp3",
    "./sounds/blue.mp3",
  ];
  $("h1").click(function () {
    // remove event listener
    $("body").off("keydown");
    setTimeout(() => {
      simonPlay(colorArray, audioArray, allColors, allSounds);
    }, 500);
  });
}

// simonPlay function
function simonPlay(colorArray, audioArray, allColors, allSounds, counter) {
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
    }, 500 * i + 500);
  }
  playerPlay(colorArray, audioArray, allColors, allSounds);
}

//   player's turn
function playerPlay(colorArray, audioArray, allColors, allSounds) {
  var counter = 0;

  $("button").click(function (event) {
    console.log("event id: " + event.target.id);
    $("#" + event.id).addClass("pressed");
    setTimeout(() => {
      $("#" + event.target.id).removeClass("pressed");
    }, 200);
    if (event.target.id === colorArray[counter]) {
      audio = new Audio("./sounds/" + event.target.id + ".mp3");
      audio.play();
    } else {
      audio = new Audio("./sounds/wrong.mp3");
      audio.play();
      gameOver();
      return;
    }
    console.log("counter: " + counter);
    console.log(colorArray.length - 1);
    if (counter === colorArray.length - 1) {
      simonPlay(colorArray, audioArray, allColors, allSounds);
      //   return;
    }
    counter++;
    // return;
  });
}
// GAME OVER FUNCTION
function gameOver() {
  console.log("game Over");
  initialize();
}
// show player stats
// run keyListen
