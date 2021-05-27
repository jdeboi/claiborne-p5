class Car {

    constructor() {

        this.started = false;
        this.dir = random([-1, 1]);
        this.setXY();
    }

    setXY() {
        if (this.dir > 0) {
            this.x = random([130, 150]);
            this.y = height;
        }
        else {
            this.x = random([750, 770]);
            this.y = -10;
        }
    }

    move() {
        if (this.started) {
            if (this.dir > 0) {
                this.x += .64;
                this.y--;
                if (this.y < -10) {
                    this.setXY();
                }
            }
            else {
                this.x -= .64;
                this.y++;
                if (this.y > height) {
                    this.setXY();
                }
            }
            
        }

    }

    display() {
        image(carImg, this.x, this.y, carImg.width * .5, carImg.height * .5);
    }
}