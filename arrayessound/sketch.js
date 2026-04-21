let backsound;

function preload() {
  backSound = loadSound("sounds/00.mp3");
}

let x = [];
let y = [];

function setup() {
  createCanvas(400, 400);
  backsound.loop();
}

function draw() {
  background(220);
  for(let i=0; i<x.length; i++){
    drawCircle(x[i], y[i]);
  }
}

function drawCircle(x, y){
  fill(0);
  circle(x, y, 50);
}

function mousePressed(){
  x.push(mouseX);
  y.push(mouseY);
}

