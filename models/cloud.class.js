class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 150;

  /**
    * Initializes the instance.
    *
   * @returns {void}
   */
  constructor() {
    super();
    this.loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 6000;
    this.animate();
  }

  /**
    * Performs animate.
    *
   * @returns {void}
   */
  animate() {
    this.trackInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
