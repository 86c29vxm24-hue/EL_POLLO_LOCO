let canvas;
let world;
let keyboard = new Keyboard();

/**
  * Performs init.
  *
 * @returns {void}
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  bindStartButton();
  bindPlayAgainButton();
  bindMusicToggleButton();
  bindEndButton();
  bindFullscreenButton();
  bindMobileControls();
}

/**
  * Performs bind start button.
  *
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
  * Performs bind music toggle button.
  *
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
    if (!isMuted && world.gameEnded) return updateMuteButtonText(btn);
    if (!isMuted && !world.gameStarted) gameSounds.playStartScreenLoop();
    if (!isMuted && world.gameStarted) gameSounds.playGameplayBackgroundLoop();
    updateMuteButtonText(btn);
  });
}

/**
  * Performs update mute button text.
  *
 * @param {HTMLElement} btn
 * @returns {void}
 */
function updateMuteButtonText(btn) {
  const isMuted = gameSounds.isMuted();
  const isMobileLayout = window.matchMedia("(max-width: 1366px) and (pointer: coarse)").matches;
  btn.textContent = isMobileLayout ? "" : (isMuted ? "Sound: Off" : "Sound: On");
  btn.classList.toggle("is-muted", isMuted);
  btn.setAttribute("aria-label", isMuted ? "Sound off" : "Sound on");
  btn.setAttribute("title", isMuted ? "Sound off" : "Sound on");
}

/**
  * Performs bind end button.
  *
 * @returns {void}
 */
function bindEndButton() {
  let btn = document.getElementById("end-button");
  btn.addEventListener("click", () => {
    world.restartGame();
  });
}

/**
  * Performs bind play again button.
  *
 * @returns {void}
 */
function bindPlayAgainButton() {
  let btn = document.getElementById("play-again-button");
  btn.addEventListener("click", () => {
    world.restartGame(true);
  });
}

/**
  * Performs bind fullscreen button.
  *
 * @returns {void}
 */
function bindFullscreenButton() {
  let btn = document.getElementById("fullscreen-button");
  let area = document.getElementById("game-area");
  btn.addEventListener("click", () => toggleFullscreen(area));
  document.addEventListener("fullscreenchange", () => updateFullscreenButtonText(btn));
}

/**
  * Performs toggle fullscreen.
  *
 * @param {HTMLElement} area
 * @returns {void}
 */
function toggleFullscreen(area) {
  if (!document.fullscreenElement) return area.requestFullscreen();
  document.exitFullscreen();
}

/**
  * Performs update fullscreen button text.
  *
 * @param {HTMLElement} btn
 * @returns {void}
 */
function updateFullscreenButtonText(btn) {
  btn.textContent = document.fullscreenElement ? "Exit Fullscreen" : "Fullscreen";
}

/**
  * Performs bind mobile controls.
  *
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
  * Performs bind hold.
  *
 * @param {HTMLElement} btn
 * @param {string} key
 * @returns {void}
 */
function bindHold(btn, key) {
  btn.addEventListener("contextmenu", preventDefaultEvent);
  bindTouchControls(btn, key);
  bindMouseControls(btn, key);
}

/**
  * Performs prevent default event.
  *
 * @param {Event} event
 * @returns {void}
 */
function preventDefaultEvent(event) {
  if (event.cancelable) event.preventDefault();
}

/**
  * Performs bind touch controls.
  *
 * @param {HTMLElement} btn
 * @param {string} key
 * @returns {void}
 */
function bindTouchControls(btn, key) {
  btn.addEventListener("touchstart", (event) => setTouchKeyState(event, btn, key, true));
  btn.addEventListener("touchend", (event) => setTouchKeyState(event, btn, key, false));
  btn.addEventListener("touchcancel", (event) => setTouchKeyState(event, btn, key, false));
}

/**
  * Sets touch key state.
  *
 * @param {TouchEvent} event
 * @param {HTMLElement} btn
 * @param {string} key
 * @param {boolean} isPressed
 * @returns {void}
 */
function setTouchKeyState(event, btn, key, isPressed) {
  if (event.cancelable) event.preventDefault();
  setButtonPressed(btn, isPressed);
  keyboard[key] = isPressed;
}

/**
  * Performs bind mouse controls.
  *
 * @param {HTMLElement} btn
 * @param {string} key
 * @returns {void}
 */
function bindMouseControls(btn, key) {
  btn.addEventListener("mousedown", () => setMouseKeyState(btn, key, true));
  btn.addEventListener("mouseup", () => setMouseKeyState(btn, key, false));
  btn.addEventListener("mouseleave", () => setMouseKeyState(btn, key, false));
}

/**
  * Sets mouse key state.
  *
 * @param {HTMLElement} btn
 * @param {string} key
 * @param {boolean} isPressed
 * @returns {void}
 */
function setMouseKeyState(btn, key, isPressed) {
  setButtonPressed(btn, isPressed);
  keyboard[key] = isPressed;
}

/**
  * Sets button pressed.
  *
 * @param {HTMLElement} btn
 * @param {boolean} isPressed
 * @returns {void}
 */
function setButtonPressed(btn, isPressed) {
  btn.classList.toggle("is-pressed", isPressed);
}

window.addEventListener("keydown", (event) => {
  setKeyboardState(event.key, true);
});

window.addEventListener("keyup", (event) => {
  setKeyboardState(event.key, false);
});

/**
  * Sets keyboard state.
  *
 * @param {string} key
 * @param {boolean} isPressed
 * @returns {void}
 */
function setKeyboardState(key, isPressed) {
  const keyMap = { ArrowLeft: "LEFT", ArrowRight: "RIGHT", ArrowUp: "UP", ArrowDown: "DOWN", " ": "SPACE", d: "D" };
  const mappedKey = keyMap[key];
  if (mappedKey) keyboard[mappedKey] = isPressed;
}
