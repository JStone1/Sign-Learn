let handpose;
let video;
let myCanvas;
let predictions = [];

let isReady = false;
let isMainScreen = false;
let time = 30;
let score = 0;
let startTime = false;
let signNumber = 0;

// variables to store finger coordinates
let indexFinger = [];
let middleFinger = [];
let pinkyFinger = [];
let ringFinger = [];
let thumb = [];
let palm = [];
let tipOfIndexFinger = [];
let tipOfRingFinger = [];
let tipOfMiddleFinger = [];
let tipOfThumb = [];
let baseOfPinky = [];
let baseOfRing = [];
let baseOfMiddle = [];
let baseOfIndex = [];

let homeBtn = document.getElementById("homeBtn");
let mainBtn = document.getElementById("mainBtn");
let timeInterval = setInterval(decrementTime, 1000);

function decrementTime() {
  if (startTime) {
    time -= 1;
  }
  // console.log(time);
  document.getElementById("time").innerHTML = time;

  if (time == 0) {
    clearInterval(timeInterval);
    document
      .getElementById("stat-container")
      .insertAdjacentHTML("beforebegin", pages.results);
  }
}

// button to move from the home screen to the main screen
mainBtn.addEventListener("click", () => {
  isMainScreen = true;
  document.getElementById("main-container").innerHTML = pages.mainScreen; // replace the page content with new html
  document.getElementById("homeBtn").classList.remove("hidden");
  // reinitialise the button element and re add the event listner
  let hintBtn = document.getElementById("hintBtn");
  hintBtn.addEventListener("click", () => {
    document.getElementById("sign-img").classList.toggle("hidden");
    if (hintBtn.innerHTML === "Hide Hint") {
      hintBtn.innerHTML = "Show Hint";
    } else {
      hintBtn.innerHTML = "Hide Hint";
    }
  });

  // checks if on the main screen the sets up the position and visibility of the game when start button is clicked
  if (isMainScreen) {
    let startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click", () => {
      if (isReady) {
        myCanvas.parent("canvas-container");
        myCanvas.show();
        document
          .getElementById("sign-inner-container")
          .classList.remove("hidden");
        startTime = true;
        signNumber = 1;
      }
    });
  }

  document.getElementById("sign-inner-container").classList.add("hidden");
});

// button to move from main screen to home screen
homeBtn.addEventListener("click", () => {
  isMainScreen = false;
  clearInterval(timeInterval);

  // changes to home screen and resets stats
  document.getElementById("main-container").innerHTML = pages.homeScreen;
  startTime = false;
  time = 30;
  score = 0;

  document.getElementById("homeBtn").classList.add("hidden");

  // creating new buttons with new listeners as old ones get destroyed when user changes page - talked about in dev doc
  let newMainBtn = document.getElementById("mainBtn");
  newMainBtn.addEventListener("click", () => {
    timeInterval = setInterval(decrementTime, 1000);
    isMainScreen = true;
    document.getElementById("main-container").innerHTML = pages.mainScreen;
    document.getElementById("homeBtn").classList.remove("hidden");

    let newHintBtn = document.getElementById("hintBtn");
    newHintBtn.addEventListener("click", () => {
      document.getElementById("sign-img").classList.toggle("hidden");
      if (newHintBtn.innerHTML === "Hide Hint") {
        newHintBtn.innerHTML = "Show Hint";
      } else {
        newHintBtn.innerHTML = "Hide Hint";
      }
    });

    let newStartBtn = document.getElementById("startBtn");
    if (isMainScreen) {
      newStartBtn.addEventListener("click", () => {
        if (isReady) {
          myCanvas.parent("canvas-container");
          myCanvas.show();
          document
            .getElementById("sign-inner-container")
            .classList.remove("hidden");
          startTime = true;
          signNumber = 1;
        }
      });
    }
  });
  // myCanvas.hide();
});

