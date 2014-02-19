ig.module(
    'plugins.MathsUtils'
    )
.requires(
  'impact.game',
  'impact.entity'
  )
.defines(function () {
    "use strict";
  ig.Game.inject(data);
  ig.Entity.inject(data);
});

var data = {
  isPointInsideRect: function (x,y, startX, startY, width, height)
    {
      var a = false;

      if( x >= startX &&
        x <= startX + width &&
        y >= startY &&
        y <= startY + height )
      {
        a = true;
      }

        return a;
    },

    doesRectOverlap: function (x,y,width,height, startX, startY, $width, $height)
    {
      var a = false;

      if( x + width >= startX &&
        x <= startX + $width &&
        y + height >= startY &&
        y <= startY + $height )
      {
        a = true;
      }

        return a;
    },

  getRandomInt:function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  distanceBetweenEntities: function( e1, e2 )
  {
    var x_cord      = (e1.pos.x + e1.size.x /2 ) - (e2.pos.x + e2.size.x /2 );
    var y_cord      = (e1.pos.y + e1.size.y /2 ) - (e2.pos.y + e2.size.y /2 );

    return Math.round(Math.sqrt(x_cord*x_cord + y_cord*y_cord));
  },

  distanceBetweenPoints: function( e1x,e1y, e2x,e2y )
  {
    var x_cord      = e1x - e2x;
    var y_cord      = e1y - e2y;

    return Math.round(Math.sqrt(x_cord*x_cord + y_cord*y_cord));
  }
};
