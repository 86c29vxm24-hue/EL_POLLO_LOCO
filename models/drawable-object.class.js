class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  width = 100;
  height = 150;
  /**
    * Performs load image.
    *
   * @param {string} path
   * @returns {void}
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
    * Performs draw.
    *
   * @param {CanvasRenderingContext2D} ctx
   * @returns {void}
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
    * Performs load images.
    *
   * @param {string[]} arr
   * @returns {void}
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
    * Draws frame.
    *
   * @param {CanvasRenderingContext2D} ctx
   * @returns {void}
   */
  drawFrame(ctx) {}
}
