class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    if (this.character?.img) {
      this.character.img.onload = () => this.draw();
      if (this.character.img.complete) {
        this.draw();
      }
    }
  }

  draw() {
    this.ctx.drawImage(
      this.character.img,
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height,
    );
  }
}
