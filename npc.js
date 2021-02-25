class Pedestrian {
	constructor(game, x, y, version, direction, movePattern) {	// version is an integer in range 0 - 1
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
		this.movePattern = movePattern;
		this.isBackwards = (direction == 180);
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/npcs.png");
		
		// Animations
		 this.standing = new AngleAnimator(this.spritesheet,
		 0, this.version * this.WIDTH,
		 	this.WIDTH, this.WIDTH, 12, 0.3, 0, this.direction, false, true);	// Standing
		 this.walking = new AngleAnimator(this.spritesheet,
		 228, this.version * this.WIDTH,
		 	this.WIDTH, this.WIDTH, 8, 0.3, 0, this.direction, false, true);	// Walking
		 this.corpse = new AngleAnimator(this.spritesheet,
		 380, this.version * this.WIDTH,
		 	this.WIDTH, this.WIDTH, 1, 1, 0, this.direction, false, true);	// Corpse
		
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
	};
	
	update() {

		this.updatePedestrian();
		if (!this.dead) {
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
		}
		
		// Update bounding box
		this.updateBB();
		
		// death
		if (this.dead) {
			//this.removeFromWorld = true;
		}
		
		// Collision
		var that = this;
		this.game.entities.forEach(function (entity) {
			if (entity.BB && that.BB.collide(entity.BB)) {
				if (entity instanceof Building || entity instanceof ModularBuilding) {	// hit building
					if (entity.BB.top < that.BB.bottom && entity.BB.top > that.y) that.y = entity.BB.top - that.WIDTH / 2;
					if (entity.BB.bottom > that.BB.top && entity.BB.bottom < that.y) that.y = entity.BB.bottom + that.WIDTH / 2;
					if (entity.BB.left < that.BB.right && entity.BB.left > that.x) that.x = entity.BB.left - that.WIDTH / 2;
					if (entity.BB.right > that.BB.left && entity.BB.right < that.x) that.x = entity.BB.right + that.WIDTH / 2;
				}
			};
		});
	};
	
	updateBB(){
		this.BB = new BoundingBox(this.x - this.WIDTH / 2, this.y - this.WIDTH / 2, this.WIDTH, this.WIDTH);
		this.nextBB = new BoundingBox(this.x + (this.WIDTH * Math.cos((Math.PI / 180) * this.direction)) - this.WIDTH / 2,
											this.y + (this.WIDTH * Math.sin((Math.PI / 180) * this.direction)) - this.WIDTH / 2,
											this.WIDTH, this.WIDTH);
	};
	
	draw(ctx) {
		if (this.dead) {
			this.corpse.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);	
		} else if (this.forward){
			this.walking.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		} else {
			this.standing.drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		}
		
		if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
			ctx.strokeStyle = 'Blue';
			ctx.strokeRect(this.nextBB.x - this.game.camera.x, this.nextBB.y - this.game.camera.y, this.nextBB.width, this.nextBB.height);
			
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
		var random = Math.floor(Math.random() * 2);
		//console.log(this.version);
		this.version = random;
	}
	
	updatePedestrian() {
		var backgroundWidth = 1280 * 5;
		var backgroundHeight = 1280 * 5;
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
					//console.log("HEY I AM LESS THAN ZERO");
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
	
};


class Car {
	constructor(game, x, y, version, direction, movePattern) {	// version is an integer in range 0 - 5
		// Constants
		this.NUM_VERSIONS = 6;
		this.ACCELERATION = 0.1;
		this.FRICTION = 0.8;
		this.MAX_SPEED = 3;
		this.TURN_SPEED = 2;
		this.WIDTH = 70;
		this.HEIGHT = PARAMS.GRID_WIDTH;
		this.PAGE_WIDTH = 210;
		this.BB_WIDTH = 60;
		this.BB_HEIGHT = 36;
		this.DRAG = 0.1;
		this.PUSH_DRAG = this.DRAG * 2;
		this.MAX_SPIN_SPEED = this.TURN_SPEED * 2;
		this.SPIN_DRAG = this.DRAG * 5;

		this.movePattern = movePattern;
		this.originX = x;
		this.originY = y;
		this.originDirection = direction;
		
		// Assign Object Variables
		Object.assign(this, { game, x, y });
		this.direction = direction; // 0 - 359, with 0 = right
		this.goalDirection = direction;
		this.currentSpeed = 0;
		this.spinSpeed = 0;
		this.forward = false;
		this.left = false;
		this.right = false;
		this.backward = false;
		this.isBackwards = (this.direction == 180);
		
		this.pushDirection = 0;
		this.pushSpeed = 0;
		
		this.version = version;
		
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/npccars.png");
		
		//this.driving = new AngleAnimator(this.spritesheet,
		//	(this.version * this.WIDTH) % this.PAGE_WIDTH, Math.floor((this.version * this.WIDTH) / this.PAGE_WIDTH) * this.HEIGHT,
		//	this.WIDTH, this.HEIGHT, 1, 1, 1, this.direction, false, true);
			
		// Create array of version animations
		this.driving = [];
		for (var i = 0; i < this.NUM_VERSIONS; i++) {
			this.driving.push(new AngleAnimator(this.spritesheet,
			(i * this.WIDTH) % this.PAGE_WIDTH, Math.floor((i * this.WIDTH) / this.PAGE_WIDTH) * this.HEIGHT,
			this.WIDTH, this.HEIGHT, 1, 1, 1, this.direction, false, true));
		}
		
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
		
		// Initialize bounding box
		this.updateBB();
		
		// Collision
		var that = this;
		this.game.entities.forEach(function (entity) {
			if (entity.BB && that.nextBB.collide(entity.BB)) {	// Action predictions
				if (entity instanceof DriverCar) {	// predict car, stop
					if (that.forward) {
						that.forward = false;
						that.backward = true;
						setTimeout(function () {
							that.backward = false;
							that.forward = true;
						}, 1500)
					}
				}
				if (entity instanceof Car) {	// predict pedestrian, stop
					if (that.forward) {
						that.forward = false;
						that.backward = true;
						setTimeout(function () {
							that.backward = false;
							that.forward = true;
						}, 1500)
					}
				}
			}
            if (entity.BB && that.BB.collide(entity.BB)) {
				//
			};
		});
	};
	
