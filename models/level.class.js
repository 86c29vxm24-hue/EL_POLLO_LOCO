class Level {
  enemies;
  clouds;
  backgroundObjects;
  level_end_x = 6000;

  /**
   * @param {MovableObject[]} enemies
   * @param {Cloud[]} clouds
   * @param {BackgroundObject[]} backgroundObjects
   */
  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
