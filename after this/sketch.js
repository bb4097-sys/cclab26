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
  createCanvas(windowWidth, 1000);
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



// the textual thingy 

  if (!currentSong || !currentSong.isPlaying()) {
    pixelGrid.draw();
    rectSketch.draw();
    fill(255);
    stroke(0);
    textSize(50);
    textAlign(CENTER);
    text("Open your palm in front of the camera", width / 2, height - 700);
    text("Close your oalm to stop", width / 2, height - 600);
  } else {




    
    // picture 
    image(currentImage, 0, 0, width, height);} {
      // no matter what, my MC stays on top 
      {fill(193, 77, 247);
  stroke(0);
  strokeWeight(10);
  textSize(80);
  textAlign(CENTER);
  text("The greatest vocalist ever", width / 2, height - 820);





    // song specific text
    fill(255);
    stroke(0);
    strokeWeight(5);
    textSize(40);
    textAlign(CENTER);

    if (songs[0].isPlaying()) {
      text("Her magical success", width / 2, height - 700);
    } else if (songs[1].isPlaying()) {
      text("Her 3rd hardest song", width / 2, height - 700);
    } else if (songs[2].isPlaying()) {
      text("", width / 2, height - 700);
    } else if (songs[3].isPlaying()) {
      text("Her 6th hardest song", width / 2, height - 700);
    } else if (songs[4].isPlaying()) {
      fill(247, 247, 77);
    stroke(0);
    strokeWeight(5);
    textSize(90);
    textAlign(CENTER);
      text("Her hardest song", width / 2, height - 700);
      text("World's most harders song", width / 2, height - 600);
    }
  }
  }
}






//the helper function that answers calls. 
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





// The endless rectangles on the screen 

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






// pixels thingy
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