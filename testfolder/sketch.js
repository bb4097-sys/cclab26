let images = [];
let d;
let isPlaying = false;
let p_isPlaying = false;
let p1, p2;
let handPose;
let video;
let hands = [];
let songs = [];
let currentSong;
let currentIndex = 0;
let amp;
let rectSketch;
let pixelGrid;
let currentImage;




function preload() {
  handPose = ml5.handPose();

  songs[0] = loadSound("christmas.mp3");
  songs[1] = loadSound("fly.mp3");
  songs[2] = loadSound("circles.mp3");
  songs[3] = loadSound("myall.mp3");
  songs[4] = loadSound("emotions.mp3");

  for (let i = 1; i < 8; i++) {
    images[i] = loadImage("mimi/emcee_" + i + ".png");
  }
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
  amp = new p5.Amplitude();
  userStartAudio();

  currentImage = images[floor(random(1, 8))];
  rectSketch = new RectangleSketch(20);
  pixelGrid = new PixelGrid(currentImage, 30);
}

function draw() {
  background(0);

  d = 0;
  push();
  translate(width, 0);
  scale(-1, 1);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    p1 = hand.keypoints[4];
    p2 = hand.keypoints[20];
    d = dist(p1.x, p1.y, p2.x, p2.y);
  }
  pop();

  if (d > 200) {
    isPlaying = true;
  } else {
    isPlaying = false;
  }

  if (isPlaying && !p_isPlaying) {
    playSound();
  }

  if (!isPlaying && p_isPlaying) {
    if (currentSong && currentSong.isPlaying()) {
      currentSong.stop();
    }
  }

  p_isPlaying = isPlaying;

  // --- when NOT playing: pixel grid + rects ---
  if (!currentSong || !currentSong.isPlaying()) {
    pixelGrid.draw();
    rectSketch.draw();
  } else {
    // --- when playing: show Mariah's image directly ---
    image(currentImage, 0, 0, width, height);
  }
}

function playSound() {
  if (currentSong && currentSong.isPlaying()) {
    currentSong.stop();
  }

  currentImage = images[floor(random(1, 8))];
  pixelGrid.updateImage(currentImage);

  currentSong = songs[currentIndex];
  amp.setInput(currentSong);
  currentSong.play();
  currentIndex++;
  if (currentIndex >= songs.length) {
    currentIndex = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// ---- Classes ----


class RectangleSketch {
  constructor(count) {
    this.count = count;
    
  }

  draw() {
    for (let i = 0; i < this.count; i++) {
      strokeWeight(random(1, 9));
      fill(random(255), random(255), random(255), random(50, 255));
      rect(
        random(width),
        random(height),
        random(10, 500),
        random(10, 300)
      );
    }
  }
}




//pixels thinggy 
class PixelGrid {
  constructor(img, s) {
    this.img = img;
    this.s = s;
  }

  updateImage(newImg) {
    this.img = newImg;
  }

  draw() {
    this.img.loadPixels();
    for (let x = 0; x < width; x += this.s) {
      for (let y = 0; y < height; y += this.s) {
        let i = (x + y * this.img.width) * 4;
        let r = this.img.pixels[i + 0];
        let g = this.img.pixels[i + 1];
        let b = this.img.pixels[i + 2];
        fill(r, g, b);
        noStroke();
        rect(x, y, this.s, this.s);
      }
    }
  }
}