class ChickenSmall extends ChickenEnemy {
  /**
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
