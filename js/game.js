let canvas;
let world;
let keyboard = new Keyboard();



function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    bindStartButton();
    bindPlayAgainButton();
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
    btn.addEventListener("click", () => {
        world.startGame();
        btn.style.display = "none";
    });
}

/**
 * @returns {void}
 */
function bindMusicToggleButton() {
    let btn = document.getElementById("music-toggle-button");
    if (!btn) return;
    btn.style.display = "block";
    updateMuteButtonText(btn);
    window.addEventListener("resize", () => updateMuteButtonText(btn));
    btn.addEventListener("click", () => {
        const isMuted = gameSounds.toggleMute();
        if (!isMuted && !world.gameStarted) gameSounds.playStartScreenLoop();
        if (!isMuted && world.gameStarted) gameSounds.playGameplayBackgroundLoop();
        updateMuteButtonText(btn);
    });
}

/**
 * @param {HTMLElement} btn
 * @returns {void}
 */
function updateMuteButtonText(btn) {
    const isMuted = gameSounds.isMuted();
    const isMobile = window.matchMedia("(max-width: 450px)").matches;
    btn.textContent = isMobile ? (isMuted ? "🔇" : "🔊") : (isMuted ? "Sound: Off" : "Sound: On");
    btn.setAttribute("aria-label", isMuted ? "Sound off" : "Sound on");
    btn.setAttribute("title", isMuted ? "Sound off" : "Sound on");
}

/**
 * @returns {void}
 */
function bindEndButton() {
    let btn = document.getElementById("end-button");
    btn.addEventListener("click", () => {
        world.restartGame();
    });
}

/**
 * @returns {void}
 */
function bindPlayAgainButton() {
    let btn = document.getElementById("play-again-button");
    btn.addEventListener("click", () => {
        world.restartGame(true);
    });
}

/**
 * @returns {void}
 */
function bindFullscreenButton() {
    let btn = document.getElementById("fullscreen-button");
    let area = document.getElementById("game-area");
    btn.addEventListener("click", () => toggleFullscreen(area));
    document.addEventListener("fullscreenchange", () => updateFullscreenButtonText(btn));
}

/**
 * @param {HTMLElement} area
 * @returns {void}
 */
function toggleFullscreen(area) {
    if (!document.fullscreenElement) return area.requestFullscreen();
    document.exitFullscreen();
}

/**
 * @param {HTMLElement} btn
 * @returns {void}
 */
function updateFullscreenButtonText(btn) {
    btn.textContent = document.fullscreenElement ? "Exit Fullscreen" : "Fullscreen";
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
    btn.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
    btn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard[key] = true;
    });
    btn.addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard[key] = false;
    });
    btn.addEventListener("touchcancel", (e) => {
        e.preventDefault();
        keyboard[key] = false;
    });
    btn.addEventListener("mousedown", () => { keyboard[key] = true; });
    btn.addEventListener("mouseup", () => { keyboard[key] = false; });
    btn.addEventListener("mouseleave", () => { keyboard[key] = false; });
}

window.addEventListener('keydown', (event) => {
    setKeyboardState(event.key, true);
});

window.addEventListener('keyup', (event) => {
    setKeyboardState(event.key, false);
});

/**
 * @param {string} key
 * @param {boolean} isPressed
 * @returns {void}
 */
function setKeyboardState(key, isPressed) {
    const keyMap = { ArrowLeft: "LEFT", ArrowRight: "RIGHT", ArrowUp: "UP", ArrowDown: "DOWN", " ": "SPACE", d: "D" };
    const mappedKey = keyMap[key];
    if (mappedKey) keyboard[mappedKey] = isPressed;
}
