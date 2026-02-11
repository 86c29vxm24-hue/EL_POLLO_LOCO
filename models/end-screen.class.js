class EndScreen extends DrawableObject {
  IMAGES_YOU_WIN = [
    "img/You won, you lost/You Win A.png",
  ];
  IMAGES_GAME_OVER = [
    "img/You won, you lost/Game Over.png",
  ];

  /**
    * Initializes the instance.
    *
   * @returns {void}
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_YOU_WIN);
    this.loadImages(this.IMAGES_GAME_OVER);
    this.x = 0;
    this.y = 0;
    this.width = 720;
    this.height = 480;
  }

  /**
    * Performs show win.
    *
   * @returns {void}
   */
  showWin() {
    this.img = this.imageCache[this.IMAGES_YOU_WIN[0]];
  }

  /**
    * Performs show lose.
    *
   * @returns {void}
   */
  showLose() {
    this.img = this.imageCache[this.IMAGES_GAME_OVER[0]];
  }
}
