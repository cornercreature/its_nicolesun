//inheritance- by using extends, you can inherit everything about VerletParticle initialized in other document
//superclass - parent class of inheritance, subclass - child class

class Particle extends VerletParticle2D{
  constructor(x,y, displayText){
    //r
    super(x,y);
    this.r = 8;
    physics.addParticle(this);
    //just displaytext and not displayText[i] because this would pass in the whole array for just one point which is NOT what you want
    this.displayText = displayText;
  }
  
  show(){
  // //the particle is not a shape. you assign whatever visual element you want to a particle.
    fill("yellow");
    stroke("#e1ff00ff");
    textSize(fontSize);
    textFont('Young Serif');
    textAlign(CENTER, CENTER);
    text(this.displayText,this.x,this.y);
  }
}

class CParticle extends VerletParticle2D{
  constructor(x,y, displayText){
    //new particle made for chinese
    super(x,y);
    this.r = 8;
    physics.addParticle(this);
    this.displayText = displayText;
  }
  
  show(){
    stroke("#e1ff00ff");
    textSize(fontSize);
    textFont('Zen Antique Soft');
    textAlign(CENTER, CENTER);
    text(this.displayText,this.x,this.y);
  }
}