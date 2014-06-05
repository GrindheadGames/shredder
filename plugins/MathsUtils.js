(function (root) {

  'use strict';

  var mathUtils =
      { isPointInsideRect: function (x,y, startX, startY, width, height) {
          var a = false

          if(x >= startX && x <= startX + width && y >= startY && y <= startY + height) {
              a = true
            }

          return a
        }

      , doesRectOverlap: function (x,y,width,height, startX, startY, $width, $height) {
          var a = false

          if(x + width >= startX && x <= startX + $width && y + height >= startY && y <= startY + $height) {
            a = true
          }

          return a
        }

      , distanceBetweenEntities: function (e1, e2) {
          var x_cord = (e1.pos.x + e1.size.x / 2) - (e2.pos.x + e2.size.x / 2)
            , y_cord = (e1.pos.y + e1.size.y / 2) - (e2.pos.y + e2.size.y / 2)

          return Math.round(Math.sqrt(x_cord * x_cord + y_cord * y_cord))
        }

      , getAngle: function (x1, y1, x2, y2) {
          // this is in radians.
          var dx = x2 - x1
            , dy = y2 - y1

          return Math.atan2(dy, dx)
        }

      , distanceBetweenPoints: function (e1x, e1y, e2x, e2y) {
          var x_cord = e1x - e2x
          var y_cord = e1y - e2y

          return Math.round(Math.sqrt(x_cord * x_cord + y_cord * y_cord))
        }

      , getRandomInt: function (min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min
        }

      , getRandomBoolean: function () {
          return Math.random() > .5
        }

      , getVelocity: function (vector) {
          return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y))
        }

      , rotateVector: function (angle, vector) {
          var cosRY = Math.cos(angle)
            , sinRY = Math.sin(angle)
            , newVec =
              { x: vector.x
              , y: vector.y
              }

          vector.x = (newVec.x * cosRY) - (newVec.y * sinRY)
          vector.y = (newVec.x * sinRY) + (newVec.y * cosRY)

          return vector
        }

      , map: function (value, inMin, inMax, outMin, outMax) {
          return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
        }
      }


  if (typeof ig !== 'undefined') {
    // Impact.js
    ig.module('plugins.MathsUtils').requires('impact.game','impact.entity')
      .defines(function () {
        ig.Game.inject(mathUtils)
        ig.Entity.inject(mathUtils)
      })
  } else if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = mathUtils
  } else {
    // Script tag
    root.mathUtils = mathUtils
  }
}(this))
