class Background {
	constructor(game, x, y, version) {
		Object.assign(this, { game, x, y });
		this.version = version;
		
		this.spritesheet = [];
		
		this.spritesheet.push(ASSET_MANAGER.getAsset("./assets/bgtile00.png"));
		this.spritesheet.push(ASSET_MANAGER.getAsset("./assets/bgtile01.png"));
		this.spritesheet.push(ASSET_MANAGER.getAsset("./assets/bgtile02.png"));
	}
	
	update() {
		//
	}
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet[this.version], 0, 0, PARAMS.TILE_WIDTH, PARAMS.TILE_WIDTH
		,this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.TILE_WIDTH, PARAMS.TILE_WIDTH);
	}
}

class Intersection {
	constructor(game, x, y, direction) {
		this.WIDTH = PARAMS.GRID_WIDTH;
		
		Object.assign(this, { game, x, y, direction });
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/streetlight02.png");
		this.updateBB();
	}
	
	update() {
		this.updateBB();
	}
	
	updateBB(){
		this.BB = new BoundingBox(this.x, this.y, this.WIDTH, this.WIDTH);
	}
	
	draw(ctx) {
		/*ctx.drawImage(this.spritesheet, 0, 0, this.WIDTH, this.WIDTH
		,this.x - this.game.camera.x, this.y - this.game.camera.y, this.WIDTH, this.WIDTH);*/
		
		if (PARAMS.DEBUG) {
			ctx.strokeStyle = 'Red';
			ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
		}
	}
}
