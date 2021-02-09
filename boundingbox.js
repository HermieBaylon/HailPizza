// Pedestrian, Buildings, Finish Lines, etc.
class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });

        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    };

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
        return false;
    };
};

// Vehicles
class AngleBoundingBox {
    constructor(x, y, width, height, direction) {
        Object.assign(this, { x, y, width, height });

        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
		
		this.direction = direction;
    };
	
	strokeRect(ctx, camera) {
        // Calculate Angle
	    if (this.direction < 0 || this.direction > 359) return;

	    let radians = this.direction / 360 * 2 * Math.PI;
	    let offscreenCanvas = document.createElement('canvas');

		offscreenCanvas.width = this.width;
		offscreenCanvas.height = this.height;
		
		let offscreenCtx = offscreenCanvas.getContext('2d');

		offscreenCtx.save();
        offscreenCtx.beginPath();
		offscreenCtx.translate(this.width / 2, this.height / 2);
		offscreenCtx.rotate(radians);
		//offscreenCtx.translate(-this.width / 2, -this.height / 2);
		offscreenCtx.strokeRect(this.x - camera.x - (this.width / 2), this.y - camera.y - (this.height / 2), this.width, this.height);
		offscreenCtx.restore();
		
		//console.log("Drawing Bounding Box @ (" + (this.x - camera.x - (this.width / 2)) + "," + (this.y - camera.y - (this.height / 2)) + ")");
    };
	
	drawRotatedRect(ctx, camera){
	    let radians = this.direction / 360 * 2 * Math.PI;

        ctx.save();

        ctx.beginPath();
        ctx.translate( this.x + (this.width / 2), this.y + (this.height / 2) );
        ctx.rotate(radians);

        ctx.strokeStyle = 'Red';
        ctx.strokeRect(camera.x - (this.width / 2), camera.y - (this.height / 2), this.width, this.height);
        //this.BB.x - this.game.camera.x - (this.WIDTH / 2), this.y - this.game.camera.y - (this.WIDTH / 2)

        ctx.restore();
    }

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
        return false;
    };
};