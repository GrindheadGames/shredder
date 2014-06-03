
// Desktop versions of the game always use the SD size.
module.exports = function (sd, hd, threshold) {

  var x = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    , y = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    , layoutId = null
    , baseWidth = 0
    , baseHeight = 0
    , isTouch = 'ontouchstart' in window || 'onmsgesturechange' in window

  if (y > x) {
    var temp = y
    y = x
    x = temp
  }

  hd.xScale = x / hd.x
  hd.yScale = y / hd.y

  if ((hd.xScale >= threshold) && (hd.yScale >= threshold) && isTouch) {
    layoutId = 'hd'
    baseWidth = hd.x
    baseHeight = hd.y
  } else {
    layoutId = 'sd'
    baseWidth = sd.x
    baseHeight = sd.y
  }

  var result =
      { x: baseWidth
      , y: baseHeight
      }

  return result
}
