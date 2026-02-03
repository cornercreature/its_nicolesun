//set images as array so that they can be randomly picked
const skyImages = [
    'skies/1.JPG','skies/2.jpg','skies/3.jpg','skies/4.png','skies/5.png',
    'skies/6.png','skies/7.png','skies/8.png','skies/9.png','skies/10.png',
    'skies/11.png','skies/12.png','skies/13.png','skies/14.png','skies/15.png',
    'skies/16.png','skies/17.jpg','skies/18.png', 'skies/19.png'
];

//starting image width
let imgWidth = 6;

window.addEventListener('click', (e)=>{
    //screen coordinates to world coordinates
    const worldX = e.clientX - offsetX;
    const worldY = e.clientY - offsetY;

    //set source as random image picked from array
    const src = skyImages[Math.floor(Math.random() * skyImages.length)];

    const img = document.createElement('img');
    img.src = src;
    img.style.position = 'absolute';
    img.style.left = worldX + 'px';
    img.style.top = worldY + 'px';
    //centering image
    img.style.transform = 'translate(-50%, -50%)';
    img.style.width = imgWidth + 'rem';
    img.style.opacity = '1';
    img.style.transition = 'opacity 10s cubic-bezier(0.25, 0, 0.1, 1)';

    //makes image appear in world
    world.appendChild(img);

    // start fading after 50ms
    setTimeout(() => {
        img.style.opacity = '0';
    }, 50);

    //make each new image shrink
    imgWidth *= 0.92;

});
