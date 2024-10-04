var bkgdColor, foreColor;

var refImage;

var mod = [];

var modRadStart;
var modRadMin

function preload(){
  tFont = loadFont("resources/Inter-Regular.ttf");
  refImage = loadImage("resources/refer1.png");
  // refImage = loadImage("resources/refer0.png");
  // refImage = loadImage("resources/referGen.png");

}

function setup(){
  createCanvas(windowWidth, windowHeight);

  modRadStart = width/2;
  modRadEnd = width/200;

  rectMode(CENTER);

  bkgdColor = color('#000000');
  foreColor = color('#ffffff');

  for(var m = 0; m < 4; m++){
    mod[m] = new Mod(width/2, height/2, m, width);
  }

  for(var m = 0; m < mod.length; m++){
    mod[m].makeFamTree();
  }
}

function draw() {
  background(bkgdColor);

  // image(refImage, 0, 0);

  for(var m = 0; m < mod.length; m++){
    mod[m].run();
  }
}

function mouseMoved(){
  for(var m = 0; m < mod.length; m++){
    mod[m].mouseSplit();
  }
}