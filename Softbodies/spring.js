class spring extends VerletSpring2D{
  constructor(a,b,length,strength){
    super(a,b,length, strength);
    //calling spring here means you don't have to call it over and over again in setup!
    physics.addSpring(this);
  }
  show(){
    }
}
