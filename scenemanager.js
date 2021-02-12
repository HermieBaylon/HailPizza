class SceneManager {
	constructor(game) {
		Object.assign(this, { game });
		
		this.game = game;
		this.game.camera = this;
		this.x = 0;
		this.y = 0;
		
		// HUD variables
		//this.life = 5;
		//this.totalLife = 5;
		//this.canTakeDamage = true;
		//this.spritesheet = ASSET_MANAGER.getAsset("./assets/health.PNG");
		//this.animations = [];
		
		// HUD animations
		//this.hud = new Animator(this.spritesheet, 37, 440,
			//this.WIDTH, this.WIDTH, 3, 0.3, 1, this.direction, false, true);
		//this.full = new Animator(this.spritesheet, 773, 113, 85, 480, 1, 0.3, 8, false, true); //full health
		//this.four = new Animator(this.spritesheet, 585, 113, 89, 480, 1, 0.3, 8, false, true); //four hp 
		//this.three = new Animator(this.spritesheet, 400, 113, 90, 480, 1, 0.3, 8, false, true); //three hp
		//this.two = new Animator(this.spritesheet, 217, 113, 86, 480, 1, 0.3, 8, false, true); // two hp
		//this.one = new Animator(this.spritesheet, 31, 113, 86, 480, 1, 0.3, 8, false, true); //one hp
		//this.loadAnimations();
		game.addEntity(new HealthBar(game, 10, 10));
		game.addEntity(this);
		
		
		// Effects
	}
	
	// loadAnimations() {
 //        this.animations[0] = [];
 //        this.animations[1] = [];
 //        this.animations[2] = [];
 //        this.animations[3] = [];
 //        this.animations[4] = [];

 //        // Animator(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop);

 //        // full health
 //        this.animations[0].push(new Animator(this.spritesheet, 773, 113, 85, 480, 1, 0.3, 8, false, true));

 //        // four hp
 //        this.animations[1].push(new Animator(this.spritesheet, 585, 113, 89, 480, 1, 0.3, 8, false, true));

 //        // three hp
 //        this.animations[2].push(new Animator(this.spritesheet, 400, 113, 90, 480, 1, 0.3, 8, false, true));

 //        // two hp
 //        this.animations[3].push(new Animator(this.spritesheet, 217, 113, 86, 480, 1, 0.3, 8, false, true));

 //        // one hp
 //        this.animations[4].push(new Animator(this.spritesheet, 31, 113, 86, 480, 1, 0.3, 8, false, true));

 //    }

	update() { // TODO replace with constants
		let xMidpoint = 1024 / 2 - 19 / 2;
		let yMidpoint = 768 / 2 - 19 / 2;
		
		this.x = this.game.player.x - xMidpoint;
		this.y = this.game.player.y - yMidpoint;
	}
	
	draw(ctx) {
		//ctx.drawImage(this.spritesheet, 38, 442, 332, 28, this.x - this.game.camera.x + 10, this.y - this.game.camera.y + 10, 200, 20);
		//this.full.drawFrame(this.game.clockTick,ctx, 7, 8, 0.3);
		//this.four.drawFrame(this.game.clockTick,ctx, 7, 8, 0.3);
		//this.three.drawFrame(this.game.clockTick,ctx, 7, 8, 0.3);
		//this.two.drawFrame(this.game.clockTick,ctx, 7, 8, 0.3);
		//this.one.drawFrame(this.game.clockTick,ctx, 7, 8, 0.3)
		
        if (PARAMS.DEBUG){
			let coordText = "(" + Math.floor(this.game.player.x) + ","
				+ Math.floor(this.game.player.y) + "); Facing " + this.game.player.direction;
			
			let coordText2 = "L:(" +  Math.floor(this.game.player.BB.left.x) + "," +  Math.floor(this.game.player.BB.left.y) + ")"
							+ "T:(" +  Math.floor(this.game.player.BB.top.x) + "," +  Math.floor(this.game.player.BB.top.y) + ")"
							+ "R:(" +  Math.floor(this.game.player.BB.right.x) + "," +  Math.floor(this.game.player.BB.right.y) + ")"
							+ "B:(" +  Math.floor(this.game.player.BB.bottom.x) + "," +  Math.floor(this.game.player.BB.bottom.y) + ")";
			
			ctx.strokeStyle = 'White';
			ctx.font = "30px Arial";
			ctx.strokeText(coordText, 50, 50);
			ctx.strokeText(coordText2, 50, 100);
			ctx.strokeStyle = 'Black';
			ctx.fillText(coordText, 50, 50);
			ctx.fillText(coordText2, 50, 100); // HUD text for checking bounding edges on driver car
		}
	}
};