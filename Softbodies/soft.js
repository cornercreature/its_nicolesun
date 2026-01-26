//objects already extant in the toxjs library
const {VerletPhysics2D, VerletParticle2D, VerletSpring2D} = toxi.physics2d;
//importing gravity
const {GravityBehavior} = toxi.physics2d.behaviors;
//importing vector classes
const {Vec2D, Rect} = toxi.geom;

let showSprings = true;

let physics;
let gravity; //edited to make gravity global so that sliders can work (html can only access global functions and variables)
let gVectorX=0.05;
let gVectorY=0.05;

let particles = [];
let springs = [];

let displayText=[];
let rootParticles=[];//root particles are first letters of each word

let rX;
let rY;
let bounce=0.9;
let length=200;
let fontSize=280; 

//cjkMode set to false by default (english mode)
let cjkMode = false;
let inputElement;

function setup() {
  var softCanvas = createCanvas(600, 900);
    softCanvas.parent("softCanvas");
  
  //calling in physics
  physics = new VerletPhysics2D();
  //add some drag so particles dont move too suddenly
  physics.setDrag(0.02); 
  //must determine direction of gravity with vector!
  //vertical vector made
  //strength of gravity is also determined by length of vector

  let v = new Vec2D(gVectorX,gVectorY);
  //vector called into gravity behavior to determine direction
  gravity = new GravityBehavior(v);
  // //note variables are not necessary you can just put Vec2d into gravity behavior if you like
  // //you must explicity add gravity into world for gravity to exist!
  physics.addBehavior(gravity);
  
  
  
  let bounds = new Rect(0,0, width, height);
  //everything must be called into existence!
  physics.setWorldBounds(bounds);

  // No initial particles - they'll be created when user starts typing

  //setting up IME detection for CJK input
  //ime is input method editor. since cjk works on characters, you need this editor in order to display them.
//to create a space for ime to run, we'll use an invisible input field
  inputElement = document.createElement('input');
  inputElement.style.position = 'absolute';
  inputElement.style.left = '-9999px'; //this crazy number hides the field offscreen!
  inputElement.style.pointerEvents = 'none';
  document.body.appendChild(inputElement);

//listen for CJK toggle
//event listener for CJK character to be finalized
//function(e) is just a short version of function(event), there's no actual difference in functionality
//compositionend is the browser event that already exists. also with e.data, e.target, e.type
inputElement.addEventListener('compositionend', function(e) {
    if(cjkMode && e.data){
      //e.data is final composed characters
      for (let char of e.data){
        //this creates particle for each character
        displayText.push(char);
        //redefine particle here so that a character exists.
        let newParticle = new CParticle(mouseX,mouseY, char, fontSize);
        particles.push(newParticle);

        //determining if particle is root
        if (particles.length === 1) {
          rootParticles.push(newParticle);
        } else if (displayText[displayText.length - 2] === ' ') {
          rootParticles.push(newParticle);
        } else {
          //spring creation here
          let prevParticle = particles[particles.length - 2];
          springs.push(new spring(prevParticle, newParticle, length, bounce));
        }
      }
      inputElement.value = ''; // Clear input field after processing
      inputElement.focus(); // Keep focus on the input field
    }
});
}

function toggleCJK(){
  //focus and blur are builtin browser methods. focus places focus on an element and blure removes focus from an element.
  //the element without focus will not recieve the input, ensuring the correct language is processed.
    cjkMode = !cjkMode;
    if(cjkMode){
      inputElement.focus();
      document.getElementById("cjkbutton").textContent = "English Mode";
    } else {
      inputElement.blur();
      document.getElementById("cjkbutton").textContent = "CJK Mode";
    }
}

function updateFontSize(){
  //plus converts string to number, is the shorthand for Number()
  fontSize = +document.getElementById('fontSlider').value;
  document.getElementById('fontValue').textContent = fontSize;
}

  function updateGVectorX(){
    gVectorX = +document.getElementById('gVectorXSlider').value;
    document.getElementById('gVectorXValue').textContent = gVectorX;
    gravity.setForce(new Vec2D(gVectorX, gVectorY));
  }
  function updateGVectorY(){
    gVectorY = +document.getElementById('gVectorYSlider').value;
    document.getElementById('gVectorYValue').textContent = gVectorY;
    gravity.setForce(new Vec2D(gVectorX, gVectorY));
  }

function keyTyped(){
  //ensuring backspace is not picked up by keyTyped because we need it for keyPressed
  if (key === 'Backspace' || keyCode === BACKSPACE) {
    return false;
  }

  if (key === ' '){
    displayText.push(' ');
    return false;
  }

  if(!cjkMode){
    //add typed letter into displayText array
    displayText.push(key);
    let newParticle = new Particle(mouseX, mouseY, key, fontSize);
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
    
    if (cjkMode && inputElement) {
      inputElement.focus();
    }

  }
  

function toggleLines(){
    if(showSprings){
        for (let spring of springs){
            //switch back to blend so that there is no flashing error
        // blendMode(DIFFERENCE);
        spring.show();
        // blendMode(BLEND);
        }
    }
}

function toggleSpringVisibility(){
    showSprings = !showSprings;
    if(showSprings){
        document.getElementById("springbutton");
        springbutton.style.backgroundColor = "#006affff";
        springbutton.style.color = "#fff";
        springbutton.textContent = "hide connections";
    }
    else{
        document.getElementById("springbutton");
        springbutton.textContent = "see connections";
        springbutton.style.color = "#000";
        springbutton.style.backgroundColor = "#7bff00ff";
    }
}

function draw() {
  background("#006affff");
  
  //physics world does not cycle through time of function draw UNLESS physics update is explicitly called.
  //add some delay so movement looks more natural
  physics.update(0.9);
  
  if (mouseIsPressed){
    let closestRoot = null;
    let closestDist = 80; //only drag if mouse is within 40px of root

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

    blendMode(DIFFERENCE);
    particle.show();
    blendMode(BLEND);
    }

    toggleLines();
}

