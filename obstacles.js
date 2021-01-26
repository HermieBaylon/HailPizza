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
		ctx.drawImage(this.spritesheet, 0, 0, 25, 51, this.x, this.y, 25, 51);
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
		ctx.drawImage(this.spritesheet, 0, 0, 75, 14, this.x, this.y, 75, 14);
	};
};

/*
class Building {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/building01.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		// TODO
	};
};
*/