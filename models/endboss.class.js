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
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * @returns {void}
   */
  animate() {
    setInterval(() => {
      this.updateState();
    }, 200);
    setInterval(() => {
      this.playCurrentAnimation();
    }, 200);
    setInterval(() => {
      this.walkToCharacter();
    }, 1000 / 60);
  }

  /**
   * @returns {void}
   */
  updateState() {
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
    setTimeout(() => this.setPhase("walk"), 1200);
    setTimeout(() => this.setPhase("attack"), 2400);
    setTimeout(() => this.finishSequence(), 3600);
  }

  /**
   * @returns {void}
   */
  runWalkAttackCycle() {
    this.beginWalkCycle();
    this.setPhase("walk");
    setTimeout(() => this.setPhase("attack"), 1200);
    setTimeout(() => this.finishSequence(), 2400);
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
    if (this.phase !== "walk") return;
    if (this.x <= this.startX - 300) return;
    this.x -= 1;
  }

  /**
   * @returns {boolean}
   */
  isTriggered() {
    if (!this.world) return false;
    return this.world.character.x > this.x - 500;
  }
}
