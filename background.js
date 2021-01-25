class Background {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/bgproto.png");
	}
	
	update() {
		//
	}
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0, 1024, 768 ,0, 0, 1024, 768);
	}
}