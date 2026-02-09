let canvas;
let world;
let keyboard = new Keyboard();



function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    bindStartButton();
    bindMusicToggleButton();
    bindEndButton();
    bindFullscreenButton();
    bindMobileControls();
};

/**
 * @returns {void}
 */
function bindStartButton() {
    let btn = document.getElementById("start-button");
    let musicBtn = document.getElementById("music-toggle-button");
    btn.addEventListener("click", () => {
        world.startGame();
        btn.style.display = "none";
        if (musicBtn) musicBtn.style.display = "none";
    });
}

/**
 * @returns {void}
 */
function bindMusicToggleButton() {
    let btn = document.getElementById("music-toggle-button");
    if (!btn) return;
    btn.style.display = "block";
    btn.textContent = gameSounds.isStartScreenLoopPlaying() ? "Music: On" : "Music: Off";
    btn.addEventListener("click", () => {
        let isPlaying = gameSounds.toggleStartScreenLoop();
        btn.textContent = isPlaying ? "Music: On" : "Music: Off";
    });
}

/**
 * @returns {void}
 */
function bindEndButton() {
    let btn = document.getElementById("end-button");
    btn.addEventListener("click", () => {
        location.reload();
    });
}

/**
 * @returns {void}
 */
function bindFullscreenButton() {
    let btn = document.getElementById("fullscreen-button");
    let area = document.getElementById("game-area");
    btn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            area.requestFullscreen();
            btn.textContent = "Exit Fullscreen";
        } else {
            document.exitFullscreen();
            btn.textContent = "Fullscreen";
        }
    });
    document.addEventListener("fullscreenchange", () => {
        btn.textContent = document.fullscreenElement ? "Exit Fullscreen" : "Fullscreen";
    });
}

/**
 * @returns {void}
 */
function bindMobileControls() {
    let left = document.getElementById("btn-left");
    let right = document.getElementById("btn-right");
    let jump = document.getElementById("btn-jump");
    let throwBtn = document.getElementById("btn-throw");
    bindHold(left, "LEFT");
    bindHold(right, "RIGHT");
    bindHold(jump, "UP");
    bindHold(throwBtn, "D");
}

/**
 * @param {HTMLElement} btn
 * @param {string} key
 * @returns {void}
 */
function bindHold(btn, key) {
    btn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard[key] = true;
    });
    btn.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard[key] = false;
    });
    btn.addEventListener("mousedown", () => { keyboard[key] = true; });
    btn.addEventListener("mouseup", () => { keyboard[key] = false; });
    btn.addEventListener("mouseleave", () => { keyboard[key] = false; });
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (event.key === 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (event.key === 'ArrowUp') {
        keyboard.UP = true;
    }
    if (event.key === 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (event.key === ' ') {
        keyboard.SPACE = true;
    }

    if (event.key === 'd') {    
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (event.key === 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (event.key === 'ArrowUp') {
        keyboard.UP = false;
    }
    if (event.key === 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (event.key === ' ') {
        keyboard.SPACE = false;
    }

    if (event.key === 'd') {    
        keyboard.D = false;
    }
});
