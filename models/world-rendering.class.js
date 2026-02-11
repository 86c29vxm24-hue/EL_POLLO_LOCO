Object.assign(World.prototype, {
  /**
    * Performs draw.
    *
   * @returns {void}
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.drawStartOrEndScreen()) return this.loopDraw();
    this.drawGameScene();
    this.loopDraw();
  },

  /**
    * Draws start or end screen.
    *
   * @returns {boolean}
   */
  drawStartOrEndScreen() {
    if (!this.gameStarted) return this.drawOnlyStartScreen();
    if (this.gameEnded) return this.drawOnlyEndScreen();
    return false;
  },

  /**
    * Draws only start screen.
    *
   * @returns {boolean}
   */
  drawOnlyStartScreen() {
    this.startScreen.draw(this.ctx);
    return true;
  },

  /**
    * Draws only end screen.
    *
   * @returns {boolean}
   */
  drawOnlyEndScreen() {
    this.endScreen.draw(this.ctx);
    return true;
  },

  /**
    * Draws game scene.
    *
   * @returns {void}
   */
  drawGameScene() {
    this.ctx.translate(this.camera_x, 0);
    this.drawWorldObjects();
    if (!this.character.isAboveGround()) this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBars();
    if (this.character.isAboveGround()) {
      this.ctx.translate(this.camera_x, 0);
      this.addToMap(this.character);
      this.ctx.translate(-this.camera_x, 0);
    }
  },

  /**
    * Draws world objects.
    *
   * @returns {void}
   */
  drawWorldObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.collectableObjects);
  },

  /**
    * Draws status bars.
    *
   * @returns {void}
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarEndboss);
  },

  /**
    * Performs loop draw.
    *
   * @returns {void}
   */
  loopDraw() {
    requestAnimationFrame(() => {
      this.draw();
    });
  },

  /**
    * Performs add objects to map.
    *
   * @param {Array} objects
   * @returns {void}
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  },

  /**
    * Performs add to map.
    *
   * @param {MovableObject} movableObject
   * @returns {void}
   */
  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }

    movableObject.draw(this.ctx);
    movableObject.drawFrame(this.ctx);

    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  },

  /**
    * Performs flip image.
    *
   * @param {MovableObject} mo
   * @returns {void}
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1 - mo.width;
  },

  /**
    * Performs flip image back.
    *
   * @param {MovableObject} mo
   * @returns {void}
   */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = (mo.x + mo.width) * -1;
  },
});
