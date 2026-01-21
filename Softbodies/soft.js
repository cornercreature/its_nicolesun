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
let rootParticles=[];//root particles are first letters of each word

let rX;
let rY;
let bounce=0.4;
let length=70;

function setup() {
  var softCanvas = createCanvas(480, 600);
    softCanvas.parent("softCanvas");
  
  //calling in physics
  physics = new VerletPhysics2D();
  //add some drag so particles dont move too suddenly
  physics.setDrag(0.04); 
  //must determine direction of gravity with vector!
  //vertical vector made
  //strength of gravity is also determined by length of vector
  let v = new Vec2D(0,0.1);
  //vector called into gravity behavior to determine direction
  let gravity = new GravityBehavior(v);
  // //note variables are not necessary you can just put Vec2d into gravity behavior if you like
  // //you must explicity add gravity into world for gravity to exist!
  physics.addBehavior(gravity);
  
  
  let bounds = new Rect(0,0, width, height);
  //everything must be called into existence!
  physics.setWorldBounds(bounds);

  // No initial particles - they'll be created when user starts typing
}

function keyTyped(){
  //ensuring backspace is not picked up by keyTyped because we need it for keyPressed
  if (key === 'Backspace' || keyCode === BACKSPACE) {
    return false;
  }

  //add typed letter into displayText array
  displayText.push(key);
  let newParticle = new Particle(mouseX, mouseY, key);
  particles.push(newParticle);

  // Determine if this particle should be a root (first letter of a word)
  if (particles.length === 1) {
    // .push is how to add to an array
    rootParticles.push(newParticle);
  } else if (key === ' ') {
    // if there is a space then don't create spring
    //minus 2 because array begins from 0 
  } else if (displayText[displayText.length - 2] === ' ') {
    // First letter after a space will be pushed into root array
    rootParticles.push(newParticle);
  } else {
    // Regular letter in the middle of a word - create spring
    let prevParticle = particles[particles.length - 2];
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
      let rootIndex = rootParticles.indexOf(lastParticle);
      if (rootIndex > -1){
        rootParticles.splice(rootIndex, 1);
      }
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
    let closestRoot = null;
    let closestDist = 20; //only drag if mouse is within 40px of root

    // Find the closest root particle
    for (let root of rootParticles){
        let d = dist(mouseX, mouseY, root.x, root.y);
        //locates and presses closest root
        if (d < closestDist){
          closestDist = d;
          closestRoot = root;
        }
    }

    // AFTER the loop, drag the closest one
    if (closestRoot){
        //position points using lock(), keeps particle in place
        closestRoot.lock();
        closestRoot.x = mouseX;
        closestRoot.y = mouseY;
        // No unlock() - particle stays locked in place
    }
  }
  
  //for of loops let you cycle through an array's elements when you don't need the index value
  for (let particle of particles){
    particle.show();
    }
}

