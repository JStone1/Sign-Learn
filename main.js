let handpose;
let video;
let myCanvas;
let predictions = [];

// variables to store finger coordinates
let indexFinger = [];
let middleFinger = [];
let pinkyFinger = [];
let ringFinger = [];
let thumb = [];
let palm = [];
let tipOfIndexFinger = [];
let tipOfThumb = [];
let baseOfPinky = [];

let signHint = document.getElementById("placeholder-sign");
let hintBtn = document.getElementById("hintBtn");

let heart1 = document.getElementById("heart1");
let heart2 = document.getElementById("heart2");
let heart3 = document.getElementById("heart3");

hintBtn.addEventListener("click", () => {
  // signHint.classList.toggle("invisible");
  console.log(testHTML.splashScreen);
  document.getElementById("main-container").innerHTML = testHTML.splashScreen;
});

heart1.addEventListener("click", () => {
  heart1.classList.toggle("invisible");
});
heart2.addEventListener("click", () => {
  heart2.classList.toggle("invisible");
});
heart3.addEventListener("click", () => {
  heart3.classList.toggle("invisible");
});

function setup() {
  myCanvas = createCanvas(640, 480);
  myCanvas.parent("canvas-container");
  video = createCapture(VIDEO);
  video.size(width, height);

  console.log(myCanvas);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
    predictions = results;
    if (results) {
      console.log("Got results");
      //   console.log(results);
      if (results[0]) {
        console.log("Got first object in results array");
        // console.log(results[0]);
        if (results[0].annotations) {
          console.log("Got annotations");
          console.log(results[0].annotations);

          // assign finger coordinates data to variables
          indexFinger = results[0].annotations.indexFinger;
          middleFinger = results[0].annotations.middleFinger;
          pinkyFinger = results[0].annotations.pinky;
          ringFinger = results[0].annotations.ringFinger;
          thumb = results[0].annotations.thumb;
          palm = results[0].annotations.palmBase;

          tipOfIndexFinger = results[0].annotations.indexFinger[3];
          tipOfThumb = results[0].annotations.thumb[3];
          baseOfPinky = results[0].annotations.pinky[0];
          // middleFinger = results[0].annotations.middleFinger;
          // pinkyFinger = results[0].annotations.pinky;
          // ringFinger = results[0].annotations.ringFinger;
          // thumb = results[0].annotations.thumb;
          // palm = results[0].annotations.palmBase;

          // output finger data for debugging
          console.log("Index finger: ", indexFinger);
          console.log("Middle finger: ", middleFinger);
          console.log("Pinky finger: ", pinkyFinger);
          console.log("Ring finger: ", ringFinger);
          console.log("Thumb: ", thumb);
          console.log("Palm: ", palm);
          console.log("Tip of index: ", tipOfIndexFinger);
        } else {
          console.log("No annotations");
        }
      } else {
        console.log("No first object in results array");
      }
    } else {
      console.log("No results");
    }
    // console.log(results[0]);
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    console.log("Browser tab is hidden");
    video.pause();
    document.title = "Video paused";
  } else {
    console.log("Browser tab is visible");
    video.play();
    document.title = "Video playing";
  }
});

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  // drawTipOfIndex();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      const circleOfIndex = tipOfIndexFinger;
      fill(255, 0, 0);
      noStroke();
      ellipse(circleOfIndex[0], circleOfIndex[1], 10, 10);

      const circleOfThumb = tipOfThumb;
      fill(0, 0, 255);
      noStroke();
      ellipse(circleOfThumb[0], circleOfThumb[1], 10, 10);

      const circleOfPinky = baseOfPinky;
      fill(10, 190, 230);
      noStroke();
      ellipse(circleOfPinky[0], circleOfPinky[1], 10, 10);

      // code for the ISL letter B
      let distance = dist(
        baseOfPinky[0],
        baseOfPinky[1],
        tipOfThumb[0],
        tipOfThumb[1]
      );

      console.log(distance);

      if (distance < 50) {
        console.log("Close together");
        document.getElementById("placeholder-sign").classList.add("correct");
        document
          .getElementById("placeholder-sign")
          .classList.remove("incorrect");
        fill(255, 255, 0);
        noStroke();
        ellipse(baseOfPinky, baseOfPinky[1], 10, 10);

        fill(0, 255, 255);
        noStroke();
        ellipse(circleOfThumb[0], circleOfThumb[1], 10, 10);
      } else {
        document.getElementById("placeholder-sign").classList.add("incorrect");
        document.getElementById("placeholder-sign").classList.add("correct");
      }
    }
  }
}

// function drawTipOfIndex() {
//   const circleOfIndex = tipOfIndexFinger;
//   fill(255, 0, 0);
//   noStroke();
//   ellipse(circleOfIndex[0], circleOfIndex[1], 10, 10);
// }
