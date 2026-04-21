let c = [];
let r = [];
let thunder 

function preload() {
  thunder = loadSound("js/thunder.mp3");
}

function setup() {
  createCanvas(800, 500);
  //thunder.play()
}

function mousePressed() {
    thunder.play();
  c.push(new Cloud(mouseX, mouseY, random(0.5, 1)));
}
function draw() {
  background(220);
  if(mouseIsPressed){
    r.push(new Rain(mouseX, mouseY));
  }
  for (let i = 0; i < r.length; i++) {
    r[i].updateRain();
    r[i].displayRain();
    if(r[i].isOut){
      r.splice(i, 1);
    }
  }
  console.log(r.length);

 for (let i = 0; i < c.length; i++) {
  for (let j = 0; j < c.length; j++) {
    if (i != j) {
      c[i].checkCollision(c[j]);
    }
  }
    c[i].update();
    c[i].display();
    if (c[i].isOut) {
      c.splice(i, 1);
    }

  }
  console.log(c.length);
}
