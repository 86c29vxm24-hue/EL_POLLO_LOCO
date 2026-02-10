class MovableObject extends DrawableObject {

  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  intervals = [];
  timeouts = [];




  applyGravity() {
    this.trackInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
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
   * @returns {void}
   */
  clearTrackedIntervals() {
    this.intervals.forEach((intervalId) => clearInterval(intervalId));
    this.intervals = [];
  }

  /**
   * @returns {void}
   */
  clearTrackedTimeouts() {
    this.timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    this.timeouts = [];
  }

  /**
   * @returns {void}
   */
  dispose() {
    this.clearTrackedIntervals();
    this.clearTrackedTimeouts();
  }

  isAboveGround() {
    return this.y < 160;
  }

  moveRight() {
    if (this.world && (!this.world.gameStarted || this.world.gameEnded)) return;
    this.x += this.speed;
  }

  moveLeft() {
    if (this.world && (!this.world.gameStarted || this.world.gameEnded)) return;
    {
      this.x -= this.speed;
    }
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 30;
  }

  isColliding(mo) {
    const selfOffsets = this.getSelfCollisionOffsets(mo);
    const targetOffsets = this.getTargetCollisionOffsets(mo);
    return this.hasBoxOverlap(mo, selfOffsets, targetOffsets);
  }

  /**
   * @param {MovableObject} mo
   * @returns {{left:number,right:number,top:number,bottom:number}}
   */
  getSelfCollisionOffsets(mo) {
    const offsets = { left: 0, right: 0, top: 0, bottom: 0 };
    if (this instanceof Character) Object.assign(offsets, { left: 20, right: 20, top: 70, bottom: 20 });
    if (mo instanceof CollectableObjects) Object.assign(offsets, { left: offsets.left + 40, right: offsets.right + 40, top: offsets.top + 80 });
    return offsets;
  }

  /**
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

  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {this.lastHit = new Date().getTime();}
  }

  isHurt() {
    let actualTime = new Date().getTime();
    let timePassed = actualTime - this.lastHit;
    return timePassed < 600;
  }

  isDead() {
    return this.energy == 0;
  }
}
