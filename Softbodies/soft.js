//objects already extant in the toxjs library
const {VerletPhysics2D, VerletParticle2D, VerletSpring2D} = toxi.physics2d;
//importing gravity
const {GravityBehavior} = toxi.physics2d.behaviors;
//importing vector classes
const {Vec2D, Rect} = toxi.geom;

let physics;

let particles = [];
let springs = [];

let displayText=[];

let rX;
let rY;
let bounce=0.4;
let length=100;

function setup() {
  var softCanvas = createCanvas(480, 600);
    softCanvas.parent("softCanvas");
  
  //calling in physics
  physics = new VerletPhysics2D();
  //add some drag so particles dont move too suddenly
  physics.setDrag(0.08); 
  //must determine direction of gravity with vector!
  //vertical vector made
  let v = new Vec2D(0,1);
  //vector called into gravity behavior to determine direction
  // let gravity = new GravityBehavior(v);
  // //note variables are not necessary you can just put Vec2d into gravity behavior if you like
  // //you must explicity add gravity into world for gravity to exist!
  // physics.addBehavior(gravity);
  
  
  let bounds = new Rect(0,0, width, height);
  //everything must be called into existence!
  physics.setWorldBounds(bounds);
  
  particles.push(new Particle(300,200,displayText[0]));
  particles.push(new Particle(300,120,displayText[1]));
  particles.push(new Particle(320,190,displayText[2]));
  
  let rX= random(width);
  let rY= random(height);
  
  //verletspring(particle1, particle 2, dist between, amt of spring)
  //must make new spring connection to each connected relationship
  springs.push(new spring(particles[0], particles[1], length, bounce));
  springs.push(new spring(particles[1], particles[2], length, bounce));
}

function keyTyped(){
  //ensuring backspace is not picked up by keyTyped because we need it for keyPressed
  if (key === 'Backspace' || keyCode === BACKSPACE) {
    return false;
  }
  //add typed letter into displayText array
  displayText.push(key);
  particles.push(new Particle(mouseX, mouseY, key));
  
  if (particles.length > 1) {
    //-2 because index begins at 0
    let prevParticle = particles[particles.length - 2];
    let newParticle = particles[particles.length - 1]
    springs.push(new spring(prevParticle, newParticle, length, bounce));
  }
    
  return(false);
}

//listen for backspace so delete can be implemented
function keyPressed(){
  //=== listens for strict equality- if values are equal and of the same type
  if (keyCode === BACKSPACE){
    displayText.pop();
    
    let lastParticle = particles.pop();
    if (lastParticle) {
      physics.removeParticle(lastParticle);
    }
    
    let lastSpring = springs.pop();
    if (lastSpring) {
      physics.removeSpring(lastSpring);
  }
  }
}

function draw() {
  background(220);
  
  //physics world does not cycle through time of function draw UNLESS physics update is explicitly called.
  //add some delay so movement looks more natural
  physics.update(0.4);
  
  if (mouseIsPressed){
      //lock unlock is function to place particle.
  particles[0].lock();
  particles[0].x = mouseX;
  particles[0].y = mouseY;
  particles[0].unlock();
  }
  
  //for of loops let you cycle through an array's elements when you don't need the index value
  for (let particle of particles){
    particle.show();
    }
}

