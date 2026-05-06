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


//we can do if her songs stops, the pixels will go back to its blury state, but the next image will also appear. 

//the background can light up in multiple color. lol. 

//garaa awhaar bursger bolood garaa oirtuulhaar tod bolno
function preload() {
  handPose = ml5.handPose();
  
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
  colorMode(HSB, 100);

  userStartAudio(); // needed once
}

function draw() {
  background(0);

  // reset distance each frame
  d = 0;

  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    p1 = hand.keypoints[4];
    p2 = hand.keypoints[20];

    d = dist(p1.x, p1.y, p2.x, p2.y);
  }
  pop();

  // gesture logic
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

  // ===== VISUAL PART =====
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
  // stop previous
  if (currentSong && currentSong.isPlaying()) {
    currentSong.stop();
  }

  // pick next song in order
  currentSong = songs[currentIndex];

  amp.setInput(currentSong);
  currentSong.play();

  // move to next index
  currentIndex++;

  // loop back to start
  if (currentIndex >= songs.length) {
    currentIndex = 0;
  }
}