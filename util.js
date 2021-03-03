// returns a random integer between 0 and n-1
function randomInt(n) {
    return Math.floor(Math.random() * n);
};

// returns a string that can be used as a rgb web color
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
};

// creates an alias for requestAnimationFrame for backwards compatibility
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// Collision Sub-Fuctions
function vehicleToBuilding(vehicle, building) {
	let buffer = 4;
	let angle = 0;
	let vertOffset = Math.abs(vehicle.BB.bottom.y - vehicle.BB.top.y) / 2 + buffer;
	let horiOffset = Math.abs(vehicle.BB.right.x - vehicle.BB.left.x) / 2 + buffer;
	if (building.BB.top < vehicle.BB.bottom.y && building.BB.top > vehicle.y) {
		angle = 270;
		vehicle.y = building.BB.top - vertOffset;
	};
	if (building.BB.bottom > vehicle.BB.top.y && building.BB.bottom < vehicle.y) {
		angle = 90;
		vehicle.y = building.BB.bottom + vertOffset;
	};
	if (building.BB.left < vehicle.BB.right.x && building.BB.left > vehicle.x) {
		angle = 180;
		vehicle.x = building.BB.left - horiOffset;
	};
	if (building.BB.right > vehicle.BB.left.x && building.BB.right < vehicle.x) {
		angle = 0;
		vehicle.x = building.BB.right + horiOffset;
	};
	
	// Calculate center to center angle
	/*let angle = Math.atan( Math.abs(building.y - vehicle.y) / Math.abs(building.x - vehicle.x) ) * (180 / Math.PI);
	if (building.x - vehicle.x >= 0 && building.y - vehicle.y >= 0) angle = (angle % 90); //Q1
	if (building.x - vehicle.x <  0 && building.y - vehicle.y >= 0) angle = 180 - (angle % 90); //Q2
	if (building.x - vehicle.x <  0 && building.y - vehicle.y <  0) angle = 180 + (angle % 90); //Q3
	if (building.x - vehicle.x >= 0 && building.y - vehicle.y <  0) angle = 360 - (angle % 90); //Q4
	*/
	// Push
	vehicle.pushSpeed = Math.max(vehicle.currentSpeed / 2, vehicle.MAX_SPEED / 4);
	vehicle.pushDirection = angle;
	// Halt movement
	vehicle.driftSpeed = 0;
	vehicle.currentSpeed = 0;
}

function vehicleToVehicle(vehicle, oth) {
	// Calculate center to center angle
		let angle = Math.atan( Math.abs(oth.y - vehicle.y) / Math.abs(oth.x - vehicle.x) ) * (180 / Math.PI);
		let spin = 3;
		if (Math.abs(angle) < 30) spin = 1;
		if (oth.x - vehicle.x >= 0 && oth.y - vehicle.y >= 0) angle = (angle % 90); //Q1
		if (oth.x - vehicle.x <  0 && oth.y - vehicle.y >= 0) {angle = 180 - (angle % 90); //Q2
			spin = -spin;}
		if (oth.x - vehicle.x <  0 && oth.y - vehicle.y <  0) angle = 180 + (angle % 90); //Q3
		if (oth.x - vehicle.x >= 0 && oth.y - vehicle.y <  0) {angle = 360 - (angle % 90); //Q4
			spin = -spin;}
		// Stop drivercar
		vehicle.currentSpeed = 0;
		vehicle.driftSpeed = 0;
		// push car
		oth.pushSpeed = Math.max(vehicle.currentSpeed, 10 * vehicle.DRAG) / 2;
		oth.pushDirection = angle;
		oth.spinSpeed = spin;
}

// global parameters
const PARAMS = {
	DEBUG: true,
	AUDIO: true,
	PAGE_WIDTH: 1024,
	PAGE_HEIGHT: 768,
	TILE_WIDTH: 1280,
	MAP_WIDTH: 6400,
	MAP_HEIGHT: 6400,
	X_AXIS: 0,
	Y_AXIS: 270,
	GRID_WIDTH: 64
};
