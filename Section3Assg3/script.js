let x = 0;
let y = 0;
let stepSize = 5.0;

let font = 'Georgia';
let inputText = '';
let fontSizeMin = 3;
let angleDistortion = 0.0;

let counter = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(255);
  textFont(font);
  fill(0);

  let input = select('#textInput');
  input.changed(updateText);
}

function updateText() {
  inputText = this.value();
  counter = 0;
  background(255);
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) {
    let d = dist(x, y, mouseX, mouseY);
    textSize(fontSizeMin + d / 2);
    let newLetter = inputText.charAt(counter);
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      let angle = atan2(mouseY - y, mouseX - x);

    // random color values for the gradient effect
      let r1 = random(255);
      let g1 = random(255);
      let b1 = random(255);
      let a1 = random(255);
      let a2 = random(255);
      let r2 = random(255);
      let g2 = random(255);
      let b2 = random(255);

      let startColor = color(r1,g1,b1,a1);
      let endColor = color(r2,b2,g2,a2);

      // Set text color as a linear gradient
      let gradientColor = lerpColor(startColor, endColor, mouseX / width);
      fill(gradientColor);

      push();
      translate(x, y);
      rotate(angle + random(angleDistortion));
      text(newLetter, 0, 0);
      pop();

      counter++;
      if (counter >= inputText.length) counter = 0;

      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}

function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
}