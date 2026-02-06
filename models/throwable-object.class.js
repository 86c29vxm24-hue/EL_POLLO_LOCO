class ThrowableObject extends MovableObject {
  IMAGE_BOTTLETHROW = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y, groundY) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGE_BOTTLETHROW);
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
    let animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGE_BOTTLETHROW);
    }, 100);
    let throwInterval = setInterval(() => {
      this.x += 8;
      if (!this.isAboveGround()) {
        this.y = this.groundY;
        this.speedY = 0;
        clearInterval(animationInterval);
        clearInterval(throwInterval);
      }
    }, 1000 / 60);
  }

  isAboveGround() {
    return this.y < this.groundY;
  }
}
