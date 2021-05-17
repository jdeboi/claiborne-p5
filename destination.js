class Destination {

    constructor(coord, imgPath) {
        this.coord = coord;
        this.img = loadImage(imgPath);
        this.showImage = false;

        this.x = 0;
        this.y = 0;
    }


    display() {
        
        push();
        fill(0, 255, 0);
        noStroke();
        rectMode(CENTER);
        rect(this.x, this.y, 10);

        if (this.showImage) {
            image(this.img, this.x, this.y, 200, 100);
        }
        pop();
    }

    updateCoords() {
        const { x, y } = myMap.latLngToPixel(this.coord.lat, this.coord.lng);
        this.x = x;
        this.y = y;
    }
    
    update(callback) {
       
        if (this.mouseOver(this.x, this.y)) {
            if (!this.showImage) {
                this.showImage = true;
                callback();
            }
        }
        else {
            if (this.showImage) {
                this.showImage = false;
                callback();
            }
        }

    }

    mouseOver(x, y) {
        if (!x || !y)
            return false;

        let d = dist(x, y, mouseX, mouseY);
        return d < 5;
    }
}