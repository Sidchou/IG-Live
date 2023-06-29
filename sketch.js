let device;
let windowSize;
let unit;
let views;
let capture;
let p = [];
let emote;
let pix;
let pixCache = [];
let tester = 0;
let movements = 0;
let sampleRates = 5;
let likeRate = 0.5;
let isMobile = false;

function showDebug() {
  push();

  textSize(12);
  textAlign(LEFT, TOP);
  fill(255);
  text("fps" + floor(frameRate()), 5, 10);
  text("movements " + movements, 5, 20);
  text(likeRate, 5, 30);

  pop();
}

function getDevice() {
  let agent = window.navigator.userAgent;
  if (
    agent.match(/Android/i) ||
    agent.match(/iPhone/i) ||
    agent.match(/iPad/i)
  ) {
    isMobile = true;
  }
  if (isMobile) {
    sampleRates = floor(unit);
  }
}
function preload() {
  heart = loadImage("assets/heart.png");
  emote = loadImage("assets/heart-emote.png");
  getDevice();
}

function setup() {
  windowSize = min(windowWidth, (windowHeight / 16) * 9);
  unit = windowSize * 0.1;
  createCanvas(windowSize, (windowSize / 9) * 16);
  capture = createCapture(VIDEO);
  capture.hide();
  //showDebug();
  pix = createGraphics(unit * 5, unit * 10);
}
function windowResized() {
  windowSize = min(windowWidth, (windowHeight / 16) * 9);
  unit = windowSize * 0.1;
  createCanvas(windowSize, (windowSize / 9) * 16);
  pix = createGraphics(unit * 5, unit * 10);
}

function draw() {
  background(220);

  image(
    capture,
    (width - (height / capture.height) * capture.width) / 2,
    0,
    (height / capture.height) * capture.width,
    height
  );

  if (frameCount % 5 == 0) {
    pixelMovements();
  }

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

  if (frameCount % 7 == 0) {
    if (random() < likeRate) {
      p.push(
        new Particles(
          width - unit * (0.7 + random(0, 0.4)),
          height - unit * (0.8 + random(0, 0.4)),
          unit,
          random(0.35, 0.5)
        )
      );
    }
  }
  if (frameCount % 3 == 0) {
    if (random() < likeRate) {
      p.push(
        new Particles(
          width - unit * (0.7 + random(0, 0.4)),
          height - unit * (0.8 + random(0, 0.4)),
          unit,
          random(0.1, 0.25)
        )
      );
    }
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
  //showDebug();
  //noLoop();
}

function pixelMovements() {
  pix = createGraphics(unit * 4, unit * 8);
  pix = get(unit * 2, unit * 4, unit * 4, unit * 8);
  pix.filter(BLUR, 3);
  pix.loadPixels();
  //pix.pixelDensity(1);
  movements = 0;

  for (var i = 0; i < pix.width; i += sampleRates) {
    for (var j = 0; j < pix.height; j += sampleRates) {
      //movements +=  abs(floor((pixCache[ (i* pix.width + j) * 5] - pix.pixels[(i* pix.width + j) * 5])/10))
      tester = pixCache[i * pix.width + j] - pix.pixels[i * pix.width + j];
      if (tester > 0) {
        if (isMobile) {
          movements += tester;
        } else {
          movements += abs(floor(tester / 5));
        }
      }
      pixCache[i * pix.width + j] = pix.pixels[i * pix.width + j];
    }
  }
  //image(pix, unit * 2, unit * 4);
  //console.log(movements);
  if (isMobile) {
    likeRate = movements / 5 + 0.2;
  } else {
    likeRate = movements / 2000 + 0.2;
  }
}
