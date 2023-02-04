let handpose;
let video;
let myCanvas;
let predictions = [];
let isReady = false;
let isMainScreen = false;

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

let time = 30;
let score = 0;
let startTime = false;

let signNumber = 0;

let splashBtn = document.getElementById("splashBtn");
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
    console.log("Times up");
  }
}

if (isMainScreen) {
  startBtn.addEventListener("click", () => {
    if (isReady) {
      myCanvas.parent("canvas-container");
      myCanvas.show();
      document
        .getElementById("sign-inner-container")
        .classList.remove("hidden");
      signNumber = 1;
    }
  });

  hintBtn.addEventListener("click", () => {
    document.getElementById("sign-img").classList.toggle("hidden");
    if (hintBtn.innerHTML === "Hide Hint") {
      hintBtn.innerHTML = "Show Hint";
    } else {
      hintBtn.innerHTML = "Hide Hint";
    }
  });
}

mainBtn.addEventListener("click", () => {
  isMainScreen = true;
  console.log("Is main screen: ", isMainScreen);
  console.log("Is ready: ", isReady);
  document.getElementById("main-container").innerHTML = pages.mainScreen; // replace the page content with new html
  document.getElementById("splashBtn").classList.remove("hidden");
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

splashBtn.addEventListener("click", () => {
  isMainScreen = false;
  console.log("Is main screen: ", isMainScreen);

  document.getElementById("main-container").innerHTML = pages.splashScreen;
  startTime = false;
  time = 30;
  score = 0;

  document.getElementById("splashBtn").classList.add("hidden");

  let newMainBtn = document.getElementById("mainBtn");
  newMainBtn.addEventListener("click", () => {
    timeInterval = setInterval(decrementTime, 1000);
    isMainScreen = true;
    console.log("Is main screen: ", isMainScreen);
    document.getElementById("main-container").innerHTML = pages.mainScreen; // replace the page content
    document.getElementById("splashBtn").classList.remove("hidden");

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

function setup() {
  myCanvas = createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width, height);

  console.log(myCanvas);

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

          // variables for letter B
          tipOfThumb = results[0].annotations.thumb[3];
          baseOfPinky = results[0].annotations.pinky[0];

          // variables for letter Y
          tipOfIndexFinger = results[0].annotations.indexFinger[3];
          tipOfMiddleFinger = results[0].annotations.middleFinger[3];
          tipOfRingFinger = results[0].annotations.ringFinger[3];
          baseOfIndex = results[0].annotations.indexFinger[0];
          baseOfMiddle = results[0].annotations.middleFinger[0];
          baseOfRing = results[0].annotations.ringFinger[0];
          // middleFinger = results[0].annotations.middleFinger;
          // pinkyFinger = results[0].annotations.pinky;
          // ringFinger = results[0].annotations.ringFinger;
          // thumb = results[0].annotations.thumb;
          // palm = results[0].annotations.palmBase;

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
  console.log(isReady);
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  // drawTipOfIndex();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  const circleOfThumb = tipOfThumb;
  const circleOfPinky = baseOfPinky;
  const circleOfRing = tipOfRingFinger;
  const circleBaseOfRing = baseOfRing;
  const circleOfMiddle = tipOfMiddleFinger;
  const circleBaseOfMiddle = baseOfMiddle;
  const circleOfIndex = tipOfIndexFinger;
  const circleBaseOfIndex = baseOfIndex;

  switch (signNumber) {
    case 1:
      let distance = dist(
        baseOfPinky[0],
        baseOfPinky[1],
        tipOfThumb[0],
        tipOfThumb[1]
      );
      fill(255, 0, 0);
      noStroke();
      ellipse(circleOfThumb[0], circleOfThumb[1], 7, 7);

      fill(255, 0, 0);
      noStroke();
      ellipse(circleOfPinky[0], circleOfPinky[1], 7, 7);
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
      // document.getElementById("sign-inner-container").classList.add("hidden");
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
          // noStroke();
          ellipse(keypoint[0], keypoint[1], 7, 7);
        }
        console.log("All signs complete - well done!");
      }
      break;
  }
}

// showResults();

// function showResults() {
//   document.getElementById("stat-container").innerHTML =
//     "All signs done - Well done!";
// }

function letterB() {
  if (signNumber == 1) {
    console.log("B correct!");
    signNumber++;
    score++;
    document.getElementById("score").innerHTML = score;
    document.getElementById("sign-img").src = "./images/Letter C.png";
    document.getElementById("sign-img").style.width = "90%";
    document.getElementById("current-sign").innerHTML = "Letter C";
    console.log("Sign number: ", signNumber);
  }
}

function letterC() {
  if (signNumber == 2) {
    console.log("C correct!");
    signNumber++;
    score++;
    document.getElementById("score").innerHTML = score;
    document.getElementById("sign-img").src = "./images/Letter Y.png";
    document.getElementById("sign-img").style.width = "90%";
    document.getElementById("current-sign").innerHTML = "Letter Y";

    console.log("Sign number: ", signNumber);
  }
}

function letterY() {
  if (signNumber == 3) {
    console.log("F correct!");
    signNumber++;
    score++;
    clearInterval(timeInterval);
    document.getElementById("score").innerHTML = score;
    console.log(document.getElementById("stat-container"));
    document
      .getElementById("stat-container")
      .insertAdjacentHTML("beforebegin", pages.results);
    console.log("Sign number: ", signNumber);
  }
}
