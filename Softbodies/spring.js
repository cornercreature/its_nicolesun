  //verletspring(particle1, particle 2, dist between, amt of spring)
  //must make new spring connection to each connected relationship
class spring extends VerletSpring2D{
  constructor(a,b,length,strength){
    super(a,b,length, strength);
    //calling spring here means you don't have to call it over and over again in setup!
    physics.addSpring(this);
  }
  show(){
    }
}
