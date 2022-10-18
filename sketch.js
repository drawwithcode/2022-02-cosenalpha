/* The three color variables are used to make one of
the RGB values change while the others are stable,
so that the colors transition smoothly.

The colorValue array is used to avoid
writing the value of the colors every time.
I added another value to the array at line 78 */ 
let colorR = 255;
let colorG = 255;
let colorB = 0;
const colorValue = [0, 255];
/* the myStar array is needed to generate multiple stars */
let myStar = [];


/* since I'm using WEBGL, I had to load
the font used with the preload function, by
downloading it and adding to the folder as
an external asset */
function preload() {
  font = loadFont('./assets/DotGothic16-Regular.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // WEBGL is a 3d render mode
  angleMode(DEGREES);
  let r;

/* this for cycle adds up to 400 stars to the
myStar array */
  for (let q = 0; q < 400; q++) {
   myStar.push(new Star());
  } 
}


function draw() {
  background("black");
  
  let textsiz = 0.019 * width; // the size of the text is relative to the width of the window to make the text responsive
  let myText = "To change colour, press the ←↓→ keys while dragging your mouse around";
  let myText1 = "To rotate the sphere, keep the ↑ key and drag"
  textFont(font);
  textAlign(LEFT);
  textSize(textsiz);
  textWrap(WORD);
  fill(colorR, colorG, colorB);
  text(myText, -width / 2 + 50, -250, width * 0.16); /*the centre of the coordinate system in WEBGL is the
  centre of the sphere, so to place something higher up or at the left I had to use negative coordinagtes*/
  text(myText1, -width / 2 + 50, 170, width * 0.14); 


  textWrap(CHAR);
  text("R: " + floor(colorR), width/3, textsiz/2 - textsiz * 1.15, 90); 
  text("G: " + floor(colorG), width/3, textsiz/2, 90); 
  text("B: " + floor(colorB), width/3, textsiz/2 + textsiz * 1.15, 90); 
  /* the y position of the lines of text is equal to the line spacing,
  which is 1.15 times the size of the text.
  
  The floor() function rounds to the closest int value of every RGB value */


  if (keyIsDown(UP_ARROW)) {
    /* orbitControl allows the user to move the camera
    pointing at the sphere */
    orbitControl(4, 4);
  }

  /* the radius of the sphere is relative to the width of the window,
  therefore it's responsive */
  r = 0.19 * width;

  /* the map() function is used to make a proportion between
  different values, in this case the X position of the mouse
  and the value of one of the color variables (that goes from 0 to 255).

  I added it here instead of when creating the array because
  the mouseX variable needs to be added in the draw() function */
  colorValue[2] = map(mouseX, 0, width, 0, 255);


  /* the sphere is made of many points generated according to the
  algebric equations of a sphere. I used the two for loops
  because the sphere is defined by two angles */
  push();
   stroke(colorR, colorG, colorB);

   for(let alpha = 0; alpha <= 180; alpha += 5) {
     beginShape(POINTS); // this function makes the points easier and lighter to be generated
     strokeWeight(2);
    for(let theta = 0; theta <= 360; theta += 5) {
      let x = r * cos(alpha) + Math.random() * 4; // the Math.random() function makes every point wiggle randomly
      let y = r * sin(alpha) * sin(theta) + Math.random() * 4;
      let z = r * sin(alpha) * cos(theta) + Math.random() * 4;
      vertex(x, y, z);
    }
     endShape();
   }
  pop();


  /* this for cycle is necessary to apply the show() function
  (that defines the stars' appearance) to all the stars created */
  for (let q = 0; q < 400; q++) {
   myStar[q].show();
  }
} //end of the draw() function


/* this function makes the colour change based on
which key is being pressed */
function mouseDragged() {
  if (keyIsDown(LEFT_ARROW)) {
   colorR = colorValue[1];
   colorG = colorValue[2];
   colorB = colorValue[0];
  } else if (keyIsDown(DOWN_ARROW)) {
   colorR = colorValue[2];
   colorG = colorValue[0];
   colorB = colorValue[1];
 } else if (keyIsDown(RIGHT_ARROW)) {
   colorR = colorValue[0];
   colorG = colorValue[1];
   colorB = colorValue[2];
 }
}


/* thanks to this function, the canvas is resized
every time the window is resized */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


/* this class contains every information to create new stars */
class Star {

  /* inside the constructor function there are all the variables
  needed to create the stars */
  constructor() {
    this.pos = createVector(random(-width, width), random(-height, height), random(-1000, 1000));
   /* all the coordinates of the stars are randomly generated every time the page is refreshed */
  }

 /* the show() function is an inner function for the appearance of the stars.
 The "this." keyword refers to all the variables in the class */
show() {
  push();
   translate(this.pos.x, this.pos.y, this.pos.z);
   fill(colorR, colorG, colorB);
   noStroke();
   rectMode(CENTER);
   box(map(this.pos.z, 1000, -1000, random(0, 1), random(2, 3)));
   /* thanks to this map, the furthest stars are bigger, but still have a random size*/
  pop();
 }
}
