class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  world;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarCoins = new StatusBar();
  statusBarBottles = new StatusBar();
  statusBarEndboss = new StatusBar();
  throwableObject = [];
  collectableObjects = [];  
  lastThrowTime = 0;
  startScreen = new StartScreen();
  gameStarted = false;
  endScreen = new EndScreen();
  gameEnded = false;
  endScheduled = false;
  

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    gameSounds.playStartScreenLoop();
    this.setupStatusBars();
    this.setupCollectables();
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * @returns {void}
   */
  startGame() {
    gameSounds.stopStartScreenLoop();
    this.gameStarted = true;
  }

  /**
   * @returns {void}
   */
  setupStatusBars() {
    this.placeStatusBars();
    this.initializeStatusBarValues();
  }

  /**
   * @returns {void}
   */
  placeStatusBars() {
    this.statusBar.x = 50; this.statusBar.y = 5;
    this.statusBarCoins.x = 50; this.statusBarCoins.y = 55;
    this.statusBarBottles.x = 50; this.statusBarBottles.y = 105;
    this.statusBarEndboss.x = this.canvas.width - 250;
    this.statusBarEndboss.y = 5;
  }

  /**
   * @returns {void}
   */
  initializeStatusBarValues() {
    this.statusBarCoins.collectCoin(0);
    this.statusBarBottles.collectBottle(0);
    this.statusBarEndboss.healthEndboss(100);
  }

  /**
   * @returns {void}
   */
  setupCollectables() {
    this.createCoins();
    this.createBottles();
  }

  /**
   * @returns {void}
   */
  createCoins() {
    let coinYsAir = [150, 180, 210, 240, 170, 200, 230, 160, 190, 220];
    let coinYsLow = [300, 320, 340, 310, 330, 350, 300, 320, 340, 310];
    for (let i = 0; i < 20; i++) {
      let y = i < 10 ? coinYsAir[i] : coinYsLow[i - 10];
      this.collectableObjects.push(new CollectableObjects(200 + Math.random() * 2400, y));
    }
  }

  /**
   * @returns {void}
   */
  createBottles() {
    for (let i = 0; i < 10; i++) {
      let bottle = new CollectableObjects(200 + Math.random() * 2400, 360);
      let bottleImage = bottle.IMAGES_BOTTLES[i % bottle.IMAGES_BOTTLES.length];
      bottle.isCoin = false;
      bottle.loadImage(bottleImage);
      this.collectableObjects.push(bottle);
    }
  }

  /**
   * @returns {void}
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * @returns {void}
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 50);
  }

  /**
   * @returns {void}
   */
  checkThrowObjects() {
    if (!this.canThrowBottle()) return;
    this.consumeBottle();
    this.throwableObject.push(this.createThrowableBottle());
  }

  /**
   * @returns {boolean}
   */
  canThrowBottle() {
    if (!this.gameStarted || this.character.isDead()) return false;
    if (this.character.otherDirection || !this.keyboard.D) return false;
    if (this.isThrowOnCooldown()) return false;
    return !!this.statusBarBottles.bottles;
  }

  /**
   * @returns {void}
   */
  consumeBottle() {
    this.lastThrowTime = new Date().getTime();
    this.statusBarBottles.bottles -= 1;
    this.statusBarBottles.collectBottle(this.getBottlePercentage());
  }

  /**
   * @returns {ThrowableObject}
   */
  createThrowableBottle() {
    let direction = this.character.otherDirection ? -1 : 1;
    let spawnX = this.character.otherDirection ? this.character.x + 40 : this.character.x + this.character.width - 45;
    return new ThrowableObject(spawnX, this.character.y + 100, 400, direction);
  }

  /**
   * @returns {boolean}
   */
  isThrowOnCooldown() {
    return new Date().getTime() - this.lastThrowTime < 500;
  }

  /**
   * @returns {void}
   */
  checkCollisions() {
    if (!this.gameStarted) return;
    this.checkGameEnd();
    this.checkJumpOnEnemies();
    this.checkEnemyCollisions();
    this.checkCollectableCollisions();
    this.checkBottleCollisions();
  }

  /**
   * @returns {void}
   */
  checkGameEnd() {
    if (this.endScheduled) return;
    if (this.character.isDead()) return this.scheduleEnd("lose");
    const boss = this.getEndboss();
    if (boss && boss.isDead()) return this.scheduleEnd("win");
  }

  /**
   * @param {string} type
   * @returns {void}
   */
  scheduleEnd(type) {
    this.endScheduled = true;
    if (type === "lose") gameSounds.playCharacterDeath();
    if (type === "win") gameSounds.playEndbossDeath();
    setTimeout(() => this.showEndScreen(type), 2500);
  }

  /**
   * @param {string} type
   * @returns {void}
   */
  showEndScreen(type) {
    this.gameEnded = true;
    this.renderEndScreenByType(type);
    this.showEndButton();
  }

  /**
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
  }

  /**
   * @returns {void}
   */
  showEndButton() {
    let btn = document.getElementById("end-button");
    if (btn) btn.style.display = "block";
  }

  /**
   * @returns {void}
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.dead && this.character.isColliding(enemy) && !this.character.isHurt()) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * @returns {void}
   */
  checkCollectableCollisions() {
    this.collectableObjects = this.collectableObjects.filter((obj) => {
      if (obj.isCoin && this.character.isColliding(obj)) return this.collectCoin();
      if (!obj.isCoin && this.character.isColliding(obj)) return this.collectBottle();
      return true;
    });
  }

  /**
   * @returns {boolean}
   */
  collectCoin() {
    this.statusBarCoins.coins = (this.statusBarCoins.coins || 0) + 1;
    gameSounds.playCoinCollect();
    this.statusBarCoins.collectCoin(this.statusBarCoins.coins * 5);
    return false;
  }

  /**
   * @returns {boolean}
   */
  collectBottle() {
    this.statusBarBottles.bottles = (this.statusBarBottles.bottles || 0) + 1;
    gameSounds.playBottleCollect();
    this.statusBarBottles.collectBottle(this.getBottlePercentage());
    return false;
  }

  /**
   * @returns {number}
   */
  getBottlePercentage() {
    let maxBottles = 10;
    let bottles = this.statusBarBottles.bottles || 0;
    return Math.min(100, bottles * (100 / maxBottles));
  }

  /**
   * @returns {void}
   */
  checkBottleCollisions() {
    const boss = this.getEndboss();
    this.throwableObject.forEach((bottle) => {
      if (bottle.hasSplashed) return;
      this.checkBottleChickenHits(bottle);
      this.checkBottleBossHit(bottle, boss);
    });
  }

  /**
   * @param {ThrowableObject} bottle
   * @returns {void}
   */
  checkBottleChickenHits(bottle) {
    this.level.enemies.forEach((enemy) => {
      if (!(enemy instanceof Chicken) || enemy.dead || !bottle.isColliding(enemy)) return;
      gameSounds.playEnemyHit();
      enemy.die();
      this.splashBottleAtImpact(bottle);
    });
  }

  /**
   * @param {ThrowableObject} bottle
   * @param {Endboss|undefined} boss
   * @returns {void}
   */
  checkBottleBossHit(bottle, boss) {
    if (!boss || !bottle.isColliding(boss)) return;
    gameSounds.playEnemyHit();
    boss.takeHit();
    this.statusBarEndboss.healthEndboss(boss.energy);
    this.splashBottleAtImpact(bottle);
  }

  /**
   * @param {ThrowableObject} bottle
   * @returns {void}
   */
  splashBottleAtImpact(bottle) {
    bottle.impactX = bottle.x;
    bottle.impactY = bottle.y;
    bottle.onImpact();
  }

  /**
   * @returns {Endboss|undefined}
   */
  getEndboss() {
    return this.level.enemies.find((e) => e instanceof Endboss);
  }

  /**
   * @returns {void}
   */
  checkJumpOnEnemies() {
    this.level.enemies.forEach((enemy) => {
      const isFalling = this.character.speedY < 0;
      const isAbove = this.character.y + this.character.height - 10 <= enemy.y + enemy.height;
      const isTop = this.character.y < enemy.y;
      if (enemy instanceof Chicken && !enemy.dead && isFalling &&
        isAbove && isTop && this.character.isColliding(enemy)) {
        gameSounds.playEnemyHit();
        enemy.die();
        this.character.speedY = 15;
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.drawStartOrEndScreen()) return this.loopDraw();
    this.drawGameScene();
    this.loopDraw();
  }

  /**
   * @returns {boolean}
   */
  drawStartOrEndScreen() {
    if (!this.gameStarted) return this.drawOnlyStartScreen();
    if (this.gameEnded) return this.drawOnlyEndScreen();
    return false;
  }

  /**
   * @returns {boolean}
   */
  drawOnlyStartScreen() {
    this.startScreen.draw(this.ctx);
    return true;
  }

  /**
   * @returns {boolean}
   */
  drawOnlyEndScreen() {
    this.endScreen.draw(this.ctx);
    return true;
  }

  /**
   * @returns {void}
   */
  drawGameScene() {
    this.ctx.translate(this.camera_x, 0);
    this.drawWorldObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBars();
  }

  /**
   * @returns {void}
   */
  drawWorldObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.collectableObjects);
  }

  /**
   * @returns {void}
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarEndboss);
  }

  /**
   * @returns {void}
   */
  loopDraw() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * @param {Array} objects
   * @returns {void}
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

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
  }

  /**
   * @param {MovableObject} mo
   * @returns {void}
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * @param {MovableObject} mo
   * @returns {void}
   */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }}
