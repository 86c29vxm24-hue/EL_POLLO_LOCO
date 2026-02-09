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
  

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setupStatusBars();
    this.setupCollectables();
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * @returns {void}
   */
  setupStatusBars() {
    this.statusBar.x = 50;
    this.statusBar.y = 5;

    this.statusBarCoins.x = 50;
    this.statusBarCoins.y = 55;
    this.statusBarCoins.collectCoin(0);

    this.statusBarBottles.x = 50;
    this.statusBarBottles.y = 105;
    this.statusBarBottles.collectBottle(0);

    this.statusBarEndboss.x = this.canvas.width - 250;
    this.statusBarEndboss.y = 5;
    this.statusBarEndboss.healthEndboss(100);
  }

  /**
   * @returns {void}
   */
  setupCollectables() {
    let coinYsAir = [150, 180, 210, 240, 170, 200, 230, 160, 190, 220];
    let coinYsLow = [300, 320, 340, 310, 330, 350, 300, 320, 340, 310];

    for (let i = 0; i < 20; i++) {
      let y = i < 10 ? coinYsAir[i] : coinYsLow[i - 10];
      let randomX = 200 + Math.random() * 2400;
      let coin = new CollectableObjects(randomX, y);
      this.collectableObjects.push(coin);
    }

    let bottleY = 360;

    for (let i = 0; i < 20; i++) {
      let randomX = 200 + Math.random() * 2400;
      let bottle = new CollectableObjects(randomX, bottleY);
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
    if (this.keyboard.D) {
      if (this.isThrowOnCooldown()) return;
      if (!this.statusBarBottles.bottles) return;
      this.lastThrowTime = new Date().getTime();
      this.statusBarBottles.bottles -= 1;
      this.statusBarBottles.collectBottle(this.statusBarBottles.bottles * 5);
      let direction = this.character.otherDirection ? -1 : 1;
      let spawnX = this.character.otherDirection
        ? this.character.x - 50
        : this.character.x + this.character.width;
      let groundY = 400;
      let bottle = new ThrowableObject(
        spawnX,
        this.character.y,
        groundY,
        direction
      );
      this.throwableObject.push(bottle);
    }
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
    this.checkJumpOnEnemies();
    this.checkEnemyCollisions();
    this.checkCollectableCollisions();
    this.checkBottleCollisions();
  }

  /**
   * @returns {void}
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.dead && this.character.isColliding(enemy)) {
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
    this.statusBarCoins.collectCoin(this.statusBarCoins.coins * 5);
    return false;
  }

  /**
   * @returns {boolean}
   */
  collectBottle() {
    this.statusBarBottles.bottles = (this.statusBarBottles.bottles || 0) + 1;
    this.statusBarBottles.collectBottle(this.statusBarBottles.bottles * 5);
    return false;
  }

  /**
   * @returns {void}
   */
  checkBottleCollisions() {
    const boss = this.getEndboss();
    if (!boss) return;
    this.throwableObject.forEach((bottle) => {
      if (!bottle.hasSplashed && bottle.isColliding(boss)) {
        boss.takeHit();
        this.statusBarEndboss.healthEndboss(boss.energy);
        bottle.impactX = bottle.x;
        bottle.impactY = bottle.y;
        bottle.onImpact();
      }
    });
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
        enemy.die();
        this.character.speedY = 15;
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarEndboss);
    this.ctx.translate(this.camera_x, 0);


    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.collectableObjects);

    this.ctx.translate(-this.camera_x, 0);

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
