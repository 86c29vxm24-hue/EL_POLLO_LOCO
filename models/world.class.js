class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];

  draw() {
    this.ctx.drawImage(
      this.character.image,
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height,
    );

    let self = this;
    requestAnimationFrame(function() {
        self.draw();
    });
  }
}
