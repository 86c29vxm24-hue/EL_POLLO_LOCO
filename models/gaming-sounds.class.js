class GamingSounds {
  startScreenVolume = 1;
  gameplayBackgroundVolume = 0.5;
  jumpVolume = 0.5;
  coinCollectVolume = 0.55;
  jumpSound = new Audio("audio/edr-8-bit-jump-001-171817.mp3");
  characterHurtSound = new Audio("audio/homemade_sfx-slap-hurt-pain-sound-effect-262618.mp3");
  characterDeathSound = new Audio("audio/freesound_community-young-man-being-hurt-95628.mp3");
  enemyHitSound = new Audio("audio/stepir44-hurt-sound-435314.mp3");
  endbossHitSound = new Audio("audio/digitalstore07-chicken-430403.mp3");
  endbossDeathSound = new Audio("audio/freesound_community-086398_game-die-81356.mp3");
  coinCollectSound = new Audio("audio/wolfy_sanic-collect-ring-15982.mp3");
  bottleCollectSound = new Audio("audio/delon_boomkin-video-game-collect-item-468889.mp3");
  bottleSplashSound = new Audio("audio/freesound_community-water-splash-80537.mp3");
  startScreenMusic = new Audio("audio/xtremefreddy-game-music-loop-7-145285.mp3");
  endScreenLoseSound = new Audio("audio/universfield-cartoon-fail-trumpet-278822.mp3");
  endScreenWinSound = new Audio("audio/scratchonix-victory-chime-366449.mp3");
  muted = false;

  /**
    * Initializes the instance.
    *
   * @returns {void}
   */
  constructor() {
    this.muted = this.loadMuteState();
    this.applyCustomVolumes();
    this.applyMuteState();
  }

  /**
    * Performs apply custom volumes.
    *
   * @returns {void}
   */
  applyCustomVolumes() {
    this.jumpSound.volume = this.jumpVolume;
    this.coinCollectSound.volume = this.coinCollectVolume;
  }

  /**
    * Returns all sounds.
    *
   * @returns {Audio[]}
   */
  getAllSounds() {
    return [
      this.jumpSound, this.characterHurtSound, this.characterDeathSound, this.enemyHitSound,
      this.endbossHitSound, this.endbossDeathSound, this.coinCollectSound, this.bottleCollectSound, this.bottleSplashSound,
      this.startScreenMusic, this.endScreenLoseSound, this.endScreenWinSound,
    ];
  }

  /**
    * Performs load mute state.
    *
   * @returns {boolean}
   */
  loadMuteState() {
    const savedValue = localStorage.getItem("globalMute");
    return savedValue === "true";
  }

  /**
    * Performs save mute state.
    *
   * @returns {void}
   */
  saveMuteState() {
    localStorage.setItem("globalMute", String(this.muted));
  }

  /**
    * Performs apply mute state.
    *
   * @returns {void}
   */
  applyMuteState() {
    this.getAllSounds().forEach((sound) => {
      sound.muted = this.muted;
    });
  }

  /**
    * Checks whether is muted.
    *
   * @returns {boolean}
   */
  isMuted() {
    return this.muted;
  }

  /**
    * Performs toggle mute.
    *
   * @returns {boolean}
   */
  toggleMute() {
    this.muted = !this.muted;
    this.applyMuteState();
    this.saveMuteState();
    return this.muted;
  }

  /**
    * Plays sound.
    *
   * @param {Audio} sound
   * @param {boolean} restart
   * @returns {void}
   */
  playSound(sound, restart = true) {
    if (this.muted) return;
    if (restart) sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  /**
    * Plays jump.
    *
   * @returns {void}
   */
  playJump() {
    this.playSound(this.jumpSound);
  }

  /**
    * Plays character hurt.
    *
   * @returns {void}
   */
  playCharacterHurt() {
    this.playSound(this.characterHurtSound);
  }

  /**
    * Plays character death.
    *
   * @returns {void}
   */
  playCharacterDeath() {
    this.characterDeathSound.loop = false;
    this.playSound(this.characterDeathSound);
  }

  /**
    * Plays enemy hit.
    *
   * @returns {void}
   */
  playEnemyHit() {
    this.playSound(this.enemyHitSound);
  }

  /**
    * Plays endboss death.
    *
   * @returns {void}
   */
  playEndbossDeath() {
    this.endbossDeathSound.loop = false;
    this.playSound(this.endbossDeathSound);
  }

  /**
    * Plays endboss hit.
    *
   * @returns {void}
   */
  playEndbossHit() {
    this.playSound(this.endbossHitSound);
  }

  /**
    * Plays coin collect.
    *
   * @returns {void}
   */
  playCoinCollect() {
    this.playSound(this.coinCollectSound);
  }

  /**
    * Plays bottle splash.
    *
   * @returns {void}
   */
  playBottleSplash() {
    this.playSound(this.bottleSplashSound);
  }

  /**
    * Plays bottle collect.
    *
   * @returns {void}
   */
  playBottleCollect() {
    this.playSound(this.bottleCollectSound);
  }

  /**
    * Plays start screen loop.
    *
   * @returns {void}
   */
  playStartScreenLoop() {
    this.startScreenMusic.loop = true;
    this.startScreenMusic.volume = this.startScreenVolume;
    this.playSound(this.startScreenMusic, false);
  }

  /**
    * Plays gameplay background loop.
    *
   * @returns {void}
   */
  playGameplayBackgroundLoop() {
    this.startScreenMusic.loop = true;
    this.startScreenMusic.volume = this.gameplayBackgroundVolume;
    this.playSound(this.startScreenMusic, false);
  }

  /**
    * Performs stop start screen loop.
    *
   * @returns {void}
   */
  stopStartScreenLoop() {
    this.startScreenMusic.pause();
    this.startScreenMusic.currentTime = 0;
  }

  /**
    * Performs stop all sounds.
    *
   * @returns {void}
   */
  stopAllSounds() {
    this.getAllSounds().forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  /**
    * Performs toggle start screen loop.
    *
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
    * Checks whether is start screen loop playing.
    *
   * @returns {boolean}
   */
  isStartScreenLoopPlaying() {
    return !this.startScreenMusic.paused;
  }

  /**
    * Plays lose end screen sound.
    *
   * @returns {void}
   */
  playLoseEndScreenSound() {
    this.endScreenLoseSound.loop = false;
    this.playSound(this.endScreenLoseSound);
  }

  /**
    * Plays win end screen sound.
    *
   * @returns {void}
   */
  playWinEndScreenSound() {
    this.endScreenWinSound.loop = false;
    this.playSound(this.endScreenWinSound);
  }
}

const gameSounds = new GamingSounds();
