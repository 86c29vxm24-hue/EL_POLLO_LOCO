class ThrowableObject extends MovableObject {

    constructor(x, y, groundY) {
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.groundY = groundY;
        this.throw();
    }


    throw() {
        this.speedY = 15;
        this.applyGravity();
        let throwInterval = setInterval(() => {
            this.x += 8;
            if (!this.isAboveGround()) {
                this.y = this.groundY;
                this.speedY = 0;
                clearInterval(throwInterval);
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        return this.y < this.groundY;
    }
    
     
}
