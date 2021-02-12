class Pedestrian {
	constructor(game, x, y, version, direction) {	// version is an integer in range 0 - 1
		// Constants
		this.RUN_SPEED = 1;
		this.PIVOT_SPEED = 3;
		this.WIDTH = 19;	// Square animation box, HEIGHT == WIDTH
		this.PAGE_WIDTH = 210;
		// Assign Object Variables
		Object.assign(this, { game, x, y });
		this.direction = direction; // 0 - 359, with 0 = right 
		this.version = version;
		this.dead = false;
		this.left = false;
		this.right = false;
		this.forward = false;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/npcs.png");
		
		// Animations
		 this.standing = new AngleAnimator(this.spritesheet,
		 0, this.version * this.WIDTH,
		 	this.WIDTH, this.WIDTH, 12, 0.3, 0, this.direction, false, true);	// Standing
		 this.walking = new AngleAnimator(this.spritesheet,
		 228, this.version * this.WIDTH,
		 	this.WIDTH, this.WIDTH, 8, 0.3, 0, this.direction, false, true);	// Walking
		
		// TODO AI
		this.forward = true;
		var that = this;
		setTimeout(function () {
			that.right = true;
			console.log("ped start turning");
		}, 5200)
		setTimeout(function () {
			that.right = false;
			console.log("ped stop turning");
		}, 5700)
		setTimeout(function () {
			that.forward = false;
			console.log("ped stop walking");
		}, 8500)
		// END TODO
	};
	
	update() {
		// Turning
		if (this.left) {
			this.direction -= this.PIVOT_SPEED;
		} else if (this.right) {
			this.direction += this.PIVOT_SPEED;
		}
		// Normalize to range integers 0-359
		this.direction = (Math.floor(this.direction) % 360 + 360) % 360;
		
		// Movement
		if (this.forward) {
				this.x += (this.RUN_SPEED * Math.cos((Math.PI / 180) * this.direction));
				this.y += (this.RUN_SPEED * Math.sin((Math.PI / 180) * this.direction));
			}
		
		// Update bounding box
		this.updateBB();
		
		// death
		if (this.dead) {
			this.removeFromWorld = true;
		}
		
		// Collision
		var that = this;
		this.game.entities.forEach(function (entity) {
			if (entity.BB && that.BB.collide(entity.BB)) {
				// do stuff
			};
		});
	};
	
	updateBB(){
		this.BB = new BoundingBox(this.x, this.y, this.WIDTH, this.WIDTH);
	};
	
	draw(ctx) {
		if (this.forward){
			this.walking.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		} else {
			this.standing.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		}
		
		if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x - (this.WIDTH / 2), this.y - this.game.camera.y - (this.WIDTH / 2), this.BB.width, this.BB.height);
        }
	};
};


class Car {
	constructor(game, x, y, version, direction, movePattern) {	// version is an integer in range 0 - 5
		// Constants
		this.ACCELERATION = 0.1;
		this.FRICTION = 0.5;
		this.MAX_SPEED = 4;
		this.TURN_SPEED = 2;
		this.WIDTH = 70;
		this.HEIGHT = 64;
		this.PAGE_WIDTH = 210;
		this.BB_WIDTH = 60;
		this.BB_HEIGHT = 36;
		this.DRAG = 0.1;
		this.movePattern = movePattern;
		this.originX = x;
		this.originY = y;
		
		// Assign Object Variables
		Object.assign(this, { game, x, y });
		this.direction = direction; // 0 - 359, with 0 = right 
		this.currentSpeed = 0;
		this.forward = false;
		this.left = false;
		this.right = false;
		this.isBackwards = (this.direction == 180);
		
		this.version = version;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/npccars.png");
		
		this.driving = new AngleAnimator(this.spritesheet,
			(this.version * this.WIDTH) % this.PAGE_WIDTH, Math.floor((this.version * this.WIDTH) / this.PAGE_WIDTH) * this.HEIGHT,
			this.WIDTH, this.HEIGHT, 1, 1, 1, this.direction, false, true);		// Driving
		
		// TODO AI decisions for driving.
		// Movements
		if (this.movePattern == 1) {
			this.straightHorizontal();
		} else if (this.movePattern == 2) {
			this.straightVertical();
		} else if (this.movePattern == 3) {
			this.horizontalToVertical();
		} else if (this.movePattern == 4) {
			this.verticalToHorizontal();
		}
		// END TODO
		
		// Initialize bounding box
		this.updateBB();
	};
	
