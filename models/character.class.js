class Character extends MovableObject {
  height = 280;
  y = 155;
  speed = 6;
  idleStartTime = Date.now();
  animationState = "idle";
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png"
  ];

  currentImage = 0;

  constructor() {
    super();
    this.loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * @returns {boolean}
   */
  canControlCharacter() {
    return this.world.gameStarted && !this.world.gameEnded;
  }

  animate() {
    this.startMovementLoop();
    this.startAnimationLoop();
  }

  /**
   * @returns {void}
   */
  startMovementLoop() {
    this.trackInterval(() => {
      if (this.isDead() || !this.canControlCharacter()) return;
      this.handleHorizontalMovement();
      this.handleJumpInput();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * @returns {void}
   */
  handleHorizontalMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  /**
   * @returns {void}
   */
  handleJumpInput() {
    if ((this.world.keyboard.UP || this.world.keyboard.SPACE) && !this.isAboveGround()) {
      this.jump();
    }
  }

  /**
   * @returns {void}
   */
  startAnimationLoop() {
    this.trackInterval(() => {
      if (!this.canControlCharacter()) return;
      this.playCurrentAnimation();
    }, 100);
  }

  /**
   * @returns {void}
   */
  playCurrentAnimation() {
    if (this.isDead()) return this.playState("dead", this.IMAGES_DEAD);
    if (this.isHurt()) return this.playState("hurt", this.IMAGES_HURT);
    if (this.isAboveGround()) {
      this.idleStartTime = Date.now();
      return this.playState("jump", this.IMAGES_JUMPING);
    }
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.idleStartTime = Date.now();
      return this.playState("walk", this.IMAGES_WALKING);
    }
    if (Date.now() - this.idleStartTime >= 5000) {
      return this.playState("longIdle", this.IMAGES_LONG_IDLE);
    }
    this.playState("idle", this.IMAGES_IDLE);
  }

  /**
   * @param {string} state
   * @param {string[]} images
   * @returns {void}
   */
  playState(state, images) {
    if (this.animationState !== state) {
      this.animationState = state;
      this.currentImage = 0;
    }
    this.playAnimation(images);
  }

  jump() {
    if (!this.canControlCharacter()) return;
    gameSounds.playJump();
    this.speedY = 28;
  }

  /**
   * @returns {void}
   */
  hit() {
    let previousEnergy = this.energy;
    super.hit();
    if (this.energy < previousEnergy) {
      gameSounds.playCharacterHurt();
    }
  }
}
