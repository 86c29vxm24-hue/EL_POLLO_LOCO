Object.assign(World.prototype, {
  /**
    * Performs restart game.
    *
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
    * Performs dispose active objects.
    *
   * @returns {void}
   */
  disposeActiveObjects() {
    this.collectDisposableObjects().forEach((obj) => this.safeDispose(obj));
  },

  /**
    * Performs collect disposable objects.
    *
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
    * Performs safe dispose.
    *
   * @param {any} obj
   * @returns {void}
   */
  safeDispose(obj) {
    if (!obj || typeof obj.dispose !== "function") return;
    obj.dispose();
  },

  /**
    * Performs reset runtime state.
    *
   * @returns {void}
   */
  resetRuntimeState() {
    this.resetGameplayFlags();
    this.resetWorldObjects();
    this.resetKeyboardState();
    this.setupStatusBars();
    this.setupCollectables();
    this.setWorld();
  },

  /**
    * Performs reset gameplay flags.
    *
   * @returns {void}
   */
  resetGameplayFlags() {
    this.gameStarted = false;
    this.gameEnded = false;
    this.endScheduled = false;
    this.camera_x = 0;
    this.lastThrowTime = 0;
    this.lastCharacterBottom = null;
  },

  /**
    * Performs reset world objects.
    *
   * @returns {void}
   */
  resetWorldObjects() {
    this.throwableObject = [];
    this.collectableObjects = [];
    this.character = new Character();
    this.level = createLevel1();
    this.statusBar = new StatusBar();
    this.statusBarCoins = new StatusBar();
    this.statusBarBottles = new StatusBar();
    this.statusBarEndboss = new StatusBar();
    this.endScreen = new EndScreen();
  },

  /**
    * Performs reset keyboard state.
    *
   * @returns {void}
   */
  resetKeyboardState() {
    Object.keys(this.keyboard).forEach((key) => {
      this.keyboard[key] = false;
    });
  },

  /**
    * Performs reset ui state.
    *
   * @param {boolean} startImmediately
   * @returns {void}
   */
  resetUiState(startImmediately = false) {
    const startBtn = document.getElementById("start-button");
    const endBtn = document.getElementById("end-button");
    const playAgainBtn = document.getElementById("play-again-button");
    if (startBtn) startBtn.style.display = startImmediately ? "none" : "block";
    if (endBtn) endBtn.style.display = "none";
    if (playAgainBtn) playAgainBtn.style.display = "none";
  },
});
