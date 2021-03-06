(function (root) {
  'use strict';

var draggableEntity =
    { isDragging: false
    , clickKey: ''
    , realXPos:0
    , realYPos:0
    , image: null

    , init: function (x,y,settings) {
        this.parent(x,y,settings)

        this.realXPos = this.pos.x- (this.size.x >> 1)
        this.realYPos = this.pos.y- (this.size.y >> 1)
      }

    , update: function () {
        //use bit wise operators when possible.
        //we also cache this value here because it is used twice per game loop and we can reduce calculations.
        this.realXPos = this.pos.x- (this.size.x >> 1)
        this.realYPos = this.pos.y- (this.size.y >> 1)

        if (this.isDragging) {
          this.pos.x = ig.input.mouse.x
          this.pos.y = ig.input.mouse.y
        } else if (this.isDragging == false && ig.input.pressed(this.clickKey) && this.isPointInsideRect(ig.input.mouse.x, ig.input.mouse.y,this.realXPos,this.realYPos, this.size.x, this.size.y)) {
          this.isDragging = true
        }

        if (ig.input.released(this.clickKey)) {
          this.isDragging = false
        }

        this.parent()
      }

    , draw: function () {
        this.parent()
        this.image.draw(this.realXPos, this.realYPos)
      }
    }

  if (typeof ig !== 'undefined') {
    // Impact.js
    ig.module('plugins.draggableEntity').requires('impact.entity', 'impact.input').defines(function () {
      DraggableEntity = ig.Entity.extend(draggableEntity)
    })
  } else if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = draggableEntity
  } else {
    // Script tag
    root.draggableEntity = draggableEntity
  }
}(this))
