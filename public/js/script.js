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
}

function emojiSelectEvent() {
  const emojiSelect = document.getElementById("emoji-select");
  const emojiDisplay = document.getElementById("current-emoji");
  currentEmoji = emojiSelect.value;
  emojiDisplay.innerText = emojiSelect.value;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(color(255, 255, 255));
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
  save("your-awesome-emoji-drawing.jpg");
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
  const infoBoxBtn = document.getElementById("info-box-btn");
  const infoBox = document.getElementById("info-box");
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
  infoBoxBtn.addEventListener("click", (event) => {
    if (event.target.innerText === "❓") {
      infoBox.classList.add("open");
      infoBox.classList.remove("closed");
      infoBoxBtn.innerText = "❌";
      infoBox.setAttribute("aria-hidden", false);
      infoBox.setAttribute("tabindex", 1);
      infoBoxBtn.setAttribute("title", "Close Help Menu");
      infoBoxBtn.setAttribute("aria-label", "Close help menu");
    } else {
      infoBox.classList.remove("open");
      infoBox.classList.add("closed");
      infoBoxBtn.innerText = "❓";
      infoBox.setAttribute("aria-hidden", true);
      infoBox.setAttribute("tabindex", -1);
      infoBoxBtn.setAttribute("title", "Questions?");
      infoBoxBtn.setAttribute("aria-label", "Click to learn how to use the emoji drawing buttons");
    }
  });
});