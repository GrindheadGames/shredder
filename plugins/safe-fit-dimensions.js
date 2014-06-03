module.exports = function (safeZoneWidth, safeZoneHeight) {

  var width = window.innerWidth * window.devicePixelRatio
    , height = window.innerHeight * window.devicePixelRatio
    , landscape = { x: 0, y: 0 }

  if (height > width) {
    console.log('optimising scale for portrait')
    landscape.x = height
    landscape.y = width
  } else {
    console.log('optimising scale for landscape')
    landscape.x = width
    landscape.y = height
  }

  var aspectRatioDevice = landscape.x / landscape.y
    , aspectRatioSafeZone = safeZoneWidth / safeZoneHeight
    , extraWidth = 0
    , extraHeight = 0

  // have to add game pixels in order to fill the device screen.
  if (aspectRatioSafeZone < aspectRatioDevice) {
    extraWidth = aspectRatioDevice * safeZoneHeight - safeZoneWidth
    console.log('padding width by', extraWidth)
  } else {
    extraHeight = safeZoneWidth / aspectRatioDevice - safeZoneHeight
    console.log('padding height by', extraHeight)
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
