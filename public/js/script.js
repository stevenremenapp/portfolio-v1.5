let saveButton,
  clearButton,
  buttonIsClicked,
  canvasIsClicked,
  previousBackgroundColor,
  currentBackgroundColor;
let currentEmoji = "😻";

function setup() {
  createCanvas(windowWidth, windowHeight);
  previousBackgroundColor = color(255, 255, 255);
  currentBackgroundColor = color(255, 255, 255);
  background(currentBackgroundColor);
  // Creating the save button for the file
  saveButton = createButton("💾");
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
  emojiSelect.option("😻");
  emojiSelect.option("🌈");
  emojiSelect.option("💩");
  emojiSelect.option("💓");
  emojiSelect.option("🦄");
  emojiSelect.option("😜");
  emojiSelect.option("🤯");
  emojiSelect.option("🤠");
  emojiSelect.option("🕶");
  emojiSelect.option("👁");
  emojiSelect.option("🐒");
  emojiSelect.changed(emojiSelectEvent);
}

function emojiSelectEvent() {
  currentEmoji = emojiSelect.value();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(event) {
  // console.log(event);
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
  // console.log(event.target.title);
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
    drawEmoji(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function drawEmoji(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  if (speed < 30) {
    speed = 30;
  }
  textSize(speed);
  text(currentEmoji, x, y);
}

function saveFile() {
  save("wut.jpg");
}

function clearScreen() {
  previousBackgroundColor = currentBackgroundColor;
  currentBackgroundColor = color(255, 255, 255);
  background(currentBackgroundColor);
}

document.addEventListener("DOMContentLoaded", () => {
  // Handle menu
  const menu = document.getElementById("menu");
  const openMenu = document.getElementById("open-menu");
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const body = document.getElementsByTagName("body")[0];
  menu.addEventListener("click", () => {
    body.style.overflow = "hidden";
    openMenu.classList.add("open");
    openMenu.setAttribute("aria-hidden", false);
    openMenu.setAttribute("tabindex", 1);
    setTimeout(() => {
      closeMenuBtn.focus();
    }, 100);
  });
  closeMenuBtn.addEventListener("click", () => {
    openMenu.classList.remove("open");
    openMenu.setAttribute("aria-hidden", true);
    openMenu.setAttribute("tabindex", -1);
    body.style.overflow = "visible";
    menu.focus();
  });
});