// let x, y , s, speedX
// let x1, y1 , s1, speedX1
let x = []
let y = []
let s = []
let speedX = []
n = 10
function setup() {
  createCanvas(400, 400);
  for(let i = 0; i<n; i++){
}
}


function mousePressed(){
x.push(mouseX)
 y.push(mouseY)
 s.push(random(0.5, 2))
console.log(x.length)
 let index = x.length - 1
speedX.push(map(s[index], 0.5, 2, 5, 0.5))
}


function draw() {
  background(220);
  console.log(x.length)

  for(let i = 0; i<x.length; i++){
  drawCloud(x[i], y[i], s[i]);

  x[i]+=speedX[i]
  y[i]= y[i] + map(sin(frameCount* 0.1), -1, 1, -5*s[i], 5*s[i])
  if(x[i]> width*1.2){
    x.splice(i, 1)
    y.splice(i, 1)
    speedX.splice(i, 1)
    s.splice(i, 1)
  }
}
}



function drawCloud(x, y, s) {
  push();
  translate(x, y);
//swing
  let angle = map(sin(frameCount * 0.05), -1, 1, PI / 4, -PI / 4)
  rotate(angle);
//size
  scale(s);
  drawArms();
  noStroke();
//body
  fill(255);
  circle(0, 0, 100);
//around body
  for (let angle = 0; angle < 2 * PI; angle += PI / 5) {
    push();
    rotate(angle);
    fill(255);
    circle(100 / 2 - 8, 0, 30);
    pop();
  }
  drawFace();
  pop();

}
function drawArms() {
  //arms
  beginShape();
  let lineLength2 = 70;
  noFill();
  for (let i = -lineLength2; i <= lineLength2; i += lineLength2 / 10) {
    strokeWeight(10);
    let v = 10 * sin(frameCount * 0.1 - i);
    vertex(i, v);
  }
  endShape();
}

function drawFace() {
  //face
  fill(0);
  circle(0 - 30, 0, 5);
  circle(0 + 30, 0, 5);
  arc(0, 0, 30, 30, 0, PI);
}
