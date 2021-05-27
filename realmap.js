let canvas;
let bkImg;
let carImg;
let cars = [];
let carIndex = 0;
let x, y;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    bkImg = loadImage("/assets/stbernard.png");
    carImg = loadImage("/assets/car.png");

    for (let i = 0; i < 40; i++) {
        cars[i] = new Car();
    }
}

// The draw loop is fully functional but we are not using it for now.
function draw() {
    image(bkImg, 0, 0, width, height);
    
    for (const car of cars) {
        car.move();
        car.display();
    }
}


function mousePressed() {
    cars[carIndex].started = true;
    carIndex++;
    carIndex %= cars.length;
}