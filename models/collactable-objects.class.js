class CollectableObjects extends MovableObject {

  IMAGES_COINS = [
    "img/8_coin/coin_1.png",
    "img/8_coin/coin_2.png",
  ];
  
IMAGES_BOTTLES = [
  "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
  "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
];


  constructor(x, y) {
    super().loadImage(this.IMAGES_COINS[0]);
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
  }



}
