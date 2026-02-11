class World {
  character = new Character();
  level = createLevel1();
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
  lastCharacterBottom = null;
  startScreen = new StartScreen();
  gameStarted = false;
  endScreen = new EndScreen();
  gameEnded = false;
  endScheduled = false;
  

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Keyboard} keyboard
   */
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
    gameSounds.playGameplayBackgroundLoop();
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
    const isSmallMobile = window.matchMedia("(max-width: 450px)").matches;
    const isTouchLandscape = window.matchMedia("(max-width: 900px) and (orientation: landscape) and (pointer: coarse)").matches;
    this.statusBar.x = 50; this.statusBar.y = 5;
    this.statusBarCoins.x = 50; this.statusBarCoins.y = 55;
    this.statusBarBottles.x = 50; this.statusBarBottles.y = 105;
    this.statusBarEndboss.x = this.canvas.width - 250;
    this.statusBarEndboss.y = isTouchLandscape ? 48 : (isSmallMobile ? 40 : 5);
  }

  /**
   * @returns {void}
   */
  initializeStatusBarValues() {
    this.statusBar.setPercentage(this.character.energy);
    this.statusBarCoins.coins = 0;
    this.statusBarCoins.collectCoin(0);
    this.statusBarBottles.bottles = 0;
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
    for (let i = 0; i < 40; i++) {
      const patternIndex = i % 20;
      let y = patternIndex < 10 ? coinYsAir[patternIndex] : coinYsLow[patternIndex - 10];
      this.collectableObjects.push(new CollectableObjects(200 + Math.random() * 4800, y));
    }
  }

  /**
   * @returns {void}
   */
  createBottles() {
    for (let i = 0; i < 20; i++) {
      let bottle = new CollectableObjects(200 + Math.random() * 4800, 360);
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
    const loseDelay = this.character.IMAGES_DEAD.length * 100 + 150;
    const delay = type === "lose" ? loseDelay : 2500;
    setTimeout(() => this.showEndScreen(type), delay);
  }

  /**
   * @param {string} type
   * @returns {void}
   */
  showEndScreen(type) {
    this.gameEnded = true;
    gameSounds.stopAllSounds();
    this.renderEndScreenByType(type);
    this.showEndButtons();
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
  showEndButtons() {
    let menuBtn = document.getElementById("end-button");
    let playAgainBtn = document.getElementById("play-again-button");
    if (menuBtn) menuBtn.style.display = "flex";
    if (playAgainBtn) playAgainBtn.style.display = "flex";
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
    const coinPercentage = this.getCoinPercentage();
    this.statusBarCoins.collectCoin(coinPercentage);
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
    if (bottles <= 0) return 0;
    return Math.max(20, Math.min(100, bottles * (100 / maxBottles)));
  }

  /**
   * @returns {number}
   */
  getCoinPercentage() {
    let maxCoins = 20;
    let coins = this.statusBarCoins.coins || 0;
    if (coins <= 0) return 0;
    return Math.max(20, Math.min(100, coins * (100 / maxCoins)));
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
      const isChickenEnemy = enemy instanceof Chicken || enemy instanceof ChickenSmall;
      if (!isChickenEnemy || enemy.dead || !bottle.isColliding(enemy)) return;
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
    gameSounds.playEndbossHit();
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
    const currentBottom = this.getCharacterBottomForStomp();
    const previousBottom = this.lastCharacterBottom ?? currentBottom;
    this.level.enemies.forEach((enemy) => this.tryStompEnemy(enemy, previousBottom, currentBottom));
    this.lastCharacterBottom = currentBottom;
  }

  /**
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
  }

  /**
   * @param {MovableObject} enemy
   * @param {number} previousBottom
   * @param {number} currentBottom
   * @returns {boolean}
   */
  canStompEnemy(enemy, previousBottom, currentBottom) {
    const isFalling = this.character.speedY < 0;
    const isChickenEnemy = enemy instanceof Chicken || enemy instanceof ChickenSmall;
    return isChickenEnemy && !enemy.dead && isFalling && this.hasStompCollision(enemy, previousBottom, currentBottom, 10);
  }

  /**
   * @param {MovableObject} enemy
   * @param {number} previousBottom
   * @param {number} currentBottom
   * @param {number} earlyPx
   * @returns {boolean}
   */
  hasStompCollision(enemy, previousBottom, currentBottom, earlyPx = 0) {
    return this.hasHorizontalStompOverlap(enemy) && this.hasVerticalStompOverlap(enemy, previousBottom, currentBottom, earlyPx);
  }

  /**
   * @param {MovableObject} enemy
   * @returns {boolean}
   */
  hasHorizontalStompOverlap(enemy) {
    const characterLeft = this.character.x + 20;
    const characterRight = this.character.x + this.character.width - 30;
    const enemyLeft = enemy.x + 10;
    const enemyRight = enemy.x + enemy.width - 10;
    return characterRight > enemyLeft && characterLeft < enemyRight;
  }

  /**
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
  }

  /**
   * @returns {number}
   */
  getCharacterBottomForStomp() {
    return this.character.y + this.character.height - 20;
  }
}
