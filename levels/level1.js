function createLevel1() {
  const endboss = new Endboss();
  endboss.x = 2850;
  return new Level(
    [
      new Chicken(),
      new Chicken(),
      new ChickenSmall(),
      new ChickenSmall(),
      new Chicken(),
      new ChickenSmall(),
      endboss,
    ],
    [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()],
    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/air.png ", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png",719 * 2,),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png",719 * 2,),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png",719 * 2,),
      new BackgroundObject("img/5_background/layers/air.png ", 719*3),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719*3),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719*3),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719*3),
      new BackgroundObject("img/5_background/layers/air.png ", 719*4),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719*4),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719*4),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719*4),
      new BackgroundObject("img/5_background/layers/air.png ", 719*5),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719*5),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719*5),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719*5),
    ],
  );
}

const level1 = createLevel1();
