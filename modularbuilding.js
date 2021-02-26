class ModularBuilding {
	constructor(game, x, y, version1, version2) {
		// constants
		this.WIDTH = PARAMS.GRID_WIDTH;
		this.HEIGHT = PARAMS.GRID_WIDTH;
		this.BB_WIDTH = PARAMS.GRID_WIDTH - 10;
		this.BB_HEIGHT = PARAMS.GRID_WIDTH - 10;
		this.BB_XBUFFER = (this.WIDTH - this.BB_WIDTH) / 2;
		this.BB_YBUFFER = (this.HEIGHT - this.BB_HEIGHT) / 2;
		
		Object.assign(this, { game, x, y });
		// Initialize sprite based on version codes
		let ver = this.pad(version1,2) + "-" + this.pad(version2,2);
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/roof/" + ver + ".png");
		
		this.animation = new Animator(this.spritesheet, 0, 0,
			this.WIDTH, this.HEIGHT, 1, 1, 1, false, true);
		
		// Update bounding box
		this.updateBB();
	};
	
	updateBB(){
		this.BB = new BoundingBox(this.x + this.BB_XBUFFER, this.y + this.BB_YBUFFER, this.BB_WIDTH, this.BB_HEIGHT);
	};
	
	update() {
		this.updateBB();
	};
	
	draw(ctx) {
		this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
			
		if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x,
							this.BB.y - this.game.camera.y,
							this.BB.width, this.BB.height);
        }
	};
	
	pad(num, size) {
		num = num.toString();
		while (num.length < size) num = "0" + num;
		return num;
	}
}