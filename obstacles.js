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

class House1 {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/buildings/house1.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 23, 18, 465, 322, this.x, this.y, 465*.35, 322*.35);
	};
};

class House2 {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/buildings/house2.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0, 465, 512, this.x, this.y, 186, 204.8);
	};
};

class House3 {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/buildings/house3.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 45, 16, 411, 348, this.x, this.y, 411*.3, 348*.3);
	};
};

class House4 {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/buildings/house4.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 34, 32, 421, 309, this.x, this.y, 421*.4, 309*.4);
	};
};

class House5 {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/buildings/house5.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 30, 421, 297, this.x, this.y, 421*.4, 297*.4);
	};
};

class House6 {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/buildings/house6.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 32, 421, 280, this.x, this.y, 421*.3, 280*.3);
	};
};

class House7 {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/buildings/house7.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0, 970, 824, this.x, this.y, 512*.8, 292*.8);
	};
};


class Pool {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/buildings/pool.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0, 396, 252, this.x, this.y, 396*.5, 252*.5);
	};
};


class Court {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/buildings/court.jpg");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0, 1300, 748, this.x, this.y, 1300 *.15, 748*.15);
	};
};

class Building {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/buildings/building.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 226, 0, 344, 816, this.x, this.y, 344 *.27, 816*.27);
	};
};

class Parasol {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/buildings/parasol.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0, 400, 400, this.x, this.y, 400*.22, 400*.22);
	};
};

class Bench {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/buildings/bench.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0, 1546, 539, this.x, this.y, 1546*.05, 539*.05);
	};
};

class Bench2 {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/buildings/bench2.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 0, 0, 1546, 539, this.x, this.y, 1546*.05, 539*.05);
	};
};

class Roof {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
		// TODO
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/buildings/roof.png");
	};
	
	update() {
		// TODO
	};
	
	draw(ctx) {
		ctx.drawImage(this.spritesheet, 103, 230, 556, 556, this.x, this.y, 556*.08, 556*.08);
	};
};