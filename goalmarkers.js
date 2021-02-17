class StartMission {
	constructor(game, x, y) {
		// constants
		this.SCALE = 1 / 4;
		this.WIDTH = 250;
		this.HEIGHT = this.WIDTH;
		this.BB_WIDTH = this.WIDTH;
		this.BB_HEIGHT = this.WIDTH;
		this.BB_XBUFFER = (this.WIDTH - this.BB_WIDTH) / 2;
		this.BB_YBUFFER = (this.HEIGHT - this.BB_HEIGHT) / 2;
		
		Object.assign(this, { game, x, y });
		this.x = x + (this.WIDTH * this.SCALE) / 2;
		this.y = y + (this.WIDTH * this.SCALE) / 2;
		this.isVisible = true;
		this.game.shop = this;
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/exclamation.png");
		
		// Update bounding box
		this.updateBB();
	};
	
	updateBB(){
		this.BB = new BoundingBox(this.x + this.BB_XBUFFER - (this.WIDTH * this.SCALE) / 2,
									this.y + this.BB_YBUFFER - (this.WIDTH * this.SCALE) / 2,
									this.BB_WIDTH * this.SCALE, this.BB_HEIGHT * this.SCALE);
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		if (this.isVisible) ctx.drawImage(this.spritesheet, 0, 0,
						this.WIDTH, this.WIDTH,
						this.x - this.game.camera.x - (this.WIDTH * this.SCALE) / 2,
						this.y - this.game.camera.y - (this.WIDTH * this.SCALE) / 2,
						this.WIDTH / 4, this.WIDTH / 4);
		
		if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x,
							this.BB.y - this.game.camera.y,
							this.BB.width, this.BB.height);
        }
	};
}

class GoalPost {
	constructor(game, x, y) {
		// constants
		this.SCALE = 1 / 4;
		this.WIDTH = 250;
		this.HEIGHT = this.WIDTH;
		this.BB_WIDTH = this.WIDTH;
		this.BB_HEIGHT = this.WIDTH;
		this.BB_XBUFFER = (this.WIDTH - this.BB_WIDTH) / 2;
		this.BB_YBUFFER = (this.HEIGHT - this.BB_HEIGHT) / 2;
		
		Object.assign(this, { game, x, y });
		this.isVisible = false;
		this.arrow = new Arrow(game, 0, 0, x + (this.WIDTH * this.SCALE) / 2, y + (this.HEIGHT * this.SCALE) / 2, 1);
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/goal.png");
		
		// Update bounding box
		this.updateBB();
	};
	
	updateBB(){
		this.BB = new BoundingBox(this.x + this.BB_XBUFFER, this.y + this.BB_YBUFFER, this.BB_WIDTH * this.SCALE, this.BB_HEIGHT * this.SCALE);
	};
	
	update() {
		this.arrow.update();
		// TODO
	};
	
	draw(ctx) {
		if (this.isVisible) {
			ctx.drawImage(this.spritesheet, 0, 0, this.WIDTH, this.WIDTH, this.x - this.game.camera.x, this.y - this.game.camera.y, this.WIDTH / 4, this.WIDTH / 4);
			this.arrow.isVisible = true;
		} else {
			this.arrow.isVisible = false;
		}
		this.arrow.draw(ctx);
		if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x,
							this.BB.y - this.game.camera.y,
							this.BB.width, this.BB.height);
        }
	};
}

class Arrow {
	constructor(game, x, y, targetX, targetY, version) {
		// constants
		this.SCALE = 1;
		this.WIDTH = 100;
		this.HEIGHT = this.WIDTH;
		
		Object.assign(this, { game, x, y, targetX, targetY });
		this.isVisible = false;
		this.version = version;
		this.direction = 0;
		
		this.spritesheet = [];
		this.spritesheet.push(ASSET_MANAGER.getAsset("./assets/arrow01.png"));
		this.spritesheet.push(ASSET_MANAGER.getAsset("./assets/arrow02.png"));
		
		this.animation =  new AngleAnimator(this.spritesheet[this.version], 0, 0,
			this.WIDTH, this.WIDTH, 1, 1, 1, this.direction, false, true);
	};
	
	update() {
		this.x = this.game.player.x;
		this.y = this.game.player.y;
		// Calculate center to center angle
		let angle = Math.atan( Math.abs(this.targetY - this.y) / Math.abs(this.targetX - this.x) ) * (180 / Math.PI);
		if (this.targetX - this.x >= 0 && this.targetY - this.y >= 0) angle = (angle % 90); //Q1
		if (this.targetX - this.x <  0 && this.targetY - this.y >= 0) angle = 180 - (angle % 90); //Q2
		if (this.targetX - this.x <  0 && this.targetY - this.y <  0) angle = 180 + (angle % 90); //Q3
		if (this.targetX - this.x >= 0 && this.targetY - this.y <  0) angle = 360 - (angle % 90); //Q4
		
		this.direction = angle;
	};
	
	draw(ctx) {
		if (this.isVisible) this.animation.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.SCALE);
	};
}