// p5 setup function that creates the canvas and video when program is run
// some of following code is adapted from ml5 handpose model starter code: https://learn.ml5js.org/#/reference/handpose
function setup() {
  myCanvas = createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width, height);
  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
    predictions = results;
    if (results) {
      // console.log("Got results");
      //   console.log(results);
      if (results[0]) {
        // console.log("Got first object in results array");
        // console.log(results[0]);
        if (results[0].annotations) {
          // console.log("Got annotations");
          // console.log(results[0].annotations);

          // assign finger coordinates data to variables
          indexFinger = results[0].annotations.indexFinger;
          middleFinger = results[0].annotations.middleFinger;
          pinkyFinger = results[0].annotations.pinky;
          ringFinger = results[0].annotations.ringFinger;
          thumb = results[0].annotations.thumb;
          palm = results[0].annotations.palmBase;

          // variables for letters
          tipOfThumb = results[0].annotations.thumb[3];
          baseOfPinky = results[0].annotations.pinky[0];
          tipOfIndexFinger = results[0].annotations.indexFinger[3];
          tipOfMiddleFinger = results[0].annotations.middleFinger[3];
          tipOfRingFinger = results[0].annotations.ringFinger[3];
          baseOfIndex = results[0].annotations.indexFinger[0];
          baseOfMiddle = results[0].annotations.middleFinger[0];
          baseOfRing = results[0].annotations.ringFinger[0];

          // output finger data for debugging
          // console.log("Index finger: ", indexFinger);
          // console.log("Middle finger: ", middleFinger);
          // console.log("Pinky finger: ", pinkyFinger);
          // console.log("Ring finger: ", ringFinger);
          // console.log("Thumb: ", thumb);
          // console.log("Palm: ", palm);
          // console.log("Tip of index: ", tipOfIndexFinger);
        } else {
          // console.log("No annotations");
        }
      } else {
        // console.log("No first object in results array");
      }
    } else {
      // console.log("No results");
    }
    // console.log(results[0]);
  });

  // Hide the video element, and just show the canvas
  video.hide();
  myCanvas.hide();
}

// page visibiltiy api that changes document title
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    document.title = "Sign Learn - Come back!";
  } else {
    video.play();
    document.title = "Sign Learn";
  }
});

