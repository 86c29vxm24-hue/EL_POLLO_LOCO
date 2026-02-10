class StatusBar extends DrawableObject {
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];
  IMAGES_COINS = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];
  IMAGES_BOTTLES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];
  IMAGE_ENDBOSS = [
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];
  percentage = 100;

  /**
   * @returns {void}
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.loadImages(this.IMAGES_COINS);
    this.loadImages(this.IMAGES_BOTTLES);
    this.loadImages(this.IMAGE_ENDBOSS);
    this.setPercentage(100);
    this.x = 50;
    this.y = 5;
    this.width = 200;
    this.height = 50;
  }

  /**
   * @param {number} percentage
   * @returns {void}
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    this.resolveImageIndex();
  }

  /**
   * @returns {void}
   */
  resolveImageIndex() {
    this.img = this.imageCache[this.IMAGES_HEALTH[this.resolvePercentImageIndex()]];
  }

  /**
   * @param {number} percentage
   * @returns {void}
   */
  collectCoin(percentage) {
    this.percentage = percentage;
    this.resolveCoinImageIndex();
  }

  /**
   * @returns {void}
   */
  resolveCoinImageIndex() {
    this.img = this.imageCache[this.IMAGES_COINS[this.resolvePercentImageIndex()]];
  }

  /**
   * @param {number} percentage
   * @returns {void}
   */
  collectBottle(percentage) {
    this.percentage = percentage;
    this.resolveBottleImageIndex();
  }

  /**
   * @returns {void}
   */
  resolveBottleImageIndex() {
    this.img = this.imageCache[this.IMAGES_BOTTLES[this.resolvePercentImageIndex()]];
  }

  /**
   * @param {number} percentage
   * @returns {void}
   */
  healthEndboss(percentage) {
    this.percentage = percentage;
    this.resolveEndbossImageIndex();
  }

  /**
   * @returns {void}
   */
  resolveEndbossImageIndex() {
    this.img = this.imageCache[this.IMAGE_ENDBOSS[this.resolvePercentImageIndex()]];
  }

  /**
   * @returns {number}
   */
  resolvePercentImageIndex() {
    if (this.percentage >= 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 60) return 3;
    if (this.percentage >= 40) return 2;
    if (this.percentage >= 20) return 1;
    return 0;
  }
}
