let testHTML = {
  mainScreen: `            <div class="row">
  <div class="three columns" style="background-color: antiquewhite">
    <section id="instruction-section" class="info-section">
      <h3>Instructions</h3>
      <ul>
        <li>Point 1</li>
        <li>Point 2</li>
        <li>Point 3</li>
      </ul>
      <button class="button-primary" id="startBtn">Start</button>
    </section>
  </div>

  <div class="eight columns">
    <div id="canvas-container" style="background-color: grey"></div>
  </div>

  <div class="three columns" style="background-color: antiquewhite">
    <section id="sign-section" class="info-section hidden">
      <h3>Current sign</h3>
      <!-- <p>Letter B</p> -->
      <img id="sign-img" src="/images/Letter B.png" />
      <button class="button-primary" id="hintBtn">Hide Hint</button>
    </section>
  </div>
</div>

<div class="row">
  <!-- <div class="two columns" style="text-align: center"> -->
  <!-- <div><p>.</p></div> -->
  <!-- </div> -->
  <div class="four columns stats">
    <p><strong>Score</strong></p>
    <p id="score">0</p>
  </div>

  <div class="four columns stats">
    <p><strong>Time</strong></p>
    <p id="time">0</p>
  </div>
  <!-- <div class="two columns" style="text-align: center">
    <div><p>.</p></div>
  </div> -->
</div>`,

  splashScreen: `
  <div class="row" style="background-color: lightblue">
  <div class="ten columns">
    <h2>What is it?</h2>
    <p>
      This is a learning tool developed to help people practice sign
      language.
    </p>
  </div>
  <div class="two columns">
    <img class="icon" src="/images/online-learning.png" />
  </div>
</div>

<div class="row" style="background-color: lightgreen">
  <div class="ten columns">
    <h2>How to use it?</h2>
    <p>
      User's will be shown a letter of the ISL alphabet and have to
      replicate the sign using their webcam.
    </p>
  </div>
  <div class="two columns">
    <img class="icon" src="/images/hello.png" />
  </div>
</div>

<div class="row" style="background-color: lightyellow">
  <div class="ten columns">
    <h2>Ready?</h2>
    <p>
      Press the button below to go to the next screen - warning you will
      see your face!
    </p>
  </div>
  <div class="two columns">
    <img class="icon" src="/images/web-camera.png" />
  </div>
</div>
`,
};
