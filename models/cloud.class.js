class Cloud extends MovableObject {

        y = 20;
        width = 500;
        height = 150;


           constructor() {
        super();
        this.loadImage("img/5_background/layers/4_clouds/1.png");

        this.x = Math.random() * 3000;
        this.animate();
    }

        animate() {
            this.moveLeft();
          
        }

     
    }
            
