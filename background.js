class Background {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/bgtile00.png");
	}
	
	update() {
		//
	}
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0, PARAMS.TILE_WIDTH, PARAMS.TILE_WIDTH ,this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.TILE_WIDTH, PARAMS.TILE_WIDTH);
	}
}