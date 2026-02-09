class GamingSounds {
  jumpSound = new Audio("audio/edr-8-bit-jump-001-171817.mp3");
  coinCollectSound = new Audio("audio/wolfy_sanic-collect-ring-15982.mp3");
  bottleCollectSound = new Audio("audio/delon_boomkin-video-game-collect-item-468889.mp3");
  bottleSplashSound = new Audio("audio/freesound_community-water-splash-80537.mp3");
  startScreenMusic = new Audio("audio/xtremefreddy-game-music-loop-7-145285.mp3");
  endScreenLoseSound = new Audio("audio/universfield-cartoon-fail-trumpet-278822.mp3");
  endScreenWinSound = new Audio("audio/scratchonix-victory-chime-366449.mp3");

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
  playBottleSplash() {
    this.bottleSplashSound.currentTime = 0;
    this.bottleSplashSound.play();
  }

  /**
   * @returns {void}
   */
  playBottleCollect() {
    this.bottleCollectSound.currentTime = 0;
    this.bottleCollectSound.play();
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
  playLoseEndScreenSound() {
    this.endScreenLoseSound.loop = false;
    this.endScreenLoseSound.currentTime = 0;
    this.endScreenLoseSound.play().catch(() => {});
  }

  /**
   * @returns {void}
   */
  playWinEndScreenSound() {
    this.endScreenWinSound.loop = false;
    this.endScreenWinSound.currentTime = 0;
    this.endScreenWinSound.play().catch(() => {});
  }
}

const gameSounds = new GamingSounds();
