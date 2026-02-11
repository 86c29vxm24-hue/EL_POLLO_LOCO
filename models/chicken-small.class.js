class ChickenSmall extends MovableObject {
  y = 380;
  height = 50;
  width = 60;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_CHICKEN_DEAD = [
    "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ];
  dead = false;

  /**
   * @returns {void}
   */
  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_CHICKEN_DEAD);
    this.x = 200 + Math.random() * 4800;
    if (this.x < 300) this.x = 300 + Math.random() * 200;
    this.speed = 0.2 + Math.random() * 0.55;
    this.animate();
  }

  /**
   * @returns {void}
   */
  animate() {
    this.startMovement();
    this.startAnimation();
  }

  /**
   * @returns {void}
   */
  startMovement() {
    this.trackInterval(() => {
      if (!this.dead) this.moveLeft();
    }, 1000 / 60);
  }

  /**
   * @returns {void}
   */
  startAnimation() {
    this.trackInterval(() => {
      if (this.dead) this.playAnimation(this.IMAGES_CHICKEN_DEAD);
      else this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  /**
   * @returns {void}
   */
  die() {
    if (this.dead) return;
    this.dead = true;
    this.trackTimeout(() => {
      this.width = 0;
      this.height = 0;
    }, 1500);
  }
}
