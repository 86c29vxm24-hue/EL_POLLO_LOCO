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

    for (let i = 0; i < 10; i++) {
      let randomX = 200 + Math.random() * 2400;
      let bottle = new CollectableObjects(randomX, bottleY);
      let bottleImage = bottle.IMAGES_BOTTLES[i % bottle.IMAGES_BOTTLES.length];
      bottle.isCoin = false;
      bottle.loadImage(bottleImage);
      this.collectableObjects.push(bottle);
    }
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      if (!this.statusBarBottles.bottles) return;
      this.statusBarBottles.bottles -= 1;
      this.statusBarBottles.collectBottle(this.statusBarBottles.bottles * 10);
      let spawnX = this.character.x + this.character.width;
      let groundY = this.character.y + this.character.height;
      let bottle = new ThrowableObject(
        spawnX,
        this.character.y,
        groundY
      );
      this.throwableObject.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });

    this.collectableObjects = this.collectableObjects.filter((obj) => {
      if (obj.isCoin && this.character.isColliding(obj)) {
        this.statusBarCoins.coins = (this.statusBarCoins.coins || 0) + 1;
        this.statusBarCoins.collectCoin(this.statusBarCoins.coins * 5);
        return false;
      }
      if (!obj.isCoin && this.character.isColliding(obj)) {
        this.statusBarBottles.bottles = (this.statusBarBottles.bottles || 0) + 1;
        this.statusBarBottles.collectBottle(this.statusBarBottles.bottles * 10);
        return false;
      }
      return true;
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

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

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

  flipImage(mo) {
    this.ctx.save();
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }}
