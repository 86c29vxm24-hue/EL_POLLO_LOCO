class GamingSounds {
  jumpSound = new Audio("audio/edr-8-bit-jump-001-171817.mp3");
  characterHurtSound = new Audio("audio/homemade_sfx-slap-hurt-pain-sound-effect-262618.mp3");
  characterDeathSound = new Audio("audio/freesound_community-young-man-being-hurt-95628.mp3");
  enemyHitSound = new Audio("audio/stepir44-hurt-sound-435314.mp3");
  endbossDeathSound = new Audio("audio/freesound_community-086398_game-die-81356.mp3");
  coinCollectSound = new Audio("audio/wolfy_sanic-collect-ring-15982.mp3");
  bottleCollectSound = new Audio("audio/delon_boomkin-video-game-collect-item-468889.mp3");
  bottleSplashSound = new Audio("audio/freesound_community-water-splash-80537.mp3");
  startScreenMusic = new Audio("audio/xtremefreddy-game-music-loop-7-145285.mp3");
  endScreenLoseSound = new Audio("audio/universfield-cartoon-fail-trumpet-278822.mp3");
  endScreenWinSound = new Audio("audio/scratchonix-victory-chime-366449.mp3");
  muted = false;

  constructor() {
    this.muted = this.loadMuteState();
    this.applyMuteState();
  }

  /**
   * @returns {Audio[]}
   */
  getAllSounds() {
    return [
      this.jumpSound, this.characterHurtSound, this.characterDeathSound, this.enemyHitSound,
      this.endbossDeathSound, this.coinCollectSound, this.bottleCollectSound, this.bottleSplashSound,
      this.startScreenMusic, this.endScreenLoseSound, this.endScreenWinSound,
    ];
  }

  /**
   * @returns {boolean}
   */
  loadMuteState() {
    const savedValue = localStorage.getItem("globalMute");
    return savedValue === "true";
  }

  /**
   * @returns {void}
   */
  saveMuteState() {
    localStorage.setItem("globalMute", String(this.muted));
  }

  /**
   * @returns {void}
   */
  applyMuteState() {
    this.getAllSounds().forEach((sound) => {
      sound.muted = this.muted;
    });
  }

  /**
   * @returns {boolean}
   */
  isMuted() {
    return this.muted;
  }

  /**
   * @returns {boolean}
   */
  toggleMute() {
    this.muted = !this.muted;
    this.applyMuteState();
    this.saveMuteState();
    return this.muted;
  }

  /**
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
   * @returns {void}
   */
  playJump() {
    this.playSound(this.jumpSound);
  }

  /**
   * @returns {void}
   */
  playCharacterHurt() {
    this.playSound(this.characterHurtSound);
  }

  /**
   * @returns {void}
   */
  playCharacterDeath() {
    this.characterDeathSound.loop = false;
    this.playSound(this.characterDeathSound);
  }

  /**
   * @returns {void}
   */
  playEnemyHit() {
    this.playSound(this.enemyHitSound);
  }

  /**
   * @returns {void}
   */
  playEndbossDeath() {
    this.endbossDeathSound.loop = false;
    this.playSound(this.endbossDeathSound);
  }

  /**
   * @returns {void}
   */
  playCoinCollect() {
    this.playSound(this.coinCollectSound);
  }

  /**
   * @returns {void}
   */
  playBottleSplash() {
    this.playSound(this.bottleSplashSound);
  }

  /**
   * @returns {void}
   */
  playBottleCollect() {
    this.playSound(this.bottleCollectSound);
  }

  /**
   * @returns {void}
   */
  playStartScreenLoop() {
    this.startScreenMusic.loop = true;
    this.playSound(this.startScreenMusic, false);
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
    this.playSound(this.endScreenLoseSound);
  }

  /**
   * @returns {void}
   */
  playWinEndScreenSound() {
    this.endScreenWinSound.loop = false;
    this.playSound(this.endScreenWinSound);
  }
}

const gameSounds = new GamingSounds();
