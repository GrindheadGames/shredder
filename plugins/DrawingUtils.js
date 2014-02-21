ig.module(
    'plugins.DrawingUtils'
    )
.requires(
  'impact.system'
  )
.defines(function () {
    "use strict";
  ig.System.inject(drawingData);
});

var drawingData = {
  drawColor: function( color, alpha )
  {
    var oldAlpha = this.context.globalAlpha;
    this.context.globalAlpha=alpha;
    this.context.fillStyle = color;
    this.context.fillRect( 0, 0, this.realWidth, this.realHeight );
    this.context.globalAlpha = oldAlpha;
  }
};
