class StartScreen extends DrawableObject {
  IMAGE_START_SCREEN = [
    "img/9_intro_outro_screens/start/startscreen_1.png",
  ];

  /**
    * Initializes the instance.
    *
   * @returns {void}
   */
  constructor() {
    super();
    this.loadImage(this.IMAGE_START_SCREEN[0]);
    this.x = 0;
    this.y = 0;
    this.width = 720;
    this.height = 480;
  }
}
