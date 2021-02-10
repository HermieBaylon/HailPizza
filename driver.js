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
		
		// Initialize bounding box
		this.updateBB();
		
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
	
	updateBB(){
		this.BB = new BoundingBox(this.x, this.y, this.WIDTH, this.WIDTH);
	}
	
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
		
			// Update bounding box
			this.updateBB();
		}
		
		// Collision
		var that = this;
		this.game.entities.forEach(function (entity) {
			if (entity.BB && that.BB.collide(entity.BB)) {
				if (entity instanceof Building) {	// hit building
					if(that.jumpFlag){
						that.jumpFlag = false;
						that.x -= (that.JUMP_SPEED * Math.cos((Math.PI / 180) * that.direction));
						that.y -= (that.JUMP_SPEED * Math.sin((Math.PI / 180) * that.direction));
					} else if (that.game.forward) {
						that.x -= (that.RUN_SPEED * Math.cos((Math.PI / 180) * that.direction));
						that.y -= (that.RUN_SPEED * Math.sin((Math.PI / 180) * that.direction));
					}
					console.log("boom");
				}
				if (entity instanceof Pedestrian) {	// push npc
					// face npc away
					// move him forward
					console.log("move, foo");
				}
			};
		});
	};
	
	draw(ctx) {
		if ((this.game.forward || this.game.backward) && this.active){
			this.running.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		} else if (this.jumpFlag) {
			this.jumping.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.2);
		} else {
			this.standing.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		}
		
		if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x - (this.WIDTH / 2), this.BB.y - this.game.camera.y - (this.WIDTH / 2), this.BB.width, this.BB.height);
        }
	};
};
