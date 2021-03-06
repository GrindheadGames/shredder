var sdOrHd = require('./sd-or-hd')
  , safeFitDimensions = require('./safe-fit-dimensions')

module.exports = function(targetDimensions, threshold) {

  var sd = targetDimensions.sd
    , hd = targetDimensions.hd
    , dimensions = sdOrHd(sd, hd, threshold)

  console.log('target dimensions', dimensions)

  return safeFitDimensions(dimensions.x, dimensions.y)
}