function modelReady() {
  isReady = true;
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
// some code adapted from handpose example: https://editor.p5js.org/ml5/sketches/Handpose_Webcam
function drawKeypoints() {
  const circleOfThumb = tipOfThumb;
  const circleOfPinky = baseOfPinky;
  const circleOfRing = tipOfRingFinger;
  const circleBaseOfRing = baseOfRing;
  const circleOfMiddle = tipOfMiddleFinger;
  const circleBaseOfMiddle = baseOfMiddle;
  const circleOfIndex = tipOfIndexFinger;
  const circleBaseOfIndex = baseOfIndex;

  switch (
    signNumber // checks which letter the user is currently on
  ) {
    case 1:
      let distance = dist(
        // dist function checks the distance between x and y coordinates from two points on the canvas
        baseOfPinky[0],
        baseOfPinky[1],
        tipOfThumb[0],
        tipOfThumb[1]
      );

      // sets circles to red
      fill(255, 0, 0);
      noStroke();
      ellipse(circleOfThumb[0], circleOfThumb[1], 7, 7);
      fill(255, 0, 0);
      noStroke();
      ellipse(circleOfPinky[0], circleOfPinky[1], 7, 7);

      // if user is making correct sign then turns circles to green and runs the next function
      if (distance < 50) {
        fill(0, 255, 0);
        noStroke();
        ellipse(circleOfPinky[0], circleOfPinky[1], 7, 7);
        fill(0, 255, 0);
        noStroke();
        ellipse(circleOfThumb[0], circleOfThumb[1], 7, 7);

        setTimeout(letterB, 3000);
      }
      break;
    case 2:
      let thumbDistance = dist(
        tipOfIndexFinger[0],
        tipOfIndexFinger[1],
        tipOfThumb[0],
        tipOfThumb[1]
      );

      fill(255, 0, 0);
      noStroke();
      ellipse(circleOfThumb[0], circleOfThumb[1], 7, 7);
      fill(255, 0, 0);
      noStroke();
      ellipse(circleOfIndex[0], circleOfIndex[1], 7, 7);

      if (thumbDistance > 50 && thumbDistance < 90) {
        fill(0, 255, 0);
        noStroke();
        ellipse(circleOfThumb[0], circleOfThumb[1], 7, 7);

        fill(0, 255, 0);
        noStroke();
        ellipse(circleOfIndex[0], circleOfIndex[1], 7, 7);

        setTimeout(letterC, 3000);
      }
      break;
    case 3:
      fill(255, 0, 0);
      noStroke();
      ellipse(circleOfRing[0], circleOfRing[1], 7, 7);
      fill(255, 0, 0);
      noStroke();
      ellipse(circleOfMiddle[0], circleOfMiddle[1], 7, 7);
      fill(255, 0, 0);
      noStroke();
      ellipse(circleOfIndex[0], circleOfIndex[1], 7, 7);

      let ringDistance = dist(
        baseOfRing[0],
        baseOfRing[1],
        tipOfRingFinger[0],
        tipOfRingFinger[1]
      );
      let middleDistance = dist(
        baseOfMiddle[0],
        baseOfMiddle[1],
        tipOfMiddleFinger[0],
        tipOfMiddleFinger[1]
      );
      let indexDistance = dist(
        baseOfIndex[0],
        baseOfIndex[1],
        tipOfIndexFinger[0],
        tipOfIndexFinger[1]
      );

      if (
        ringDistance > 50 &&
        middleDistance > 50 &&
        indexDistance > 45 &&
        tipOfMiddleFinger[1] > baseOfMiddle[1]
      ) {
        fill(0, 255, 0);
        noStroke();
        ellipse(circleOfRing[0], circleOfRing[1], 7, 7);
        fill(0, 255, 0);
        noStroke();
        ellipse(circleOfMiddle[0], circleOfMiddle[1], 7, 7);
        fill(0, 255, 0);
        noStroke();
        ellipse(circleOfIndex[0], circleOfIndex[1], 7, 7);

        setTimeout(letterY, 3000);
      }
      break;
    case 4:
      document.getElementById("sign-inner-container").innerHTML =
        "All signs complete!";
      document.getElementById("sign-inner-container").style.textAlign =
        "center";
      document.getElementById("startBtn").classList.add("hidden");
      for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i];
        for (let j = 0; j < prediction.landmarks.length; j += 1) {
          const keypoint = prediction.landmarks[j];
          fill(191, 219, 247);
          ellipse(keypoint[0], keypoint[1], 7, 7);
        }
      }
      break;
  }
}

function letterB() {
  if (signNumber == 1) {
    signNumber++;
    score++;
    document.getElementById("score").innerHTML = score;
    document.getElementById("sign-img").src = "./images/Letter C.png";
    document.getElementById("sign-img").style.width = "90%";
    document.getElementById("current-sign").innerHTML = "Letter C";
  }
}

function letterC() {
  if (signNumber == 2) {
    signNumber++;
    score++;
    document.getElementById("score").innerHTML = score;
    document.getElementById("sign-img").src = "./images/Letter Y.png";
    document.getElementById("sign-img").style.width = "90%";
    document.getElementById("current-sign").innerHTML = "Letter Y";
  }
}

function letterY() {
  if (signNumber == 3) {
    signNumber++;
    score++;
    clearInterval(timeInterval);
    document.getElementById("score").innerHTML = score;
    document
      .getElementById("stat-container")
      .insertAdjacentHTML("beforebegin", pages.results);
  }
}
