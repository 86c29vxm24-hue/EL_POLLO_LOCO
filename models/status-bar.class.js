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

  setPercentage(percentage) {
    this.percentage = percentage;
    this.resolveImageIndex();
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      this.img = this.imageCache[this.IMAGES_HEALTH[5]];
    } else if (this.percentage >= 80) {
      this.img = this.imageCache[this.IMAGES_HEALTH[4]];
    } else if (this.percentage >= 60) {
      this.img = this.imageCache[this.IMAGES_HEALTH[3]];
    } else if (this.percentage >= 40) {
      this.img = this.imageCache[this.IMAGES_HEALTH[2]];
    } else if (this.percentage >= 20) {
      this.img = this.imageCache[this.IMAGES_HEALTH[1]];
    } else {
      this.img = this.imageCache[this.IMAGES_HEALTH[0]];
    }
  }

  collectCoin(percentage) {
    this.percentage = percentage;
    this.resolveCoinImageIndex();
  }

  resolveCoinImageIndex() {
    if (this.percentage == 100) {
      this.img = this.imageCache[this.IMAGES_COINS[5]];
    } else if (this.percentage >= 80) {
      this.img = this.imageCache[this.IMAGES_COINS[4]];
    } else if (this.percentage >= 60) {
      this.img = this.imageCache[this.IMAGES_COINS[3]];
    } else if (this.percentage >= 40) {
      this.img = this.imageCache[this.IMAGES_COINS[2]];
    } else if (this.percentage >= 20) {
      this.img = this.imageCache[this.IMAGES_COINS[1]];
    } else {
      this.img = this.imageCache[this.IMAGES_COINS[0]];
    }
  }



  collectBottle(percentage) {
    this.percentage = percentage;
    this.resolveBottleImageIndex();
  } 

    resolveBottleImageIndex() {     
      if (this.percentage == 100) {
        this.img = this.imageCache[this.IMAGES_BOTTLES[5]];
      } else if (this.percentage >= 80) {
        this.img = this.imageCache[this.IMAGES_BOTTLES[4]];
      } else if (this.percentage >= 60) {
        this.img = this.imageCache[this.IMAGES_BOTTLES[3]];
      } else if (this.percentage >= 40) {
        this.img = this.imageCache[this.IMAGES_BOTTLES[2]];
      } else if (this.percentage >= 20) {
        this.img = this.imageCache[this.IMAGES_BOTTLES[1]];
      } else {
        this.img = this.imageCache[this.IMAGES_BOTTLES[0]];
      }
    }



    healthEndboss(percentage) {
      this.percentage = percentage;
      this.resolveEndbossImageIndex();
    } 

      resolveEndbossImageIndex() {   
        if (this.percentage == 100) {
          this.img = this.imageCache[this.IMAGE_ENDBOSS[5]];
        } else if (this.percentage >= 80) {
          this.img = this.imageCache[this.IMAGE_ENDBOSS[4]];
        } else if (this.percentage >= 60) {
          this.img = this.imageCache[this.IMAGE_ENDBOSS[3]];
        } else if (this.percentage >= 40) {
          this.img = this.imageCache[this.IMAGE_ENDBOSS[2]];
        } else if (this.percentage >= 20) {
          this.img = this.imageCache[this.IMAGE_ENDBOSS[1]];
        } else {
          this.img = this.imageCache[this.IMAGE_ENDBOSS[0]];
        }
      }






}