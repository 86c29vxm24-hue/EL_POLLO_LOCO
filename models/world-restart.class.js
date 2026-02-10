Object.assign(World.prototype, {
  /**
   * @param {boolean} startImmediately
   * @returns {void}
   */
  restartGame(startImmediately = false) {
    gameSounds.stopAllSounds();
    this.disposeActiveObjects();
    this.resetRuntimeState();
    this.resetUiState(startImmediately);
    if (startImmediately) this.startGame();
    else gameSounds.playStartScreenLoop();
  },

  /**
   * @returns {void}
   */
  disposeActiveObjects() {
    this.collectDisposableObjects().forEach((obj) => this.safeDispose(obj));
  },

  /**
   * @returns {Array}
   */
  collectDisposableObjects() {
    return [
      this.character,
      ...this.level.enemies,
      ...this.level.clouds,
      ...this.throwableObject,
      ...this.collectableObjects,
    ];
  },

  /**
   * @param {any} obj
   * @returns {void}
   */
  safeDispose(obj) {
    if (!obj || typeof obj.dispose !== "function") return;
    obj.dispose();
  },

  /**
   * @returns {void}
   */
  resetRuntimeState() {
    this.gameStarted = false;
    this.gameEnded = false;
    this.endScheduled = false;
    this.camera_x = 0;
    this.lastThrowTime = 0;
    this.throwableObject = [];
    this.collectableObjects = [];
    this.character = new Character();
    this.level = createLevel1();
    this.endScreen = new EndScreen();
    this.resetKeyboardState();
    this.setupStatusBars();
    this.setupCollectables();
    this.setWorld();
  },

  resetKeyboardState() {
    Object.keys(this.keyboard).forEach((key) => {
      this.keyboard[key] = false;
    });
  },

  resetUiState(startImmediately = false) {
    const startBtn = document.getElementById("start-button");
    const endBtn = document.getElementById("end-button");
    const playAgainBtn = document.getElementById("play-again-button");
    if (startBtn) startBtn.style.display = startImmediately ? "none" : "block";
    if (endBtn) endBtn.style.display = "none";
    if (playAgainBtn) playAgainBtn.style.display = "none";
  },
});
