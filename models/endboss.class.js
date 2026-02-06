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
    "img/4_enemie_boss_chicken/1_walk/G5.png",
    "img/4_enemie_boss_chicken/1_walk/G6.png",
    "img/4_enemie_boss_chicken/1_walk/G7.png",
    "img/4_enemie_boss_chicken/1_walk/G8.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/3_hurt/G21.png",
    "img/4_enemie_boss_chicken/3_hurt/G22.png",
    "img/4_enemie_boss_chicken/3_hurt/G23.png",
    "img/4_enemie_boss_chicken/3_hurt/G24.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);

    this.x = 1400;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
