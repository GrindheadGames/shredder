(function (root) {
  'use strict';

  var soundControl =
      { capabilities: null
        , lastBGM: ''
        , currentBGM: null
        , mobileMode: false

        , sfxList: {}

        , init: function() {
            createjs.Sound.initializeDefaultPlugins()
            createjs.Sound.alternateExtensions = ['mp3','ogg'] // add other extensions to try loading if the src file extension is not supported

            this.capabilities = createjs.Sound.getCapabilities()
            this.mobileMode = createjs.Sound.BrowserDetect.isIOS || createjs.Sound.BrowserDetect.isAndroid

            ig.system.isMuted = true
          }

        , getSoundFormat: function() {
            return ig.system.soundControl.getCapability('mp3') ? 'ogg' : 'mp3'
          }

        , getResources: function() {
            return window.properties.sounds[this.getSoundFormat()]
          }

        , toggleMute: function() {

            ig.system.isMuted = !ig.system.isMuted

            if (ig.system.isMuted) {
              this.toggleBGMute(true)
            } else {
              this.toggleBGMute(false)
            }
            this.toggleMuteAllSfx()

            ig.system.soundControl.playSFX('click')
          }

        , toggleMuteAllSfx: function() {
            for (var sound in this.sfxList) {
               // important check that this is objects own property
               // not from prototype prop inherited
              if(this.sfxList.hasOwnProperty(sound)){
                this.sfxList[sound].setMute(!this.sfxList[sound].getMute())
              }
            }
          }

        , stopAllSfx: function() {

            for (var sound in this.sfxList) {
               // important check that this is objects own property
               // not from prototype prop inherited
              if(this.sfxList.hasOwnProperty(sound)){
                this.sfxList[sound].setMute(!this.sfxList[sound].stop())
              }
            }
          }

        , toggleBGMute:function(res) {
            if (BACKGROUND_TRACK[this.lastBGM] != null && res) {
              BACKGROUND_TRACK[this.lastBGM].pause()
              BACKGROUND_TRACK[this.lastBGM].currentTime = 0
            } else {
             this.playBGM(this.lastBGM)
            }
          }

         , playBGM: function(soundUrl) {

            this.lastBGM = soundUrl

            if (ig.system.isMuted) {
              return
            }

            if (BACKGROUND_TRACK[this.lastBGM] != null) {
              BACKGROUND_TRACK[this.lastBGM].pause()
              BACKGROUND_TRACK[this.lastBGM].currentTime = 0
            }

            if (BACKGROUND_TRACK[this.lastBGM] == null) {
              BACKGROUND_TRACK[this.lastBGM] = new Audio(soundUrl)
              BACKGROUND_TRACK[this.lastBGM].volume = 0.5
              BACKGROUND_TRACK[this.lastBGM].loop = -1
            }

            BACKGROUND_TRACK[this.lastBGM].play()
          }

        , getCapability: function(capability) {
            return createjs.Sound.getCapability(capability)
          }

        , playSFX: function(sfx, volume, loop) {

            if (ig.system.isMuted) {
              return
            }

            if (typeof volume === 'undefined') {
              volume = 1
            }

            if (this.capabilities.tracks >= 1 || this.capabilities.tracks === -1) {
              this.sfxList[sfx] = createjs.Sound.play(sfx, { volume: volume, loop: loop })
            }
          }

        , stopSFX: function(sfx) {
            if (this.sfxList[sfx]) {
              this.sfxList[sfx].stop()
            }
          }

        , setSfxVolume: function(sfx, volume) {
            if (this.sfxList[sfx]) {
              this.sfxList[sfx].setVolume(volume)
            }
          }

        , setSfxPan: function(sfx, volume) {
            if (this.sfxList[sfx]) {
              this.sfxList[sfx].setPan(volume)
            }
          }

        }

  if (typeof ig !== 'undefined') {
    // Impact.js
    ig.module('game.utility.sound-control').requires('impact.entity').defines(function () {
      SoundControl = ig.Class.extend(soundControl)
    })
  } else if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = soundControl
  } else {
    // Script tag
    root.soundControl = soundControl
  }
}(this))
