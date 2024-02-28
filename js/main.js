let speed = 40;
let scale = 0.30; // Image scale (I work on 1080p monitor)
let canvas;
let ctx;
let logoColor;
let sources = ['./img/fl-vanilla.webp', './img/fl-choco.webp', './img/fl-mm.webp', './img/fl-straw.webp'];

let dvd = {
    x: 200,
    y: 300,
    xspeed: 10,
    yspeed: 10,
    img: new Image()
};

(function main(){
    canvas = document.getElementById("tv-screen");
    ctx = canvas.getContext("2d");
    dvd.img.src = './img/fl-vanilla.webp';

    //Draw the "tv screen"
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    pickColor();
    update();
})();

function update() {
    setTimeout(() => {
        //Draw the canvas background
        ctx.fillStyle = '#01b1ed';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //Draw DVD Logo and his background
        ctx.fillStyle = logoColor;
        ctx.fillRect(dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
        ctx.drawImage(dvd.img, dvd.x, dvd.y, dvd.img.width*scale, dvd.img.height*scale);
        //Move the logo
        dvd.x+=dvd.xspeed;
        dvd.y+=dvd.yspeed;
        //Check for collision 
        checkHitBox();
        update();   
    }, speed)
}

//Check for border collision
function checkHitBox(){
    if(dvd.x+dvd.img.width*scale >= canvas.width || dvd.x <= 0){
        dvd.xspeed *= -1;
        pickColor();
    }
        
    if(dvd.y+dvd.img.height*scale >= canvas.height || dvd.y <= 0){
        dvd.yspeed *= -1;
        pickColor();
    }    
}

//Pick a random color in RGB format
function pickColor(){
    r = Math.floor(Math.random() * 4);
    src = sources[r];
    console.log(r);
    console.log(src);
    dvd.img.src = sources[r];
}