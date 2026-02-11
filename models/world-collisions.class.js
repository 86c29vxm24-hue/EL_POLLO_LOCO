Object.assign(World.prototype, {
  /**
    * Checks collisions.
    *
   * @returns {void}
   */
  checkCollisions() {
    if (!this.gameStarted) return;
    this.checkGameEnd();
    this.checkJumpOnEnemies();
    this.checkEnemyCollisions();
    this.checkCollectableCollisions();
    this.checkBottleCollisions();
  },

  /**
    * Checks game end.
    *
   * @returns {void}
   */
  checkGameEnd() {
    if (this.endScheduled) return;
    if (this.character.isDead()) return this.scheduleEnd("lose");
    const boss = this.getEndboss();
    if (boss && boss.isDead()) return this.scheduleEnd("win");
  },

  /**
    * Performs schedule end.
    *
   * @param {string} type
   * @returns {void}
   */
  scheduleEnd(type) {
    this.endScheduled = true;
    if (type === "lose") gameSounds.playCharacterDeath();
    if (type === "win") gameSounds.playEndbossDeath();
    const loseDelay = this.character.IMAGES_DEAD.length * 100 + 150;
    const delay = type === "lose" ? loseDelay : 2500;
    setTimeout(() => this.showEndScreen(type), delay);
  },

  /**
    * Performs show end screen.
    *
   * @param {string} type
   * @returns {void}
   */
  showEndScreen(type) {
    this.gameEnded = true;
    gameSounds.stopAllSounds();
    this.renderEndScreenByType(type);
    this.showEndButtons();
  },

  /**
    * Performs render end screen by type.
    *
   * @param {string} type
   * @returns {void}
   */
  renderEndScreenByType(type) {
    if (type === "win") {
      gameSounds.playWinEndScreenSound();
      this.endScreen.showWin();
    }
    if (type === "lose") {
      gameSounds.playLoseEndScreenSound();
      this.endScreen.showLose();
    }
  },

  /**
    * Performs show end buttons.
    *
   * @returns {void}
   */
  showEndButtons() {
    let menuBtn = document.getElementById("end-button");
    let playAgainBtn = document.getElementById("play-again-button");
    if (menuBtn) menuBtn.style.display = "flex";
    if (playAgainBtn) playAgainBtn.style.display = "flex";
  },

  /**
    * Checks enemy collisions.
    *
   * @returns {void}
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.dead && this.character.isColliding(enemy) && !this.character.isHurt()) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  },

  /**
    * Checks collectable collisions.
    *
   * @returns {void}
   */
  checkCollectableCollisions() {
    this.collectableObjects = this.collectableObjects.filter((obj) => {
      if (obj.isCoin && this.character.isColliding(obj)) return this.collectCoin();
      if (!obj.isCoin && this.character.isColliding(obj)) return this.collectBottle();
      return true;
    });
  },

  /**
    * Performs collect coin.
    *
   * @returns {boolean}
   */
  collectCoin() {
    this.statusBarCoins.coins = (this.statusBarCoins.coins || 0) + 1;
    gameSounds.playCoinCollect();
    const coinPercentage = this.getCoinPercentage();
    this.statusBarCoins.collectCoin(coinPercentage);
    return false;
  },

  /**
    * Performs collect bottle.
    *
   * @returns {boolean}
   */
  collectBottle() {
    this.statusBarBottles.bottles = (this.statusBarBottles.bottles || 0) + 1;
    gameSounds.playBottleCollect();
    this.statusBarBottles.collectBottle(this.getBottlePercentage());
    return false;
  },

  /**
    * Returns bottle percentage.
    *
   * @returns {number}
   */
  getBottlePercentage() {
    let maxBottles = this.totalBottles || 1;
    let bottles = this.statusBarBottles.bottles || 0;
    if (bottles <= 0) return 0;
    return Math.max(20, Math.min(100, bottles * (100 / maxBottles)));
  },

  /**
    * Returns coin percentage.
    *
   * @returns {number}
   */
  getCoinPercentage() {
    let maxCoins = this.totalCoins || 1;
    let coins = this.statusBarCoins.coins || 0;
    if (coins <= 0) return 0;
    return Math.max(20, Math.min(100, coins * (100 / maxCoins)));
  },

  /**
    * Checks bottle collisions.
    *
   * @returns {void}
   */
  checkBottleCollisions() {
    const boss = this.getEndboss();
    this.throwableObject.forEach((bottle) => {
      if (bottle.hasSplashed) return;
      this.checkBottleChickenHits(bottle);
      this.checkBottleBossHit(bottle, boss);
    });
  },

  /**
    * Checks bottle chicken hits.
    *
   * @param {ThrowableObject} bottle
   * @returns {void}
   */
  checkBottleChickenHits(bottle) {
    this.level.enemies.forEach((enemy) => {
      const isChickenEnemy = enemy instanceof ChickenEnemy;
      if (!isChickenEnemy || enemy.dead || !bottle.isColliding(enemy)) return;
      gameSounds.playEnemyHit();
      enemy.die();
      this.splashBottleAtImpact(bottle);
    });
  },

  /**
    * Checks bottle boss hit.
    *
   * @param {ThrowableObject} bottle
   * @param {Endboss|undefined} boss
   * @returns {void}
   */
  checkBottleBossHit(bottle, boss) {
    if (!boss || !bottle.isColliding(boss)) return;
    gameSounds.playEndbossHit();
    boss.takeHit();
    this.statusBarEndboss.healthEndboss(boss.energy);
    this.splashBottleAtImpact(bottle);
  },

  /**
    * Performs splash bottle at impact.
    *
   * @param {ThrowableObject} bottle
   * @returns {void}
   */
  splashBottleAtImpact(bottle) {
    bottle.impactX = bottle.x;
    bottle.impactY = bottle.y;
    bottle.onImpact();
  },

  /**
    * Returns endboss.
    *
   * @returns {Endboss|undefined}
   */
  getEndboss() {
    return this.level.enemies.find((e) => e instanceof Endboss);
  },

  /**
    * Checks jump on enemies.
    *
   * @returns {void}
   */
  checkJumpOnEnemies() {
    const currentBottom = this.getCharacterBottomForStomp();
    const previousBottom = this.lastCharacterBottom ?? currentBottom;
    this.level.enemies.forEach((enemy) => this.tryStompEnemy(enemy, previousBottom, currentBottom));
    this.lastCharacterBottom = currentBottom;
  },

  /**
    * Performs try stomp enemy.
    *
   * @param {MovableObject} enemy
   * @param {number} previousBottom
   * @param {number} currentBottom
   * @returns {void}
   */
  tryStompEnemy(enemy, previousBottom, currentBottom) {
    if (!this.canStompEnemy(enemy, previousBottom, currentBottom)) return;
    gameSounds.playEnemyHit();
    enemy.die();
    this.character.speedY = 15;
  },

  /**
    * Checks whether can stomp enemy.
    *
   * @param {MovableObject} enemy
   * @param {number} previousBottom
   * @param {number} currentBottom
   * @returns {boolean}
   */
  canStompEnemy(enemy, previousBottom, currentBottom) {
    const isFalling = this.character.speedY < 0;
    const isChickenEnemy = enemy instanceof ChickenEnemy;
    return isChickenEnemy && !enemy.dead && isFalling && this.hasStompCollision(enemy, previousBottom, currentBottom, 10);
  },

  /**
    * Checks whether has stomp collision.
    *
   * @param {MovableObject} enemy
   * @param {number} previousBottom
   * @param {number} currentBottom
   * @param {number} earlyPx
   * @returns {boolean}
   */
  hasStompCollision(enemy, previousBottom, currentBottom, earlyPx = 0) {
    return this.hasHorizontalStompOverlap(enemy) && this.hasVerticalStompOverlap(enemy, previousBottom, currentBottom, earlyPx);
  },

  /**
    * Checks whether has horizontal stomp overlap.
    *
   * @param {MovableObject} enemy
   * @returns {boolean}
   */
  hasHorizontalStompOverlap(enemy) {
    const characterLeft = this.character.x + 20;
    const characterRight = this.character.x + this.character.width - 30;
    const enemyLeft = enemy.x + 10;
    const enemyRight = enemy.x + enemy.width - 10;
    return characterRight > enemyLeft && characterLeft < enemyRight;
  },

  /**
    * Checks whether has vertical stomp overlap.
    *
   * @param {MovableObject} enemy
   * @param {number} previousBottom
   * @param {number} currentBottom
   * @param {number} earlyPx
   * @returns {boolean}
   */
  hasVerticalStompOverlap(enemy, previousBottom, currentBottom, earlyPx = 0) {
    const stompTop = enemy.y - earlyPx;
    const stompBottom = enemy.y + enemy.height - 20;
    const crossedStompTop = previousBottom <= stompTop && currentBottom >= stompTop;
    const isInStompZone = currentBottom >= stompTop && currentBottom <= stompBottom;
    return crossedStompTop || isInStompZone;
  },

  /**
    * Returns character bottom for stomp.
    *
   * @returns {number}
   */
  getCharacterBottomForStomp() {
    return this.character.y + this.character.height - 20;
  },
});
