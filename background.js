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
