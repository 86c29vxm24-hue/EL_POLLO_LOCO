Object.assign(World.prototype, {
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.drawStartOrEndScreen()) return this.loopDraw();
    this.drawGameScene();
    this.loopDraw();
  },

  /**
   * @returns {boolean}
   */
  drawStartOrEndScreen() {
    if (!this.gameStarted) return this.drawOnlyStartScreen();
    if (this.gameEnded) return this.drawOnlyEndScreen();
    return false;
  },

  /**
   * @returns {boolean}
   */
  drawOnlyStartScreen() {
    this.startScreen.draw(this.ctx);
    return true;
  },

  /**
   * @returns {boolean}
   */
  drawOnlyEndScreen() {
    this.endScreen.draw(this.ctx);
    return true;
  },

  /**
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
   * @returns {void}
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarEndboss);
  },

  /**
   * @returns {void}
   */
  loopDraw() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  },

  /**
   * @param {Array} objects
   * @returns {void}
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  },

  /**
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
   * @param {MovableObject} mo
   * @returns {void}
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  },

  /**
   * @param {MovableObject} mo
   * @returns {void}
   */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  },
});
