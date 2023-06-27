let device;
let windowSize;
let unit;
let views;
let capture;
let p = [];
let emote;

function showDebug() {
  fill(0);
  text("fps" + floor(frameRate()), 5, 10);
  //text("size" + p.length, 5, 20);
}
function preload() {
  heart = loadImage("assets/heart.png");
  emote = loadImage("assets/heart-emote.png");
}

function setup() {
  windowSize = min(windowWidth, (windowHeight / 16) * 9);
  unit = windowSize * 0.1;
  createCanvas(windowSize, (windowSize / 9) * 16);
  capture = createCapture(VIDEO);
  capture.hide();
  //showDebug();
}
function windowResized() {
  unit = windowSize * 0.1;
  windowSize = min(windowWidth, (windowHeight / 16) * 9);
  createCanvas(windowSize, (windowSize / 9) * 16);
}

function draw() {
  background(220);
  //showDebug();

  image(capture, 
        (width - (height / capture.height) * capture.width)/2,
        0,
        (height / capture.height) * capture.width, 
        height);

  rectMode(CENTER);
  fill("#C0306E");
  noStroke();
  rect(unit * 7, unit * 0.8, unit * 1.5, unit * 0.75, unit * 0.2);

  textSize(unit * 0.4);
  textAlign(CENTER, CENTER);
  fill(255);
  text("LIVE", unit * 7, unit * 0.8, unit * 1.5, unit * 0.75);

  image(
    heart,
    width - unit * 1.2,
    height - unit * 1.2,
    unit * 1,
    (unit * 5) / 6
  );

  rectMode(CORNER);
  noFill();
  strokeWeight(1);
  stroke(255);
  rect(unit * 0.5, height - unit * 1.3, unit * 8, unit * 1, unit * 0.5);

  textSize(unit * 0.5);
  textAlign(LEFT, CENTER);
  fill(255);
  noStroke();
  text("Comment", unit * 0.8, height - unit * 0.8);
  textAlign(RIGHT, BOTTOM);
  text("...", unit * 8, height - unit * 0.7);

  if (frameCount % 5 == 0) {
    p.push(
      new Particles(
        width - unit * (0.7 + random(0, 0.4)),
        height - unit * (0.8 + random(0, 0.4)),
        unit,
         random(0.2,0.5)
      )
    );
  }
  for (let i = 0; i < p.length; i++) {
    p[i].gravity(false);
    p[i].resistant();
    p[i].rotation();
    p[i].update();
    p[i].render(emote);
    if (p[i].del == true) {
      p.splice(i, 1);
    }
  }
  //noLoop();
}
