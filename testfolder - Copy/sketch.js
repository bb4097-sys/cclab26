let handPose;
let video;
let hands = [];
let songs = [];
let currentSong;
let currentIndex = 0;
let amp;
let mc;
let d;
let isPlaying = false;
let p_isPlaying = false;
let p1, p2;
let rects = [];

class Rectangle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.w = random(10, 400);
    this.h = random(10, 300);
    this.col = color(random(255), random(255), random(255));
    this.sw = random(1, 6);
  }

  show() {
    stroke(0);
    strokeWeight(this.sw);
    fill(this.col);
    rect(this.x, this.y, this.w, this.h);
  }
}

function preload() {
  handPose = ml5.handPose();
  mc = loadImage("mc.jpg");
  songs[0] = loadSound("christmas.mp3");
  songs[1] = loadSound("fly.mp3");
  songs[2] = loadSound("circles.mp3");
  songs[3] = loadSound("myall.mp3");
  songs[4] = loadSound("emotions.mp3");
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
  amp = new p5.Amplitude();
  userStartAudio();
}

function draw() {
  background(0);
  image(mc, 0, 0, width, height);
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
      rects = [];
    }
  }
  p_isPlaying = isPlaying;

  if (currentSong && currentSong.isPlaying()) {
    for (let i = 0; i < 3; i++) {
      rects.push(new Rectangle());
    }
    for (let r of rects) {
      r.show();
    }
  }
}

function playSound() {
  if (currentSong && currentSong.isPlaying()) {
    currentSong.stop();
  }
  currentSong = songs[currentIndex];
  amp.setInput(currentSong);
  currentSong.play();
  currentIndex++;
  if (currentIndex >= songs.length) {
    currentIndex = 0;
  }
}