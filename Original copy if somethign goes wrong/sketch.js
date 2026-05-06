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
let png
let mc

function preload() {
  handPose = ml5.handPose();
  
 //mc = loadImage("mc.jpg"); // or "mc.jpg" depending on your file
  
  songs[0] = loadSound("christmas.mp3");
  songs[1] = loadSound("fly.mp3");
  songs[2] = loadSound("circles.mp3");
  songs[3] = loadSound("myall.mp3");
  songs[4] = loadSound("emotions.mp3");


 // load mimi images
  for (let i = 0; i < 7; i++) {
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
  colorMode(HSB, 100);
  userStartAudio();
}

function draw() {
  background(0);
  //image(mc, 0, 0, width, height);
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

  if (currentSong && currentSong.isPlaying()) {
    let level = amp.getLevel();
    let dia = map(level, 0, 0.3, 50, 400);
    let h = map(level, 0, 0.3, 0, 100);
    fill(h, 100, 100);
    noStroke();
    ellipse(width / 2, height / 2, dia, dia);
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