	updateBB(){
		this.BB = new AngleBoundingBox(this.x, this.y, this.BB_WIDTH, this.BB_HEIGHT, this.direction);
	}
	
	update() {
		this.updateCar();

		if (this.forward) {
			// Acceleration/Deceleration
			if (this.currentSpeed < this.MAX_SPEED) {	// Normal Acceleration
				this.currentSpeed += this.ACCELERATION;
			} else if (this.currentSpeed > this.MAX_SPEED){ // Overspeeding
				this.currentSpeed -= this.ACCELERATION / 2;
			} else {
				this.currentSpeed = this.MAX_SPEED;
			}
			
			// Turning
			if (this.left) {			// Turning Left
				this.direction -= (this.TURN_SPEED) * ((this.currentSpeed + 2) / this.MAX_SPEED); // +2 turns sharper
			} else if (this.right) {	// Turning Right
				this.direction += (this.TURN_SPEED) * ((this.currentSpeed + 2) / this.MAX_SPEED); // +2 turns sharper
			}
		} else if (this.currentSpeed >= this.DRAG){		// Drag
			this.currentSpeed -= this.DRAG;
		} else if (this.currentSpeed <= -this.DRAG){
			this.currentSpeed += this.DRAG;
		} else {
			this.currentSpeed = 0;
		}
		
		// Normalize to range integers 0-359
		this.direction = (Math.floor(this.direction) % 360 + 360) % 360;
		
		// Movement
		this.x += (this.currentSpeed * Math.cos((Math.PI / 180) * this.direction));
		this.y += (this.currentSpeed * Math.sin((Math.PI / 180)	 * this.direction));

		// Update bounding box
		this.updateBB();
		
		// Collision
		var that = this;
		this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
				if (entity instanceof Pedestrian) { // squish pedestrians
						entity.dead = true;
				}
			};
		});
	};
	
	draw(ctx) {
		this.driving.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		
		//ctx.drawImage(this.spritesheet,
		//(this.version * this.WIDTH) % this.PAGE_WIDTH, Math.floor((this.version * this.WIDTH) / this.PAGE_WIDTH) * this.HEIGHT,
		//this.WIDTH, this.HEIGHT, this.x - this.game.camera.x - (this.WIDTH / 2), this.y - this.game.camera.y - (this.HEIGHT / 2), 70, 64);
		// this.idling.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		
		if (PARAMS.DEBUG) {
			// Draw 4 Bounding Box points to represent corners
			ctx.strokeStyle = 'Red';
			for (var i = 0; i < this.BB.points.length; i++) {
				ctx.beginPath();
				ctx.moveTo(this.BB.points[i].x - this.game.camera.x, this.BB.points[i].y - this.game.camera.y);
				ctx.lineTo(this.BB.points[(i-1 + 4) % 4].x - this.game.camera.x, this.BB.points[(i-1 + 4) % 4].y - this.game.camera.y);
				ctx.stroke();
			}
        }
	};

	straightHorizontal() {
		this.forward = true;
	}

	straightVertical() {
		if (this.direction == 0) {
			this.direction = 90;
		} else if (this.direction == 180) {
			this.direction = 270;
		}
		this.forward = true;
	}

	horizontalToVertical() {

		var isBackwards = false;
		if (this.direction == 180) {
			isBackwards = true;
		}

		var turningPointsX = [1200, 3350, 6550, 8700, 11900, 14050];
		var randomIndex = Math.floor(Math.random() * turningPointsX.length);
		var randomPoint = turningPointsX[randomIndex];

		this.forward = true;
		var that = this;
		var travelTime = randomPoint;	
		var turningTime = travelTime + 600;
		setTimeout(function () {
			that.right = true;
		}, travelTime)
		setTimeout(function () {
			if (isBackwards) {
				that.right = false;
				that.direction = 270;
			 } else {
				that.right = false;
				that.direction = 90;
			 }
			//that.direction = 90;
		}, turningTime)
	}

	verticalToHorizontal() {

		var turningPointsY = [1200, 3350, 6550, 8700, 11900, 14050];
		var randomIndex = Math.floor(Math.random() * turningPointsY.length);
		var randomPoint = turningPointsY[randomIndex];

		if (this.isBackwards) {
			this.direction = 90;
		} else {
			this.direction = 270;
		}
		//this.direction = 270;
		this.forward = true;

		var that = this;
		var travelTime = randomPoint;	
		var turningTime = travelTime + 600;

		var that = this;
		setTimeout(function () {
			that.right = true;
		}, travelTime) //500
		setTimeout(function () {
			if (that.isBackwards) {
				that.right = false;
				that.direction = 180;
			 } else {
				that.right = false;
				that.direction = 0;
			 }
			// that.right = false;
			// that.direction = 360;
		}, turningTime)
	}

	generateRandomVersion() {
		var random = Math.floor(Math.random() * 5);
		console.log(this.version);
		this.version = random;
	}

	updateCar() {
		var backgroundWidth = 1280 * 3;
		var backgroundHeight = 1280 * 3;
		if (this.movePattern == 1) {
			if (this.direction == 0) {
				if (this.x >= backgroundWidth) {
					this.x = 0;
				}
			}
			if (this.direction == 180) {
				if (this.x < 0) {
					this.x = backgroundWidth;
				}
			}
		} else if (this.movePattern == 2) {
			if (this.direction == 90) {	//previously 0
				if (this.y > backgroundHeight) {
					this.y = 0;
				}
			}
			if (this.direction == 270) { //reviously 180
				if (this.y < 0) {
					this.y = backgroundHeight;
				}
			}

		} else if (this.movePattern == 3) {

			if (this.isBackwards) {
				if (this.y < 0) {
					console.log("HEY I AM LESS THAN ZERO");
					this.direction = 180;
					this.x = this.originX + this.WIDTH + 15;
					this.y = this.originY;
					this.generateRandomVersion();
			 		this.horizontalToVertical();
				}
			} else {
				if (this.y > backgroundHeight) {
					this.direction = 0;
					this.x = this.originX - this.WIDTH - 10;
					this.y = this.originY;
					this.generateRandomVersion();
			 		this.horizontalToVertical();
				}
			}

		} else if (this.movePattern == 4) {

			if (this.isBackwards) {
				if (this.x < 0) {
					this.direction = 90;
					this.x = this.originX;
					this.y = this.originY - this.HEIGHT - 20;
					this.generateRandomVersion();
					this.verticalToHorizontal();
				}
			} else {
				if (this.x > backgroundWidth) {
					this.direction = 270;
					this.x = this.originX;
					this.y = this.originY + this.HEIGHT + 20;
					this.generateRandomVersion();
					this.verticalToHorizontal();
				}
			}
		}
	}

	// horizontalToVertical() {
	// 	this.forward = true;
	// 	var that = this;
	// 	if (that.x >= 210) {
	// 		that.right = true;
	// 	}
	// 	if (that.direction >= 89) {
	// 		that.direction = 90
	// 		that.right = false;
	// 	}
	// }

	// horizontalToVertical() {
	// 	this.forward = true;
	// 	var that = this;
	// 	setTimeout(function () {
	// 		that.right = true;
	// 	}, 829.96)	//800 // 829.96
	// 	setTimeout(function () {
	// 		that.right = false;
	// 	}, 1390) //1700
	// 	// setTimeout(function () {
	// 	// 	that.forward = false;
	// 	// 	console.log("stop driving");
	// 	// }, 5500)
	// }

	// verticalToHorizontal() {
	// 	this.direction = 270
	// 	this.forward = true;
	// 	var that = this;
	// 	if (that.y <= 600) {
	// 		//this.forward = false;
	// 		this.right = true;
	// 	}
	// 	// if (that.direction >= 89) {
	// 	// 	that.direction = 90
	// 	// 	that.right = false;
	// 	// }
	// }
};
