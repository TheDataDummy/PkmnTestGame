// SETUP
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const pixel_dim = 12;
const scale_factor = 4;
const effective_square_size = scale_factor * pixel_dim;

canvas.width = 960;
canvas.height = 540;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Load Player Image(s)
const playerImage = new Image();
playerImage.src = './assets/images/playerDown.png';

// Load Background Image
const bg_image = new Image();
bg_image.src = './assets/test_map.png';

// Animation variables
var lastTime;
var fps = 60;
var requiredElapsed = 1000 / fps;


// Defining classes and initializing objects
class Sprite {
    constructor({position,velocity,image,offset}) {
        this.position = position;
        this.image = image;
        this.offset = offset;
    }

    draw() {
        ctx.drawImage(this.image, 
            this.position.x + this.offset.x, 
            this.position.y + this.offset.y, 
            canvas.width * scale_factor, 
            canvas.height * scale_factor);
    }
}

const background = new Sprite({
    position: {
        x:-290,
        y:-930
    },
    image : bg_image,
    offset: {
        x:0,
        y:0
    }
})

const keys ={
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    },
    lastKey: null
}


// Animation loop
function animate(now) {
    requestAnimationFrame(animate);

    if(!lastTime){
        console.log("Initializing time")
        lastTime = now
    };
    
    var elapsed = now - lastTime;

    if(elapsed>requiredElapsed) {
        background.draw()
        ctx.drawImage(playerImage,
            0,                                              // Crop x starting at
            0,                                              // Crop y starting at
            playerImage.width / 4,                          // Crop x ending at
            playerImage.height,                             // Crop y ending at
            canvas.width / 2 - playerImage.width / 8,       // Render image at this X coordinate
            canvas.height / 2  - playerImage.height / 2,    // Render image at this Y coordinate
            playerImage.width / 4,                          // Render image with this width
            playerImage.height);                             // Render image with this height

        if (keys.w.pressed && keys.lastKey === 'w') {
            background.offset.y += 0.2 * elapsed;
        }
        else if (keys.s.pressed && keys.lastKey === 's') {
            background.offset.y -= 0.2 * elapsed;
        }
        else if (keys.a.pressed && keys.lastKey === 'a') {
            background.offset.x += 0.2 * elapsed;
        }
        else if (keys.d.pressed && keys.lastKey === 'd') {
            background.offset.x -= 0.2 * elapsed;
        }

        lastTime = now;
    }
}


// Loading up
bg_image.onload = () => {
    ctx.imageSmoothingEnabled = false;
    requestAnimationFrame(animate);
};



// Event listening
window.addEventListener('keydown', (e) =>{
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            keys.lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true;
            keys.lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true;
            keys.lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true;
            keys.lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) =>{
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        case 's':
            keys.s.pressed = false;
            break
        case 'd':
            keys.d.pressed = false;
            break
    }
})