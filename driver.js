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
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/driver.png");
		
		// Animations
		this.standing = new AngleAnimator(this.spritesheet, 0, 21,
			this.WIDTH, this.WIDTH, 5, 0.3, 1, this.direction, false, true);	// Standing
		this.running = new AngleAnimator(this.spritesheet, 0, 0,
			this.WIDTH, this.WIDTH, 12, 0.05, 1, this.direction, false, true);	// Running
		this.jumping = new AngleAnimator(this.spritesheet, 0, 21,
			this.WIDTH, this.WIDTH, 5, 0.3, 1, this.direction, false, true);	// Jumping
	};
	
	update() {
		if (!this.game.enterexit){
			this.active = true;
		} else {
			this.active = false;
		}
		if (this.active) {
			// Turning
			if (this.game.left) {
				this.direction -= this.PIVOT_SPEED;
				if (this.direction < 0) {	// Correct to range of 0 - 359
					this.direction += 360;
				}
			} else if (this.game.right) {
				this.direction += this.PIVOT_SPEED;
				if (this.direction > 359) {	// Correct to range of 0 - 359
					this.direction -= 360;
				}
			}
			// Movement
			if (this.game.forward) {
				this.x += (this.RUN_SPEED * Math.cos((Math.PI / 180) * this.direction));
				this.y += (this.RUN_SPEED * Math.sin((Math.PI / 180) * this.direction));
			} else if (this.game.backward) {
				this.x -= ((this.RUN_SPEED / 2) * Math.cos((Math.PI / 180) * this.direction));
				this.y -= ((this.RUN_SPEED / 2) * Math.sin((Math.PI / 180) * this.direction));
			}
			// Jump
			if(this.game.jump){
				this.x += (this.JUMP_SPEED * Math.cos((Math.PI / 180) * this.direction));
				this.y += (this.JUMP_SPEED * Math.sin((Math.PI / 180) * this.direction));
			}
		}
	};
	
	draw(ctx) {
		if ((this.game.forward || this.game.backward) && this.active){
			this.running.drawFrame(this.game.clockTick, this.direction, ctx, this.x, this.y, 1);
		} else {
			this.standing.drawFrame(this.game.clockTick, this.direction, ctx, this.x, this.y, 1);
		}
	};
};
