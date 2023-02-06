let pages = {
  homeScreen: `
  <div
  class="row"
  style="background-color: #bfdbf7; border: 1px solid #022b3a"
>
  <div class="ten columns">
    <h2>What is it?</h2>
    <p>
    Sign learn is a learning tool prototype developed to help people
    practice sign language.
    </p>
  </div>
  <div class="two columns">
    <img class="icon" src="./images/online-learning.png" />
  </div>
</div>

<div
  class="row"
  style="background-color: #bfdbf7; border: 1px solid #022b3a"
>
  <div class="ten columns">
    <h2>How to use it?</h2>
    <p>
      User's will be shown a letter of the ISL alphabet and have to
      replicate the sign using their webcam.
    </p>
  </div>
  <div class="two columns">
    <img class="icon" src="./images/learning.png" />
  </div>
</div>

<div
  class="row"
  style="background-color: #bfdbf7; border: 1px solid #022b3a"
>
  <div class="ten columns">
    <h2>Ready?</h2>
    <p>Press the button below to go to the next screen!</p>
  </div>
  <div class="two columns">
    <img class="icon" src="./images/webcam.png" />
  </div>
</div>
<div class="row">
  <div class="twelve columns"></div>
  <button class="button-primary" id="mainBtn">
    <i class="fa-solid fa-arrow-right fa-xl"></i>
  </button>
</div>
`,
  mainScreen: `         <div id="stat-container">
  <div class="four columns stat">
    <p><strong>Score</strong></p>
    <p id="score">0</p>
  </div>

  <div class="four columns stat">
    <p><strong>Time</strong></p>
    <p id="time">0</p>
  </div>
</div>
<div class="row">
  <div class="three columns">
    <section id="instruction-section" class="info-section">
      <h3>Instructions</h3>
      <ul>
        <li>
          Hold your hand in front of the camera to mimic the current
          sign.
        </li>        
        <li>
          If the circles are red, adjust your hand position until they are green.
        </li>
        <li>Get as many correct signs before the time runs out. Press start when you're ready!</li>
      </ul>
      <button class="button-primary" id="startBtn">Start</button>
    </section>
  </div>

  <div class="seven columns">
    <div id="canvas-container" style="background-color: grey"></div>
  </div>

  <div class="three columns">
    <section id="sign-section" class="info-section">
      <div id="sign-inner-container" class="hidden">
        <h3 id="current-sign">Letter B</h3>
        <img id="sign-img" src="./images/Letter B.png" />
        <button class="button-primary" id="hintBtn">Hide Hint</button>
      </div>
    </section>
  </div>
</div>`,
  results: `<h3 id="results">Results:</h3>
            `,
};
