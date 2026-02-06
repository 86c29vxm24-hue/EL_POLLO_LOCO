class ThrowableObject extends MovableObject {
  IMAGE_BOTTLETHROW = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGE_BOTTLESPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
  ];

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} groundY
   */
  constructor(x, y, groundY) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGE_BOTTLETHROW);
    this.loadImages(this.IMAGE_BOTTLESPLASH);
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
    this.groundY = groundY;
    this.hasSplashed = false;
    this.throw();
  }

  /**
   * @returns {void}
   */
  throw() {
    this.speedY = 15;
    this.applyGravity();
    this.startThrowAnimation();
    this.startThrowMovement();
  }

  /**
   * @returns {boolean}
   */
  isAboveGround() {
    return this.y < this.groundY;
  }

  /**
   * @returns {void}
   */
  startThrowAnimation() {
    this.animationInterval = setInterval(() => {
      if (!this.hasSplashed) this.playAnimation(this.IMAGE_BOTTLETHROW);
    }, 100);
  }

  /**
   * @returns {void}
   */
  startThrowMovement() {
    this.throwInterval = setInterval(() => {
      if (!this.hasSplashed) this.x += 8;
      if (!this.isAboveGround()) this.onImpact();
    }, 1000 / 60);
  }

  /**
   * @returns {void}
   */
  onImpact() {
    this.y = this.groundY;
    this.speedY = 0;
    clearInterval(this.animationInterval);
    clearInterval(this.throwInterval);
    this.splash();
  }

  /**
   * @returns {void}
   */
  splash() {
    this.hasSplashed = true;
    let i = 0;
    let splashInterval = setInterval(() => {
      this.img = this.imageCache[this.IMAGE_BOTTLESPLASH[i++]];
      if (i >= this.IMAGE_BOTTLESPLASH.length) clearInterval(splashInterval);
    }, 100);
  }
}
