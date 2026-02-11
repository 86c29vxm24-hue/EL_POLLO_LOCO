class ChickenEnemy extends MovableObject {
  dead = false;

  /**
   * @param {{
   *   y:number,
   *   height:number,
   *   width:number,
   *   image:string,
   *   walkingImages:string[],
   *   deadImages:string[],
   *   speedMin:number,
   *   speedRange:number
   * }} config
   * @returns {void}
   */
  constructor(config) {
    super();
    this.y = config.y;
    this.height = config.height;
    this.width = config.width;
    this.IMAGES_WALKING = config.walkingImages;
    this.IMAGES_CHICKEN_DEAD = config.deadImages;
    this.loadImage(config.image);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_CHICKEN_DEAD);
    this.x = 200 + Math.random() * 4800;
    if (this.x < 300) this.x = 300 + Math.random() * 200;
    this.speed = config.speedMin + Math.random() * config.speedRange;
    this.animate();
  }

  /**
    * Performs animate.
    *
   * @returns {void}
   */
  animate() {
    this.startMovement();
    this.startAnimation();
  }

  /**
    * Performs start movement.
    *
   * @returns {void}
   */
  startMovement() {
    this.trackInterval(() => {
      if (!this.dead) this.moveLeft();
    }, 1000 / 60);
  }

  /**
    * Performs start animation.
    *
   * @returns {void}
   */
  startAnimation() {
    this.trackInterval(() => {
      if (this.world && this.world.isPaused) return;
      if (this.dead) this.playAnimation(this.IMAGES_CHICKEN_DEAD);
      else this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  /**
    * Performs die.
    *
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

class Chicken extends ChickenEnemy {
  /**
    * Initializes the instance.
    *
   * @returns {void}
   */
  constructor() {
    super({
      y: 370,
      height: 60,
      width: 80,
      image: "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      walkingImages: [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
      ],
      deadImages: ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"],
      speedMin: 0.15,
      speedRange: 0.5,
    });
  }
}

class ChickenSmall extends ChickenEnemy {
  /**
    * Initializes the instance.
    *
   * @returns {void}
   */
  constructor() {
    super({
      y: 380,
      height: 50,
      width: 60,
      image: "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      walkingImages: [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
      ],
      deadImages: ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"],
      speedMin: 0.2,
      speedRange: 0.55,
    });
  }
}
