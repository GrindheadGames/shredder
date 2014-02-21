ig.module('plugins.draggableEntity')
.requires('impact.entity', 'impact.input')
.defines(function () {
    DraggableEntity = ig.Entity.extend({
	
		isDragging: false,
		clickKey: null,

		update: function()
		{
			if( this.isDragging )
			{
				this.pos.x = ig.input.mouse.x - this.width >> 1;
				this.pos.y = ig.input.mouse.y - this.height >> 1;
			}else if( ig.input.pressed(this.clickKey) && this.isPointInsideRect(ig.input.mouse.x, ig.input.mouse.y, this.pos.x, this.pos.y, this.width, this.height))
			{
				this.isDragging = true;
			}else if( ig.input.released(this.clickKey))
			{
				this.isDragging = false;
			}
		}
	});
});