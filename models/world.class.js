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
  

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setupStatusBars();
    this.draw();
    this.setWorld();
    this.checkCollisions();
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

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      });
    }, 100);
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
  }
}