	updateBB(){
		this.BB = new AngleBoundingBox(this.x, this.y, this.BB_WIDTH, this.BB_HEIGHT, this.direction);
		this.nextBB = new AngleBoundingBox(this.x + (this.WIDTH * Math.cos((Math.PI / 180) * this.direction)),
											this.y + (this.WIDTH * Math.sin((Math.PI / 180) * this.direction)),
											this.BB_WIDTH, this.BB_HEIGHT, this.direction);
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
				this.direction -= (this.TURN_SPEED) * ((this.currentSpeed) / this.MAX_SPEED);
			} else if (this.right) {	// Turning Right
				this.direction += (this.TURN_SPEED) * ((this.currentSpeed) / this.MAX_SPEED);
			}
		} else if (this.backward) {
			if (this.currentSpeed > -this.MAX_SPEED) {	// Normal Acceleration
				this.currentSpeed -= this.ACCELERATION;
			} else if (this.currentSpeed < this.MAX_SPEED){ // Overspeeding
				this.currentSpeed += this.ACCELERATION / 2;
			} else {
				this.currentSpeed = -this.MAX_SPEED;
			}
		} else if (this.currentSpeed >= this.DRAG){		// Drag
			this.currentSpeed -= this.DRAG;
		} else if (this.currentSpeed <= -this.DRAG){
			this.currentSpeed += this.DRAG;
		} else {
			this.currentSpeed = 0;
		}
		
		// Handle spinning
		if (this.spinSpeed !== 0) {
			this.direction += this.spinSpeed;
			this.spinSpeed = Math.sign(this.spinSpeed) * (Math.abs(this.spinSpeed) - this.SPIN_DRAG);
			if (Math.abs(this.spinSpeed) < 2) this.spinSpeed = 0;
		}
		
		// Normalize to range integers 0-359
		this.direction = (Math.floor(this.direction) % 360 + 360) % 360;
		this.pushDirection = (Math.floor(this.pushDirection) % 360 + 360) % 360;
		
		// Movement
		this.x += (this.currentSpeed * Math.cos((Math.PI / 180) * this.direction));
		this.y += (this.currentSpeed * Math.sin((Math.PI / 180) * this.direction));
		
		// Handle pushes
		if (this.pushSpeed >= this.DRAG){
			this.pushSpeed -= this.DRAG;
		} else if (this.pushSpeed <= -this.DRAG){
			this.pushSpeed += this.DRAG;
		} else {
			this.pushSpeed = 0;
		}
		this.x += (this.pushSpeed * Math.cos((Math.PI / 180) * this.pushDirection));
		this.y += (this.pushSpeed * Math.sin((Math.PI / 180) * this.pushDirection));
		
		// Update bounding box
		 this.updateBB();
		
		// // Collision
		var that = this;
		this.resumeFlag = true;
		this.game.entities.forEach(function (entity) {
			if (entity.BB && that.nextBB.collide(entity.BB)) {	// Action predictions
				if (entity instanceof DriverCar) {	// predict car, stop
					if (that.forward) {
						that.forward = false;
						that.resumeFlag = false;
					}
				}
			}
            if (entity.BB && that.BB.collide(entity.BB)) {	// Collisions
				if (entity instanceof Intersection && that.seen != entity) { // turn at intersections
					that.seen = entity;
					if (Math.random() > 0.5) that.goalDirection = entity.direction;	// Random chance to turn. Otherwise, ignores this intersection and logs it briefly.
					setTimeout(function () {
						that.seen = null;
					}, 5000);
				}
				if (entity instanceof Pedestrian) { // squish pedestrians
						entity.dead = true;
						setTimeout(function () {
							entity.removeFromWorld = true;
						}, 30000);
				}
				if (entity instanceof DriverCar) { // car stops if drivercar is blocking
					vehicleToVehicle(that, entity);
				}
				if (entity instanceof Building || entity instanceof ModularBuilding) {	// hit building
					vehicleToBuilding(that, entity);
					if (that.forward) {
						that.forward = false;
						that.resumeFlag = false;
					}
				}
				if (entity instanceof Car && entity !== that) {	// hit car
					vehicleToVehicle(that, entity);
				}
			};
		});
		if (this.resumeFlag) this.forward = true;	// TODO make resumeFlag wait a short period, possibly set a game timer to do this. desired effect is for the car to stop and think before resuming.
		
		this.updateDirection();
	};
	
	draw(ctx) {
		this.driving[this.version].drawFrame(this.game.clockTick, this.direction, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
		
		if (PARAMS.DEBUG) {
			// Draw 4 Bounding Box points to represent corners
			ctx.strokeStyle = 'Red';
			for (var i = 0; i < this.BB.points.length; i++) {
				ctx.beginPath();
				ctx.moveTo(this.BB.points[i].x - this.game.camera.x, this.BB.points[i].y - this.game.camera.y);
				ctx.lineTo(this.BB.points[(i-1 + 4) % 4].x - this.game.camera.x, this.BB.points[(i-1 + 4) % 4].y - this.game.camera.y);
				ctx.stroke();
			}
			ctx.strokeStyle = 'Blue';
			ctx.beginPath();
			ctx.moveTo(this.nextBB.points[0].x - this.game.camera.x, this.nextBB.points[0].y - this.game.camera.y);
			ctx.lineTo(this.nextBB.points[3].x - this.game.camera.x, this.nextBB.points[3].y - this.game.camera.y);
			ctx.stroke();
        }
	};
	
	// Marc Begin
	// sub-method that makes sure the vehicle is heading towards the given goal direction set to the object. Called only in update().
	updateDirection() {
		let tolerance = this.TURN_SPEED;
		let tempDir = this.direction;
		if (this.direction - this.goalDirection > 180) tempDir = this.direction - 360;
		// if direction is left of goalDirection by 180 or less
		if (tempDir < this.goalDirection) {
			this.left = false;
			this.right = true;
		}
		if (this.direction - this.goalDirection < -180) tempDir = this.direction + 360;
		// if direction is right of goalDirection by 179 or less
		if (tempDir > this.goalDirection) {
			this.left = true;
			this.right = false;
		}
		// if direction is close enough, autocorrect and stop turns
		if (Math.abs(this.direction - this.goalDirection) < tolerance) {
			this.direciton = this.goalDirection;
			this.left = false;
			this.right = false;
		}
	};
	
	// Marc End
	
	// TODO reevaluate the need for movement patterns as movement is now determined by intersections on the fly.
	straightHorizontal() {
		this.goalDirection = this.direction;
		this.forward = true;
		this.direction = this.originDirection;
	}

	straightVertical() {
		if (this.originDirection == 0) {
			this.direction = 90;
		} else if (this.originDirection == 180) {
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
		this.version = random;
	}
	
	// TODO This should respawn cars that go out of bounds instead to a random streets location. You can access this by this.game.streets;
	//		this.game.streets is an array of Point objects of coordinates for where to spawn. For example,  this.game.streets[3].x;		 -MP
	updateCar() {
		var backgroundWidth = 1280 * 5;
		var backgroundHeight = 1280 * 5;
		var out = 20;	

		var isOutOfMap = this.x > backgroundWidth + out || this.x < 0 - out ||
						 this.y > backgroundHeight + out || this.y < 0 - out;

		if (isOutOfMap) {
			if (this.movePattern == 1) {
				this.straightHorizontal();
			} else if (this.movePattern == 2) {
				this.straightVertical();
			} else if (this.movePattern == 3) {
				this.horizontalToVertical();
			} else if (this.movePattern == 4) {
				this.verticalToHorizontal();
			}
			this.x = this.originX;
			this.y = this.originY;
		}

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
			if (this.direction == 90) {
				if (this.y > backgroundHeight) {
					this.y = 0;
				}
			}
			if (this.direction == 270) {
				if (this.y < 0) {
					this.y = backgroundHeight;
				}
			}

		} else if (this.movePattern == 3) {

			if (this.isBackwards) {
				if (this.y < 0) {
					//console.log("HEY I AM LESS THAN ZERO");
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

};
