class Pedestrian {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/pedestrian01.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0, 19, 19, this.x, this.y, 19, 19);
	};
};

class Car {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/car01.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0, 70, 64, this.x, this.y, 70, 64);
	};
};