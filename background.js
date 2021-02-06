class Background {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/bgtile00.png");
	}
	
	update() {
		//
	}
	
	draw(ctx) {
<<<<<<< HEAD
		ctx.drawImage(this.spritesheet, 0, 0, 1024, 768 ,this.x - this.game.camera.x, this.y - this.game.camera.y, 1024, 768);
=======
		ctx.drawImage(this.spritesheet, 0, 0, PARAMS.TILE_WIDTH, PARAMS.TILE_WIDTH ,this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.TILE_WIDTH, PARAMS.TILE_WIDTH);
>>>>>>> marc_branch
	}
}