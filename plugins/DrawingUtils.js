
(function (root) {
  'use strict';

  var drawingData =
    { drawColor: function( color, alpha ) {
        var oldAlpha = this.context.globalAlpha
        this.context.globalAlpha=alpha
        this.context.fillStyle = color
        this.context.fillRect( 0, 0, this.realWidth, this.realHeight )
        this.context.globalAlpha = oldAlpha
      }
    }

  if (typeof ig !== 'undefined') {
    // Impact.js:
    ig.module('plugins.DrawingUtils').requires('impact.system').defines(function () {
      ig.System.inject(drawingData)
    })
  } else if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = drawingData
  } else {
    // Script tag
    root.drawingData = drawingData
  }
}(root))
