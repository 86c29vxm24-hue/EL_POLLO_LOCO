class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  intervals = [];
  timeouts = [];

  /**
    * Performs apply gravity.
    *
   * @returns {void}
   */
  applyGravity() {
    this.trackInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        const groundY = this.getGroundY();
        if (this.y > groundY) {
          this.y = groundY;
          this.speedY = 0;
        }
      }
    }, 1000 / 25);
  }

  /**
    * Performs track interval.
    *
   * @param {Function} callback
   * @param {number} ms
   * @returns {number}
   */
  trackInterval(callback, ms) {
    const intervalId = setInterval(callback, ms);
    this.intervals.push(intervalId);
    return intervalId;
  }

  /**
    * Performs track timeout.
    *
   * @param {Function} callback
   * @param {number} ms
   * @returns {number}
   */
  trackTimeout(callback, ms) {
    const timeoutId = setTimeout(callback, ms);
    this.timeouts.push(timeoutId);
    return timeoutId;
  }

  /**
    * Performs clear tracked intervals.
    *
   * @returns {void}
   */
  clearTrackedIntervals() {
    this.intervals.forEach((intervalId) => clearInterval(intervalId));
    this.intervals = [];
  }

  /**
    * Performs clear tracked timeouts.
    *
   * @returns {void}
   */
  clearTrackedTimeouts() {
    this.timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    this.timeouts = [];
  }

  /**
    * Performs dispose.
    *
   * @returns {void}
   */
  dispose() {
    this.clearTrackedIntervals();
    this.clearTrackedTimeouts();
  }

  /**
    * Checks whether is above ground.
    *
   * @returns {boolean}
   */
  isAboveGround() {
    return this.y < this.getGroundY();
  }

  /**
    * Returns ground y.
    *
   * @returns {number}
   */
  getGroundY() {
    return typeof this.groundY === "number" ? this.groundY : 160;
  }

  /**
    * Performs move right.
    *
   * @returns {void}
   */
  moveRight() {
    if (this.world && (!this.world.gameStarted || this.world.gameEnded)) return;
    this.x += this.speed;
  }

  /**
    * Performs move left.
    *
   * @returns {void}
   */
  moveLeft() {
    if (this.world && (!this.world.gameStarted || this.world.gameEnded)) return;
    this.x -= this.speed;
  }

  /**
    * Plays animation.
    *
   * @param {string[]} images
   * @returns {void}
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
    * Performs jump.
    *
   * @returns {void}
   */
  jump() {
    this.speedY = 30;
  }

  /**
    * Checks whether is colliding.
    *
   * @param {MovableObject} mo
   * @returns {boolean}
   */
  isColliding(mo) {
    const selfOffsets = this.getSelfCollisionOffsets(mo);
    const targetOffsets = this.getTargetCollisionOffsets(mo);
    return this.hasBoxOverlap(mo, selfOffsets, targetOffsets);
  }

  /**
    * Returns self collision offsets.
    *
   * @param {MovableObject} mo
   * @returns {{left:number,right:number,top:number,bottom:number}}
   */
  getSelfCollisionOffsets(mo) {
    const offsets = { left: 0, right: 0, top: 0, bottom: 0 };
    if (this instanceof Character) Object.assign(offsets, { left: 20, right: 30, top: 70, bottom: 20 });
    if (mo instanceof CollectableObjects) Object.assign(offsets, { left: offsets.left + 40, right: offsets.right + 40, top: offsets.top + 80 });
    if (mo instanceof CollectableObjects && !mo.isCoin) Object.assign(offsets, { left: offsets.left + 5, right: offsets.right + 5 });
    return offsets;
  }

  /**
    * Returns target collision offsets.
    *
   * @param {MovableObject} mo
   * @returns {{left:number,right:number,top:number,bottom:number}}
   */
  getTargetCollisionOffsets(mo) {
    const offsets = { left: 0, right: 0, top: 0, bottom: 0 };
    if (mo instanceof Endboss || this instanceof Endboss) Object.assign(offsets, { left: 60, right: 60, top: 40, bottom: 40 });
    if (mo instanceof Chicken || this instanceof Chicken) offsets.top += 20;
    if (mo instanceof ChickenSmall || this instanceof ChickenSmall) {
      offsets.left += 20;
      offsets.right += 20;
      offsets.top += 20;
      offsets.bottom += 20;
    }
    return offsets;
  }

  /**
    * Checks whether has box overlap.
    *
   * @param {MovableObject} mo
   * @param {{left:number,right:number,top:number,bottom:number}} selfOffsets
   * @param {{left:number,right:number,top:number,bottom:number}} targetOffsets
   * @returns {boolean}
   */
  hasBoxOverlap(mo, selfOffsets, targetOffsets) {
    return (
      this.x + this.width - selfOffsets.right > mo.x + targetOffsets.left &&
      this.x + selfOffsets.left < mo.x + mo.width - targetOffsets.right &&
      this.y + this.height - selfOffsets.bottom > mo.y + targetOffsets.top &&
      this.y + selfOffsets.top < mo.y + mo.height - targetOffsets.bottom
    );
  }

  /**
    * Performs hit.
    *
   * @returns {void}
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
    * Checks whether is hurt.
    *
   * @returns {boolean}
   */
  isHurt() {
    let actualTime = new Date().getTime();
    let timePassed = actualTime - this.lastHit;
    return timePassed < 600;
  }

  /**
    * Checks whether is dead.
    *
   * @returns {boolean}
   */
  isDead() {
    return this.energy === 0;
  }
}
