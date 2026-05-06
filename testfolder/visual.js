let img;
let s = 20;
function preload() {
  img = loadImage("mine.jpg");
}
function setup() {
  createCanvas(600, 400, WEBGL);
}
function draw() {
  background(0);
  img.loadPixels(); //very important
  for (let x = 0; x < width; x += s) {
    for (let y = 0; y < height; y += s) {
      let i = (x + y * img.width) * 4;

      let r = img.pixels[i + 0];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];
      push();
      let z = map(b, 0, 255, mouseY, 0);
      translate(x - width / 2, y - height / 2, z);
      fill(r, g, b);
      noStroke();
      rect(0, 0, s, s);
      pop();
    }
  }
}
