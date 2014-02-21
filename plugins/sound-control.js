ig.module('plugins.sound-control')
  .requires
    ( 'impact.entity'
    )
  .defines(function () {

  SoundControl = ig.Class.extend({

    capabilities: false,
    lastBGM: '',
    currentBGM: null,
    isMuted: false,

    init: function() {
      this.capabilities = createjs.Sound.getCapabilities()
    },

    playBGM: function(track) {

      if( this.isMuted )
      {
        return;
      }

      if (this.capabilities.tracks >= 2 || this.capabilities.tracks === -1) {
        createjs.Sound.stop(this.lastBGM);
        this.currentBGM = createjs.Sound.play(track,{loop:300});
        this.lastBGM = this.currentBGM;
      }
    },

    handleLoop: function(event)
    {
      //handle track looping here.
    },

    playSFX: function(sfx) {

      if( this.isMuted )
      {
        return;
      }

      if (this.capabilities.tracks >= 1 || this.capabilities.tracks === -1) {
        createjs.Sound.play(sfx);
      }
    }
  })
});
