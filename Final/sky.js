const world = document.getElementById('world');
let offsetX = -4075, offsetY = -2200;
world.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

let startX, startY;
let lastCharUpdate = 0;

const scrollInfo = document.getElementById('scrollinfo');

//making viewport pan across world
// for event wheel, pass the event as detailed in (e)...
window.addEventListener('wheel', (e) =>{
    //prevents default scrolling function and allows panning to work
    e.preventDefault();
    //subtracts x scroll amount from current offset, moving window 
    //-= is shorthand for x=x-y
    offsetX -= e.deltaX;
    offsetY -= e.deltaY;

    //clamp to world edges
    //since viewport is window sized its just easier to use window here instead of getting viewport
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    offsetX = Math.max(-(world.offsetWidth - vw), Math.min(0,offsetX));
    offsetY = Math.max(-(world.offsetHeight - vh), Math.min(0,offsetY));
    world.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    document.getElementById('cordview').textContent = `${offsetX},${offsetY}`;

    const now = Date.now();
    if (now - lastCharUpdate > 300) {
        lastCharUpdate = now;
        const charspans = document.querySelectorAll('.charspan');
        const dodgespans = document.querySelectorAll('.dodgespan');

        charspans.forEach((span, i ) =>{
            const movement = Math.abs(offsetY + offsetX) / 700; //make value based off of offset
            span.style.transform = `translateY(${Math.random()*50*(movement)}px)`
        });

        dodgespans.forEach((span, i ) =>{
            const movement = Math.abs(offsetY + offsetX) / 700; //make value based off of offset
            span.style.transform = `translateX(${Math.random()*i*0.8*(movement)}px)`
        });
    }
}, //use commas to pass multiple arguements also at this scale!
{
    //passive false must be set for preventDefault to work, because wheel is set to passive by default.
    passive: false
})

function animateBackground() {
  const time = Date.now() * 0.01; // smaller = slower change, larger = faster
  //makes sky gradient
  world.style.background = `radial-gradient(
    circle,
    hsla(200, 100%, 72%, 1.00),
    hsla(210, 67%, 40%, 1.00)
  )`;
  requestAnimationFrame(animateBackground);
}

animateBackground();
