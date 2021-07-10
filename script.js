// algorithm
// global variables
let counter = 0;
let colorArray = [];
let audioArray = [];

// interval object
let intObj = {
  id: "",
};

// HTML object (values to be changed when theme is changed)
// let htmlObj = {
//   simonPageTitle: "Simon Memory Game",
//   runePageTitle: "RuneStone Raider",
//   simonTitle: `<span id="s">S</span><span id="i">I</span><span id="m">M</span
//   ><span id="o">O</span><span id="n">N</span> Memory Game`,
//   runeTitle: `R<span style="font-size: 3.5rem">une</span>S<span
//   style="font-size: 3.5rem"
//   >tone</span
// >`,
// };

let htmlObj = {
  simonTheme: {
    pageTitle: "Simon Memory Game",
    gameTitle: `<span id="s">S</span><span id="i">I</span><span id="m">M</span><span id="o">O</span><span id="n">N</span> Memory Game`,
  },
  runeTheme: {
    pageTitle: "RuneStone Raider",
    gameTitle: `R<span style="font-size: 3.5rem">une</span>S<span style="font-size: 3.5rem">tone</span>`,
  },
  threeTheme: {
    pageTitle: "RuneStone Raider",
    gameTitle: `R<span style="font-size: 3.5rem">une</span>S<span style="font-size: 3.5rem">tone</span>`,
  },
};

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

// event listeners for rules visibility
$("#rules-btn").click(function () {
  $("#rules").toggle();
});
$(".fa-times-circle").click(function () {
  $("#rules").toggle();
});

// create animation for "Simon" in title
function simonColorInterval() {
  // if (clear) {
  //   console.log("true");
  //   clearInterval(myInterval);
  //   return;
  // }
  let myInterval = setInterval(interval, 250);
  console.log(myInterval);
  intObj.id = myInterval;
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
}

// event listener for themes button
$(document).ready(function () {
  $("#themes").click(function () {
    let menuOpacity = $(".menu").css("opacity");
    if (menuOpacity === "0") {
      $(".menu").css("opacity", 1);
    } else {
      $(".menu").css("opacity", 0);
    }
  });
});

// event listners for indivual theme buttons
$(document).ready(function () {
  $(".singleTheme").click(function (event) {
    themeId = event.target.id;
    console.log("event id: " + themeId);
    $(".menu").css("opacity", 0);
    $("#cssLink").attr("href", `${themeId}.css`);
    changeHTML(themeId);
  });
});

// change html values based on selected theme
function changeHTML(themeId) {
  $("#page-title").text(htmlObj[themeId].pageTitle);
  $("#title").html(htmlObj[themeId].gameTitle);
  if (themeId === "simonTheme") {
    // start simon title animation
    simonColorInterval();
  } else {
    // stop simon title animation
    clearInterval(intObj.id);
  }
}

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

// event listener for player clicks on colors
function listenForPlayer() {
  $(".btn").click(function (event) {
    playerPlay(event);
  });
}

// simonPlay function
function simonPlay() {
  counter = 0;
  // random number 0-3 to choose random index from colorArray
  let rndNum = Math.floor(Math.random() * 4);

  // push random color to colorArray and audioArray
  colorArray.push(allColors[rndNum]);
  audioArray.push(allSounds[rndNum]);

  console.log(colorArray, audioArray);
  // loop through current simon array and light up colors then listen for player click
  for (let i = 0; i < colorArray.length; i++) {
    setTimeout(() => {
      $("#" + colorArray[i]).addClass("pressed");
      $(`#${colorArray[i]}Sound`).trigger("play");

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
  $("#" + event.target.id).addClass("player-pressed");
  setTimeout(() => {
    $("#" + event.target.id).removeClass("player-pressed");
  }, 200);
  // if color clicked is correct, play corresponding sound
  if (event.target.id === colorArray[counter]) {
    $(`#${event.target.id}Sound`).trigger("play");
  } else {
    // on wrong click, play wrong.mp3 and end game
    audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    $("#result")
      .css({ color: "rgb(255, 0, 149)", "text-shadow": "1px 1px white" })
      .text("POORLY!");
    $("#score").text(`${colorArray.length - 1}`);
    gameOver();
    return;
  }
  // check if color clicked is last color in pattern, update result and score, and let Simon play
  if (counter === colorArray.length - 1) {
    $(".btn").off("click");
    // update player stats
    $("#result")
      .css({ color: "rgb(5, 228, 5)", "text-shadow": "1px 1px white" })
      .text("WISELY!");
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
