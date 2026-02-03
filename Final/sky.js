const world = document.getElementById('world');
let offsetX = -4075, offsetY = -2200;
world.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

let startX, startY;

//making viewport pan across world
// for event wheel, pass the event as detailed in (e)...
window.addEventListener('wheel', (e) =>{
    //prevents default scrolling function and allows panning to work
    e.preventDefault();
    //subtracts x scroll amount from current offset, moving window 
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

}, //use commas to pass multiple arguements also at this scale!
{
    //passive false must be set for preventDefault to work, because wheel is set to passive by default.
    passive: false
})

// click to spawn random sky image
const skyImages = [
    'skies/1.JPG','skies/2.jpg','skies/3.jpg','skies/4.png','skies/5.png',
    'skies/6.png','skies/7.png','skies/8.png','skies/9.png','skies/10.png',
    'skies/11.png','skies/12.png','skies/13.png','skies/14.png','skies/15.png',
    'skies/16.png','skies/17.jpg','skies/18.png'
];
let currentWidth = 400;

window.addEventListener('click', (e) => {
    // convert screen coordinates to world coordinates
    const worldX = e.clientX - offsetX;
    const worldY = e.clientY - offsetY;

    // pick a random image
    const src = skyImages[Math.floor(Math.random() * skyImages.length)];

    // create and position the image centered on click
    const img = document.createElement('img');
    img.src = src;
    img.style.position = 'absolute';
    img.style.left = worldX + 'px';
    img.style.top = worldY + 'px';
    img.style.transform = 'translate(-50%, -50%)';
    img.style.width = currentWidth + 'px';

    world.appendChild(img);

    // shrink next image by 8%
    currentWidth *= 0.92;
});

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