let canvas;
let myMap;
const mKey = "pk.eyJ1IjoiamRlYm9pIiwiYSI6ImNraTlqZjI5dzBiczcyeW12b3JqczVqcjQifQ.Ixa9kxflypCdfdL289pPiA";

const options = {
  lat: 29.96,
  lng: -90.08,
  minzoom: 13,
  maxzoom: 16,
  zoom: 15,
  studio: true, // false to use non studio styles
  //style: 'mapbox.dark' //streets, outdoors, light, dark, satellite (for nonstudio)
  style: 'mapbox://styles/mapbox/satellite-v9'
  // streets 'mapbox://styles/mapbox/satellite-streets-v11'
  // no stsreets mapbox://styles/mapbox/satellite-v9',
};

// Create an instance of Mapbox
const mappa = new Mappa('Mapbox', mKey);

let overviews = [];
let destinations = [];
let sanborns = [];

let pastOn = true;
let json;



function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  overviews[0] = loadImage("assets/past/overview/Claiborne Overview 1947.jpg", drawImage);
  overviews[1] = loadImage("assets/past/overview/Overview2.jpg", drawImage);

  sanborns[0] = loadImage("assets/past/Sanborn_Maps_1944/0.jpg", drawImage);
  sanborns[1] = loadImage("assets/past/Sanborn_Maps_1944/1.jpg", drawImage);
  sanborns[2] = loadImage("assets/past/Sanborn_Maps_1944/2.jpg", drawImage);


  loadJSON("/assets/past/images.json", loadDestinations);

  // destinations[0] = new Destination({ lat: 29.96, lng: -90.08 }, "assets/past/destinations/Ursulines at N.Claiborne_1947_4.jpg");

  myMap.onChange(drawImage);

  // overviews[1] = loadImage("assets/past/overview/Overview2.jpg", drawImage);
}

// The draw loop is fully functional but we are not using it for now.
function draw() {
  for (const d of destinations) {
    d.update(() => drawImage());
  }

}


function mousePressed() {
  console.log(myMap.pixelToLatLng(mouseX, mouseY));
}

function drawImage() {

  clear();

  if (pastOn) {


    fill(0, 120);
    rect(0, 0, width, height);

    drawOverview(overviews[0], { lat: 29.9647, lng: -90.0741 }, 18.02, 38);
    drawOverview(overviews[1], { lat: 29.974, lng: -90.0624 }, 19, 90);


    drawOverview(sanborns[0], { lat: 29.95933130009874, lng: -90.07804691791534 }, 21.1, -52);
    drawOverview(sanborns[1], { lat: 29.963942290534696, lng: -90.07376611232758 }, 21.2, -52);
    drawOverview(sanborns[2], { lat: 29.965691708624686, lng: -90.07219108068968 }, 21.2, -52);

    for (const d of destinations) {
      d.updateCoords(myMap);
      d.display();
    }
    // destinations[0].updateCoords(myMap);
    // destinations[0].display();
  }



}

function loadDestinations(images) {
  for (let i = 0; i < images.length; i++) {
    const { coord, path } = images[i];
    const url = '/assets/past/destinations/' + path;
    destinations[i] = new Destination({ lat: coord.lat, lng: coord.lng }, url);
  }
}

function drawOverview(img, startCoord, startZoom, rotDeg) {
  if (!img) return;

  const pixels = myMap.latLngToPixel(startCoord.lat, startCoord.lng);

  const { w, h } = getImageSize(img, startZoom);

  if (w > 20 && height > 20) {
    push();
    translate(pixels.x, pixels.y);
    rotate(radians(rotDeg));
    noFill();
    stroke(255, 0, 255);
    strokeWeight(3);
    rect(0, 0, w, h);

    image(img, 0, 0, w, h);
    pop();
  }
  else {
    noStroke();
    fill(255, 0, 255);
    ellipse(pixels.x, pixels.y, 10);
  }
}

function keyTyped() {
  if (key === 'p') {
    pastOn = !pastOn;
    drawImage();
  }
}

function togglePast() {
  pastOn = !pastOn;
  drawImage();
}

function getImageSize(img, zoomDefault) {
  let zoomDiff = myMap.zoom() - zoomDefault;
  let factor = 1;
  if (zoomDiff !== 0) {
    factor = pow(2, -abs(zoomDiff));
  }
  let w = img.width * factor;
  let h = img.height * factor;
  return { w, h };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}