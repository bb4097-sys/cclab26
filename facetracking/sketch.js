let faceMesh;
let video;
let faces = [];

let options = { maxFaces: 1, refineLandmarks: false, flipped: false };

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  //background(220);
  image(video, 0, 0, width, height);
  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {

    let face = faces[i];
    let p1 = face.keypoints[0];
    let p2 = face.keypoints[14];
    fill(0, 255, 0);
    noStroke();
    circle(p1.x, p1.y, 5);
    circle(p2.x, p2.y, 5);
    let d = dist(p1.x, p1.y, p2.x, p2.y);
    let op = map(d, 0, 50, 0, 255);
    background(0, op);

    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      //let d = dist(mouseX, mouseY, keypoint.x, keypoint.y);
      //if (d < 5) {
      // textSize(24);
      //  text(j, keypoint.x, keypoint.y);
      //}
      //fill(0, 255, 0);
      //noStroke();
      //circle(keypoint.x, keypoint.y, 5);
    }
  }
}
// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}



