module.exports = function (safeZoneWidth, safeZoneHeight) {

  var w = window.innerWidth //* pixelRatio,
    , h = window.innerHeight //* pixelRatio
    , lw
    , lh

  if (h > w) {
    lw = h
    lh = w
  } else {
    lw = w
    lh = h
  }

  var aspectRatioDevice = lw / lh
    , aspectRatioSafeZone = safeZoneWidth / safeZoneHeight
    , extraWidth = 0, extraHeight = 0

  // have to add game pixels in order to fill the device screen.
  if (aspectRatioSafeZone < aspectRatioDevice) {
    extraWidth = aspectRatioDevice * safeZoneHeight - safeZoneWidth
  } else {
    extraHeight = safeZoneWidth / aspectRatioDevice - safeZoneHeight
  }

  var gameSize =
      { x: safeZoneWidth + extraWidth
      , y: safeZoneHeight + extraHeight
      }

  return gameSize

  //var game = new Phaser.Game( (h > w) ? h : w, (h > w) ? w : h, Phaser.CANVAS, 'game_div')
  //var game = new Phaser.Game( safeZoneWidth, safeZoneHeight, Phaser.AUTO, 'game_div')
  //var game = new Phaser.Game( safeZoneWidth + extraWidth, safeZoneHeight + extraHeight, Phaser.CANVAS, 'game_div')
}
