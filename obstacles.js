class Streetlight {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/streetlight02.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0, 25, 51, this.x - this.game.camera.x, this.y - this.game.camera.y, 25, 51);
	};
};

class Fence {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/fence.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0, 75, 14, this.x - this.game.camera.x, this.y - this.game.camera.y, 75, 14);
	};
};

class Building {
	constructor(game, x, y) {
		// constants
		this.WIDTH = 128;
		this.HEIGHT = 64;
		this.BB_WIDTH = 100;
		this.BB_HEIGHT = 64;
		this.BB_XBUFFER = (this.WIDTH - this.BB_WIDTH) / 2;
		this.BB_YBUFFER = (this.HEIGHT - this.BB_HEIGHT) / 2;
		
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/building.png");
		
		this.animation = new Animator(this.spritesheet, 0, 0,
			this.WIDTH, this.HEIGHT, 1, 1, 1, false, true);
		
		// Update bounding box
		this.updateBB();
	};
	
	updateBB(){
		this.BB = new BoundingBox(this.x + this.BB_XBUFFER, this.y + this.BB_YBUFFER, this.BB_WIDTH, this.BB_HEIGHT);
	};
	
	update() {
		// No need to update bounding box, it ain't going anywhere
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
};
