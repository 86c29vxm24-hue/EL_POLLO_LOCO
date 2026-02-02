let canvas;
let ctx;
let character = new Image();



function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    character.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(character, 20, 20, 50, 150);
    };
    character.onerror = () => {
        console.error("Bild konnte nicht geladen werden:", character.src);
    };
    character.src = "img/2_character_pepe/1_idle/idle/I-1.png";
}
