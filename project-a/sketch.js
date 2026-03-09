let d = 15;
let x, y, cx, cy;

function setup() {
  let canvas = createCanvas(800, 500);
   canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
  x = width / 2;
  y = height / 2;
}

function draw() {

  // smooth follow mouse
  if (mouseIsPressed) {
    x = lerp(x, mouseX, 0.05);
    y = lerp(y, mouseY, 0.05);
  }

  // idle floating motion
  let v = 40 * sin(frameCount * 0.1);
  let u = 30 * sin(frameCount * 0.05);

  cx = x + u;
  cy = y + v;

  backMOVEMENT(cx, cy);
  creature(cx, cy, mouseIsPressed);

}

function  backMOVEMENT(cx, cy){

  background(0);

  for (let gx = d / 2; gx < width; gx += d) {
    for (let gy = d / 2; gy < height; gy += d) {

      let off = map(noise(0.01 * frameCount + gx * gy), 0, 1, 0, 60);
      let lol = dist(cx, cy, gx, gy);
      let idc = map(lol, 0, 200, 50, 0);

      if (mouseIsPressed) {
        fill(random(255), random(255), random(255));
      } else {
        fill(255);
      }

      circle(gx, gy, d + off + idc);
    }
  }

}

function creature(cx, cy){
  push();
  translate(cx, cy);

  let wingAngle = 0.3 * sin(frameCount * 0.1);

  let s = 1;
  if (mouseIsPressed) {
    s = 3;
  }

  // LEFT WING
  push();
  translate(-20*s, 10*s);
  rotate(-wingAngle);
  fill(255,150,200); ellipse(-15*s,-5*s,60*s,40*s);
  fill(200,180,255); ellipse(-5*s,-10*s,55*s,35*s);
  fill(180,220,200); ellipse(0,-15*s,50*s,30*s);
  fill(150,200,250); ellipse(10*s,-5*s,45*s,25*s);
  fill(220,180,200); ellipse(5*s,10*s,40*s,20*s);
  fill(255,200,100); ellipse(-10*s,5*s,35*s,15*s);
  fill(255,150,150); ellipse(0,0,30*s,10*s);
  fill(200,255,150); ellipse(15*s,0,25*s,10*s);
  pop();

  // RIGHT WING
  push();
  translate(20*s, 10*s);
  rotate(wingAngle);
  fill(255,150,200); ellipse(15*s,-5*s,60*s,40*s);
  fill(200,180,255); ellipse(5*s,-10*s,55*s,35*s);
  fill(180,220,200); ellipse(0,-15*s,50*s,30*s);
  fill(150,200,250); ellipse(-10*s,-5*s,45*s,25*s);
  fill(220,180,200); ellipse(-5*s,10*s,40*s,20*s);
  fill(255,200,100); ellipse(10*s,5*s,35*s,15*s);
  fill(255,150,150); ellipse(0,0,30*s,10*s);
  fill(200,255,150); ellipse(-15*s,0,25*s,10*s);
  pop();

  fill(50,200,150);
  ellipse(0,20,25,60);

  fill(30,200,200);
  ellipse(0,0,45,25);

  fill(0);
  ellipse(-10,-2,8,5);
  ellipse(10,-2,8,5);

  pop();
}