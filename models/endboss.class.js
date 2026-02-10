class Endboss extends MovableObject {
  height = 400;
  y = 55;
  width = 300;
  x;

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  phase = "idle";
  hasTriggered = false;
  startX = 0;
  isSequenceRunning = false;
  energy = 100;
  isHurt = false;

  /**
   * @returns {void}
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT); this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK); this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 1400;
    this.startX = this.x;
    this.speed = 1.8 + Math.random() * 0.9;
    this.animate();
  }

  /**
   * @returns {void}
   */
  animate() {
    this.trackInterval(() => {
      this.updateState();
    }, 200);
    this.trackInterval(() => {
      this.playCurrentAnimation();
    }, 200);
    this.trackInterval(() => {
      this.walkToCharacter();
    }, 1000 / 60);
  }

  /**
   * @returns {void}
   */
  updateState() {
    if (this.isDead()) return;
    if (this.isTriggered() && !this.isSequenceRunning) this.triggerSequence();
  }

  /**
   * @returns {void}
   */
  triggerSequence() {
    if (!this.hasTriggered) this.runAlertCycle();
    else this.runWalkAttackCycle();
  }

  /**
   * @param {string} phase
   * @returns {void}
   */
  setPhase(phase) {
    this.phase = phase;
  }

  /**
   * @returns {void}
   */
  playCurrentAnimation() {
    if (this.isHurt) return this.playAnimation(this.IMAGES_HURT);
    if (this.isDead()) return this.playAnimation(this.IMAGES_DEAD);
    if (this.phase === "alert") this.playAnimation(this.IMAGES_ALERT);
    if (this.phase === "walk") this.playAnimation(this.IMAGES_WALKING);
    if (this.phase === "attack") this.playAnimation(this.IMAGES_ATTACK);
  }

  /**
   * @returns {void}
   */
  runAlertCycle() {
    this.hasTriggered = true;
    this.beginWalkCycle();
    this.setPhase("alert");
    this.trackTimeout(() => this.setPhase("walk"), 700);
    this.trackTimeout(() => this.setPhase("attack"), 2100);
    this.trackTimeout(() => this.finishSequence(), 2800);
  }

  /**
   * @returns {void}
   */
  runWalkAttackCycle() {
    this.beginWalkCycle();
    this.setPhase("walk");
    this.trackTimeout(() => this.setPhase("attack"), 1400);
    this.trackTimeout(() => this.finishSequence(), 2200);
  }

  /**
   * @returns {void}
   */
  beginWalkCycle() {
    this.isSequenceRunning = true;
    this.startX = this.x;
  }

  /**
   * @returns {void}
   */
  finishSequence() {
    this.isSequenceRunning = false;
    this.setPhase("walk");
  }

  /**
   * @returns {void}
   */
  walkToCharacter() {
    if (this.isDead()) return;
    if (this.phase !== "walk") return;
    this.x -= this.speed;
  }

  /**
   * @returns {void}
   */
  takeHit() {
    if (this.isDead()) return;
    this.energy -= 20;
    if (this.energy < 0) this.energy = 0;
    this.triggerHurt();
    if (this.isDead()) this.setPhase("dead");
  }

  /**
   * @returns {void}
   */
  triggerHurt() {
    this.isHurt = true;
    this.trackTimeout(() => {
      this.isHurt = false;
    }, 400);
  }

  /**
   * @returns {boolean}
   */
  isTriggered() {
    if (!this.world) return false;
    return this.world.character.x > this.x - 700;
  }
}
