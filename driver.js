class Driver {
	constructor(game, x, y) {
		// Constants
		this.RUN_SPEED = 3;
		this.PIVOT_SPEED = 3;
		this.JUMP_SPEED = 5;
		this.WIDTH = 19;	// Square animation box, HEIGHT == WIDTH
		// Assign Object Variables
		Object.assign(this, { game, x, y });
		this.direction = 0; // 0 - 359, with 0 = right 
		this.active = true;
		this.jumpFlag = false;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/driver.png");
		
		// Animations
		this.standing = new AngleAnimator(this.spritesheet, 0, 21,
			this.WIDTH, this.WIDTH, 5, 0.3, 1, this.direction, false, true);	// Standing
		this.running = new AngleAnimator(this.spritesheet, 0, 0,
			this.WIDTH, this.WIDTH, 12, 0.05, 1, this.direction, false, true);	// Running
		this.jumping = new AngleAnimator(this.spritesheet, 0, 0,
			this.WIDTH, this.WIDTH, 12, 0.7, 1, this.direction, false, true);	// Jumping
			
		// Assign initial focus
		this.game.player = this;
		
	};
	
	update() {
		if (!this.game.enterexit){
			this.active = true;
		} else {
			this.active = false;
		}
		if (this.active) {
			// Affirm focus
			this.game.player = this;
			
			// Jumping
			var that = this;
			if (this.game.space && !this.jumpFlag) {
				this.jumpFlag = true;
				setTimeout(function () {
					that.jumpFlag = false;
					console.log('Jump End');
				}, 300)
			}
			
			// Turning
			if (this.game.left && !this.jumpFlag) {
				this.direction -= this.PIVOT_SPEED;
			} else if (this.game.right && !this.jumpFlag) {
				this.direction += this.PIVOT_SPEED;
			}
			// Normalize to range integers 0-359
			this.direction = (Math.floor(this.direction) % 360 + 360) % 360;
			// Movement
			if(this.jumpFlag){
				this.x += (this.JUMP_SPEED * Math.cos((Math.PI / 180) * this.direction));
				this.y += (this.JUMP_SPEED * Math.sin((Math.PI / 180) * this.direction));
			} else if (this.game.forward) {
				this.x += (this.RUN_SPEED * Math.cos((Math.PI / 180) * this.direction));
				this.y += (this.RUN_SPEED * Math.sin((Math.PI / 180) * this.direction));
			} else if (this.game.backward) {
				this.x -= ((this.RUN_SPEED / 2) * Math.cos((Math.PI / 180) * this.direction));
				this.y -= ((this.RUN_SPEED / 2) * Math.sin((Math.PI / 180) * this.direction));
			}
			
		}
	};
	
	draw(ctx) {
		if ((this.game.forward || this.game.backward) && this.active){
			this.running.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		} else if (this.jumpFlag) {
			this.jumping.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.2);
		} else {
			this.standing.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		}
	};
};
