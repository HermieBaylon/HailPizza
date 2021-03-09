class HealthBar{
	constructor( agent ) {
		Object.assign(this, { agent });
		// TODO
		this.spritesheet = ASSET_MANAGER.getAsset("./assets/health.PNG");
	};

	update(){
	};

    draw(ctx){

        ctx.drawImage(this.spritesheet, 6 * this.agent.healthPoint, 544, 78.5, 43, 10, 10, 150, 20);
    }
};

// class Minimap extends Entity {
// 	constructor(game, x, y, width) {
// 		super(game, x, y);
// 		this.width = width;
// 	};

// 	draw(context) {
// 		const SCALE = 16;
// 		const PIP_SIDE_LEN = 4;

// 		context.save();
// 		context.strokeStyle = "black";
// 		context.lineWidth = 3;
// 		context.strokeRect(this.pos.x, this.pos.y, this.width, this.width);
// 		this.game.entities.forEach((entity) => {
// 			context.fillStyle = entity.mapPipColor;
// 			let x = this.pos.x + (entity.pos.x - this.game.camera.pos.x) / SCALE;
// 			let y = this.pos.y + (entity.pos.y - this.game.camera.pos.y) / SCALE;
// 			if (x > this.pos.x
// 				&& y > this.pos.y
// 				&& y < this.pos.y + this.width
// 				&& x < this.pos.x + this.width) {
// 				context.fillRect(x, y, PIP_SIDE_LEN, PIP_SIDE_LEN);
// 			}
// 		});
// 		context.restore();
// 	};

// 	/** @override */
// 	update(context) {
// 		// Do nothing
// 	}
// };
