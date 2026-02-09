class GamingSounds {
  jumpSound = new Audio("audio/edr-8-bit-jump-001-171817.mp3");
  coinCollectSound = new Audio("audio/wolfy_sanic-collect-ring-15982.mp3");
  startScreenMusic = new Audio("audio/xtremefreddy-game-music-loop-7-145285.mp3");
  endScreenMusic = new Audio("audio/universfield-cartoon-fail-trumpet-278822.mp3");

  /**
   * @returns {void}
   */
  playJump() {
    this.jumpSound.currentTime = 0;
    this.jumpSound.play();
  }

  /**
   * @returns {void}
   */
  playCoinCollect() {
    this.coinCollectSound.currentTime = 0;
    this.coinCollectSound.play();
  }

  /**
   * @returns {void}
   */
  playStartScreenLoop() {
    this.startScreenMusic.loop = true;
    this.startScreenMusic.play().catch(() => {});
  }

  /**
   * @returns {void}
   */
  stopStartScreenLoop() {
    this.startScreenMusic.pause();
    this.startScreenMusic.currentTime = 0;
  }

  /**
   * @returns {boolean}
   */
  toggleStartScreenLoop() {
    if (this.startScreenMusic.paused) {
      this.playStartScreenLoop();
      return true;
    }
    this.startScreenMusic.pause();
    return false;
  }

  /**
   * @returns {boolean}
   */
  isStartScreenLoopPlaying() {
    return !this.startScreenMusic.paused;
  }

  /**
   * @returns {void}
   */
  playEndScreenLoop() {
    this.endScreenMusic.loop = false;
    this.endScreenMusic.currentTime = 0;
    this.endScreenMusic.play().catch(() => {});
  }
}

const gameSounds = new GamingSounds();
