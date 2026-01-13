let face1;
let face2;
let face3;
let face4;

let circ1;
let circ2;
let circ3;
let circ4;

let clockcirc;

let browInstance;
let eyeInstance;
// Note to self- Declare variables for shape radii, can declare variables before actually defining them later on
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

function setup() {
  //this variable setup is needed for js file to be placed in html container!
  var myCanvas = createCanvas(900, 600);
  myCanvas.parent("mySketch");

  angleMode(RADIANS);
  
  let radius = min(width, height) / 3;
  secondsRadius = radius * 0.7;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.3;
  clockDiameter = radius * 2;
  
  
  browInstance = new brow(0,36);
  
  eyeInstance = new eye(36,46,33,13);
  
  //since center is 0,0 these xy coordinates are     negative and halve canvas dimensions (so rather than x is [0,900], it is [-450,450])
  face1 = new face(-75,-270);
  face2 = new face(250,-50);
  face3 = new face (-75,170);
  face4 = new face (-400,-50);
  
  //must call instances in set up for them to be activated at all, including in other instances!!
  // //call for face instance
  eyeInstance.show();
  // //call for eye instance
  browInstance.show();
  
  circ1 = new circ(-385,-255,30,"black");
  circ2 = new circ(385,-255,30,"white");
  circ3 = new circ(-385,255,30,"white");
  circ4 = new circ(385,255,30,"black");
  
  clockcirc = new circ(0,0,10,"black");
}

function draw() {
  background("#f4f4f4");
  
  //this moves imaginary pen down to center
  translate(width/2, height/2);
  
  //clock base
  fill("white");
  stroke("black");
  ellipse(0,0,clockDiameter,clockDiameter/1.5);
  
  //hand angle mapped as current time in time range to angle in degree range. 
  let secondAngle = map(second(), 0, 60, 0, TWO_PI);
  let minuteAngle = map(minute(), 0, 60, 0, TWO_PI);
  let hourAngle = map(hour(), 0, 12, 0, TWO_PI);
  
  //push pop must be implemented so that rotation of one hand does not affect the other!!
  //clock second hand
  push();
  rotate(secondAngle);
  stroke("black");
  line(0,0,0,-secondsRadius);
  pop();
  
  //clock minute hand
  push();
  rotate(minuteAngle);
  stroke("red");
  line(0,0,0,-minutesRadius);
  pop();
  
  //clock hour hand
  push();
  rotate(hourAngle);
  stroke("black");
  line(0,0,0,-hoursRadius);
  pop();
  
  //show rectinstances
  face1.show();
  face2.show();
  face3.show();
  face4.show();
  
  circ1.show();
  circ2.show();
  circ3.show();
  circ4.show();
  
  clockcirc.show();
}

  class brow{
    constructor(x,y){
      this.x=x;
      this.y=y;
    }
    show(){
      stroke(1);
      
      
      //note to self REMEMBER TO BEGIN AND END SHAPE THIS IS VERY CRUCIAL ASTRONOMICALLY SO
      beginShape(LINES);
      vertex(this.x,this.y);
      vertex((map(mouseX, 0, 300, -16, 10)),(map(mouseY, 0, 200, -16, 10)));
      vertex((map(mouseX, 0, 300, -16, 10)),(map(mouseY, 0, 200, -16, 10)));
      vertex((this.x+36),this.y);
      endShape();
    }
  }

  class eye{
    constructor(x,y,width,height){
      this.x=x;
      this.y=y;
      this.width=width;
      this.height=height;
      this.brow=browInstance;
    }
    
    show(){   
   arc(this.x,this.y,this.width,this.height,PI,TWO_PI);
      push();
      
      translate(this.x,this.y);
      
      fill("#CCE8E2");
      circle(1.5,0,8);
      translate((-this.height*1.5),(-this.height*4.2));
      
      this.brow.show();
      
      pop();
    }
  }

 //faceclass begins
  class face{
    constructor(x,y){
      this.x = x;
      this.y = y;
      
      //NTS you can put any new variable here with this.notation you don't have to pass it through as a value when you make every new instance if it will be constant
      this.eyeleft = new eye(x + 36, y + 46, 33, 13, new brow(x, y + 36));
      
      this.eyeright = new eye(x + 113, y + 46, 33, 13, new brow(x, y + 36));
    }
    
    show(){
      
      fill("#FFE3E3");
      stroke(1);
      rect(this.x,this.y,150,100);
      
              //hair
      stroke(1);
      fill("#6D99CF");
      rect((this.x+1),this.y,148,8);
      
      stroke(1);
      noFill();
      this.eyeleft.show();
      
      this.eyeright.show();
      
      //mouth
      fill("pink");
      ellipse((this.x+75),(this.y+90),4,6);
      
    }
  }

  class circ{
    constructor(x,y,size,fill){
      this.x = x;
      this.y = y;
      this.size = size;
      this.fill = fill;
    }
    show(){
      fill(this.fill);
      ellipse(this.x,this.y,this.size);
    }
  }