/**
* Hello
*/
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
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/exclamation.png");
		
		// Update bounding box
		this.updateBB();
	};
	
	updateBB(){
		this.BB = new BoundingBox(this.x + this.BB_XBUFFER, this.y + this.BB_YBUFFER, this.BB_WIDTH * this.SCALE, this.BB_HEIGHT * this.SCALE);
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0,
			this.WIDTH, this.WIDTH,
			this.x - this.game.camera.x, this.y - this.game.camera.y, this.WIDTH / 4, this.WIDTH / 4);
		
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
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/goal.png");
		
		// Update bounding box
		this.updateBB();
	};
	
	updateBB(){
		this.BB = new BoundingBox(this.x + this.BB_XBUFFER, this.y + this.BB_YBUFFER, this.BB_WIDTH * this.SCALE, this.BB_HEIGHT * this.SCALE);
	};
	
	update() {
        this.elapsedTime += this.game.clockTick;

        if (this.game.click && this.game.driver.collide(this, this.game.click)) {           
                loadChat(this.chats[this.game.driver.state]);
        };
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0, this.WIDTH, this.WIDTH, this.x - this.game.camera.x, this.y - this.game.camera.y, this.WIDTH / 4, this.WIDTH / 4);
		
		if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x,
							this.BB.y - this.game.camera.y,
							this.BB.width, this.BB.height);
        }
	};
}