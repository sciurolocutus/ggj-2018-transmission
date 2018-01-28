var Street = function(x, y, scale, repeat) {
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.repeat = !!repeat;
}

Street.prototype.drawDottedLine(x, y, ctx) {
	
}

Street.prototype.draw(ctx) {
	this.drawDottedLine(1, 2, ctx);

}
