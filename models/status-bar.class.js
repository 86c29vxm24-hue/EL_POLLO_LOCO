class StatusBar extends DrawableObject {

    IMAGES = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png"
    ];

percentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 5;
        this.width = 200;
        this.height = 50;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    
    resolveImageIndex() {
         if (this.percentage == 100) {
            this.img = this.imageCache[this.IMAGES[5]];
        } else if (this.percentage >= 80) {
            this.img = this.imageCache[this.IMAGES[4]];
        } else if (this.percentage >= 60) {
            this.img = this.imageCache[this.IMAGES[3]];
        } else if (this.percentage >= 40) {
            this.img = this.imageCache[this.IMAGES[2]];
        } else if (this.percentage >= 20) {
            this.img = this.imageCache[this.IMAGES[1]];
        } else {
            this.img = this.imageCache[this.IMAGES[0]];
        } }

}