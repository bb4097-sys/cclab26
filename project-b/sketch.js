let img;
let song1;
let song2;
let song3;
let song4;
let song5;

let pixelSize = 25; // smaller = more detail

function preload() {
  img = loadImage("assets/mariah.png");
  song1 = loadSound("assets/fly.mp3");
  song2 = loadSound("assets/circles.mp3");
  song3 = loadSound("assets/myall.mp3");
  song4 = loadSound("assets/emotions.mp3");
  song5 = loadSound("assets/christmas.mp3");
}

function setup() {
  createCanvas(1000, 1000);
  img.resize(width, height);
}

function draw() {
  background(0);

  img.loadPixels();

  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      let index = (x + y * width) * 4;

      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      noStroke();
      fill(r, g, b);
      rect(x, y, pixelSize, pixelSize);
    }
  }
}

function keyPressed() {
  if (key === '1') {
    stopAll();
    song1.play();
  }
  if (key === '2') {
    stopAll();
    song2.play();
  }
  if (key === '3') {
    stopAll();
    song3.play();
  }
  if (key === '4') {
    stopAll();
    song4.play();
  }
  if (key === '5') {
    stopAll();
    song5.play();
  }
}

function stopAll() {
  song1.stop();
  song2.stop();
  song3.stop();
  song4.stop();
  song5.stop();
}