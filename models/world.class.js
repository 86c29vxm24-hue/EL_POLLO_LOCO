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
  totalCoins = 0;
  totalBottles = 0;
  lastThrowTime = 0;
  lastCharacterBottom = null;
  startScreen = new StartScreen();
  gameStarted = false;
  endScreen = new EndScreen();
  gameEnded = false;
  endScheduled = false;
  

  /**
    * Initializes the instance.
    *
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
    * Performs start game.
    *
   * @returns {void}
   */
  startGame() {
    gameSounds.playGameplayBackgroundLoop();
    this.gameStarted = true;
  }

  /**
    * Performs setup status bars.
    *
   * @returns {void}
   */
  setupStatusBars() {
    this.placeStatusBars();
    this.initializeStatusBarValues();
  }

  /**
    * Performs place status bars.
    *
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
    * Performs initialize status bar values.
    *
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
    * Performs setup collectables.
    *
   * @returns {void}
   */
  setupCollectables() {
    this.createCoins();
    this.createBottles();
  }

  /**
    * Creates coins.
    *
   * @returns {void}
   */
  createCoins() {
    const totalCoinsToSpawn = 40;
    this.totalCoins = totalCoinsToSpawn;
    let coinYsAir = [150, 180, 210, 240, 170, 200, 230, 160, 190, 220];
    let coinYsLow = [300, 320, 340, 310, 330, 350, 300, 320, 340, 310];
    for (let i = 0; i < totalCoinsToSpawn; i++) {
      const patternIndex = i % 20;
      let y = patternIndex < 10 ? coinYsAir[patternIndex] : coinYsLow[patternIndex - 10];
      this.collectableObjects.push(new CollectableObjects(200 + Math.random() * 4800, y));
    }
  }

  /**
    * Creates bottles.
    *
   * @returns {void}
   */
  createBottles() {
    const totalBottlesToSpawn = 20;
    this.totalBottles = totalBottlesToSpawn;
    for (let i = 0; i < totalBottlesToSpawn; i++) {
      let bottle = new CollectableObjects(200 + Math.random() * 4800, 360);
      let bottleImage = bottle.IMAGES_BOTTLES[i % bottle.IMAGES_BOTTLES.length];
      bottle.isCoin = false;
      bottle.loadImage(bottleImage);
      this.collectableObjects.push(bottle);
    }
  }

  /**
    * Sets world.
    *
   * @returns {void}
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
    * Runs operation.
    *
   * @returns {void}
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 50);
  }

  /**
    * Checks throw objects.
    *
   * @returns {void}
   */
  checkThrowObjects() {
    if (!this.canThrowBottle()) return;
    this.consumeBottle();
    this.throwableObject.push(this.createThrowableBottle());
  }

  /**
    * Checks whether can throw bottle.
    *
   * @returns {boolean}
   */
  canThrowBottle() {
    if (!this.gameStarted || this.character.isDead()) return false;
    if (this.character.otherDirection || !this.keyboard.D) return false;
    if (this.isThrowOnCooldown()) return false;
    return !!this.statusBarBottles.bottles;
  }

  /**
    * Performs consume bottle.
    *
   * @returns {void}
   */
  consumeBottle() {
    this.lastThrowTime = new Date().getTime();
    this.statusBarBottles.bottles -= 1;
    this.statusBarBottles.collectBottle(this.getBottlePercentage());
  }

  /**
    * Creates throwable bottle.
    *
   * @returns {ThrowableObject}
   */
  createThrowableBottle() {
    let direction = this.character.otherDirection ? -1 : 1;
    let spawnX = this.character.otherDirection ? this.character.x + 40 : this.character.x + this.character.width - 45;
    return new ThrowableObject(spawnX, this.character.y + 100, 400, direction);
  }

  /**
    * Checks whether is throw on cooldown.
    *
   * @returns {boolean}
   */
  isThrowOnCooldown() {
    return new Date().getTime() - this.lastThrowTime < 500;
  }
}
