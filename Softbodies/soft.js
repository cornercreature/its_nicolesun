const {VerletPhysics2D, VerletParticle2D, VerletSpring2D, Vec2D} = toxi.physics2d;

let physics;

let particleA

function setup(){
    var softCanvas = createCanvas(900, 600);
    softCanvas.parent("softCanvas");

    physics = new VerletPhysics2D();
}

function draw(){
    background("blue");
}