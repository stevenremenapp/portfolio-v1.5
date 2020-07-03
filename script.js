let saveButton,
  clearButton,
  buttonIsClicked,
  canvasIsClicked,
  previousBackgroundColor,
  currentBackgroundColor;
let currentEmojiCode = "1F63B";

function setup() {
  createCanvas(windowWidth, windowHeight);
  previousBackgroundColor = color(255, 255, 255);
  currentBackgroundColor = color(255, 255, 255);
  background(currentBackgroundColor);
  // Creating the save button for the file
  saveButton = createButton(String.fromCodePoint(0x1f4be));
  saveButton.position(10, 10, "fixed");
  saveButton.mousePressed(saveFile);
  saveButton.class("btn");
  saveButton.attribute("title", "Save");
  saveButton.attribute("aria-label", "Save");
  // Creating the clear button
  clearButton = createButton("🗑️");
  clearButton.position(75, 10, "fixed");
  clearButton.mousePressed(clearScreen);
  clearButton.class("btn");
  clearButton.attribute("title", "Clear");
  clearButton.attribute("aria-label", "Clear");
  // Creating the emoji option button
  emojiSelect = createSelect();
  emojiSelect.position(140, 10, "fixed");
  emojiSelect.class("btn");
  emojiSelect.attribute("title", "Change Emoji");
  emojiSelect.attribute("aria-label", "Change Emoji");
  emojiSelect.option(String.fromCodePoint(0x1f63b));
  emojiSelect.option(String.fromCodePoint(0x1f308));
  emojiSelect.option(String.fromCodePoint(0x1f4a9));
  emojiSelect.option(String.fromCodePoint(0x1f493));
  emojiSelect.option(String.fromCodePoint(0x1f984));
  emojiSelect.option(String.fromCodePoint(0x1f61c));
  emojiSelect.option(String.fromCodePoint(0x1f973));
  emojiSelect.option(String.fromCodePoint(0x1f92f));
  emojiSelect.option(String.fromCodePoint(0x1f920));
  emojiSelect.option(String.fromCodePoint(0x1f976));
  emojiSelect.option(String.fromCodePoint(0x1f576));
  emojiSelect.option(String.fromCodePoint(0x1f441));
  emojiSelect.option(String.fromCodePoint(0x1f412));
  emojiSelect.changed(emojiSelectEvent);
  startColor = color(255, 255, 255);
  newColor = color(0, 255, 255);
  amt = 0;
}

function emojiSelectEvent() {
  let emojis = {
    "🌈": "1F308",
    "😻": "1F63B",
    "💩": "1F4A9",
    "💓": "1F493",
    "🦄": "1F984",
    "😜": "1F61C",
    "🥳": "1F973",
    "🤯": "1F92F",
    "🤠": "1F920",
    "🥶": "1F976",
    "🕶": "1F576",
    "👁": "1F441",
    "🐒": "1F412"
  };
  let emoji = emojiSelect.value();
  currentEmojiCode = emojis[emoji];
  // console.log(emoji);
  // console.log(currentEmojiCode);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(event) {
  // console.log(event.target.tagName);
  if (event.target.tagName !== "BUTTON" && event.target.tagName !== "SELECT") {
    // console.log(true);
    canvasIsClicked = true;
  } else {
    // console.log(false);
    canvasIsClicked = false;
  }
  if (!event.target.dataset.r) {
    return;
  } else {
    // console.log(setBackgroundColor(event.target.dataset.color));
    previousBackgroundColor = currentBackgroundColor;
    // currentBackgroundColor = event.target.dataset.color;
    currentBackgroundColor = color(
      event.target.dataset.r,
      event.target.dataset.g,
      event.target.dataset.b
    );
    // console.log(previousBackgroundColor, currentBackgroundColor);
    background(lerpColor(previousBackgroundColor, currentBackgroundColor, 0.5));
  }
}

function keyPressed(event) {
  console.log(event.target.title);
  if (keyCode !== ENTER) {
    return;
  }
  if (event.target.dataset.r) {
    // console.log(setBackgroundColor(event.target.dataset.color));
    previousBackgroundColor = currentBackgroundColor;
    // currentBackgroundColor = event.target.dataset.color;
    currentBackgroundColor = color(
      event.target.dataset.r,
      event.target.dataset.g,
      event.target.dataset.b
    );
    // console.log(previousBackgroundColor, currentBackgroundColor);
    background(lerpColor(previousBackgroundColor, currentBackgroundColor, 0.5));
  }
  if (event.target.title === "Clear") {
    clearScreen();
  }
  if (event.target.title === "Save") {
    saveFile();
  }
}

function draw() {
  // Call the drawEmoji() method and send it the
  // parameters for the current mouse position
  // and the previous mouse position
  if (mouseIsPressed && canvasIsClicked) {
    // console.log(canvasIsClicked);
    // console.log(buttonIsClicked());
    drawEmoji(mouseX, mouseY, pmouseX, pmouseY);
  }
}

// The simple method variableEllipse() was created specifically
// for this program. It calculates the speed of the mouse
// and draws a small ellipse if the mouse is moving slowly
// and draws a large ellipse if the mouse is moving quickly

function drawEmoji(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  if (speed < 30) {
    speed = 30;
  }
  textSize(speed);
  text(String.fromCodePoint(`0x${currentEmojiCode}`), x, y);
}

function saveFile() {
  save("wut.jpg");
}

function clearScreen() {
  previousBackgroundColor = currentBackgroundColor;
  currentBackgroundColor = color(255, 255, 255);
  background(currentBackgroundColor);
}