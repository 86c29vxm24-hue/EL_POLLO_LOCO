/**
 * @returns {Level}
 */
function createLevel1() {
  const endboss = createEndboss();
  return new Level(createEnemies(endboss), createClouds(), createBackgroundObjects());
}

/**
 * @returns {Endboss}
 */
function createEndboss() {
  const endboss = new Endboss();
  endboss.x = 5850;
  return endboss;
}

/**
 * @param {Endboss} endboss
 * @returns {MovableObject[]}
 */
function createEnemies(endboss) {
  return [
    new Chicken(),
    new Chicken(),
    new ChickenSmall(),
    new ChickenSmall(),
    new Chicken(),
    new ChickenSmall(),
    new Chicken(),
    new Chicken(),
    new ChickenSmall(),
    new ChickenSmall(),
    new Chicken(),
    new ChickenSmall(),
    endboss,
  ];
}

/**
 * @returns {Cloud[]}
 */
function createClouds() {
  return [
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
  ];
}

/**
 * @returns {BackgroundObject[]}
 */
function createBackgroundObjects() {
  const xPositions = [-719, 0, 719, 719 * 2, 719 * 3, 719 * 4, 719 * 5, 719 * 6, 719 * 7, 719 * 8, 719 * 9];
  return xPositions.flatMap((x, index) => createBackgroundLayerSet(index, x));
}

/**
 * @param {number} index
 * @param {number} x
 * @returns {BackgroundObject[]}
 */
function createBackgroundLayerSet(index, x) {
  const isOddGroup = index % 2 === 1;
  const parallaxFrame = isOddGroup ? "1" : "2";
  return [
    new BackgroundObject("img/5_background/layers/air.png", x),
    new BackgroundObject(`img/5_background/layers/3_third_layer/${parallaxFrame}.png`, x),
    new BackgroundObject(`img/5_background/layers/2_second_layer/${parallaxFrame}.png`, x),
    new BackgroundObject(`img/5_background/layers/1_first_layer/${parallaxFrame}.png`, x),
  ];
}

const level1 = createLevel1();
