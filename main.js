var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/bgtile00.png");
ASSET_MANAGER.queueDownload("./assets/bgtile01.png");
ASSET_MANAGER.queueDownload("./assets/bgtile02.png");
ASSET_MANAGER.queueDownload("./assets/streetlight.png");
ASSET_MANAGER.queueDownload("./assets/streetlight02.png");
ASSET_MANAGER.queueDownload("./assets/fence.png");
ASSET_MANAGER.queueDownload("./assets/building.png");

ASSET_MANAGER.queueDownload("./assets/npcs.png");
ASSET_MANAGER.queueDownload("./assets/npccars.png");

ASSET_MANAGER.queueDownload("./assets/driver.png");
ASSET_MANAGER.queueDownload("./assets/drivercar.png");

ASSET_MANAGER.queueDownload("./assets/exhaustflame.png");
ASSET_MANAGER.queueDownload("./assets/health.PNG");

ASSET_MANAGER.queueDownload("./assets/exclamation.png");
ASSET_MANAGER.queueDownload("./assets/goal.png");
ASSET_MANAGER.queueDownload("./assets/arrow01.png");
ASSET_MANAGER.queueDownload("./assets/arrow02.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	// Background
	var bgTiles = [];
	for (var i = 0; i <= 4; i++) {
		for (var j = 0; j <= 4; j++) {
			if (i == 3 && j == 3) {
				bgTiles.push(new Background(gameEngine, i * PARAMS.TILE_WIDTH, j * PARAMS.TILE_WIDTH, 2));
			} else {
				bgTiles.push(new Background(gameEngine, i * PARAMS.TILE_WIDTH, j * PARAMS.TILE_WIDTH, 1));
			}
		}
	}
	
	// Goal Markers
	var goals = [];
	var shop = null;
	
	// Buildings
	var buildings = [];
	for (var k = 0; k < 5; k++) {
		for (var l = 0; l < 5; l++) {
			for (var i = 0; i < 20 ; i++) {
				if ( (i % 8 == 0) || (i % 8 == 2) ) {
					for (var j = 0; j < 20 ; j++) {
						if ( (j % 8 == 1) || (j % 8 == 2) ) {
							buildings.push(new Building (gameEngine, PARAMS.GRID_WIDTH * i + (PARAMS.TILE_WIDTH * k), PARAMS.GRID_WIDTH * j + (PARAMS.TILE_WIDTH * l)));
						}
					}
				}
			}
			if (k != l)goals.push(new GoalPost(gameEngine, PARAMS.GRID_WIDTH * 9 + (PARAMS.TILE_WIDTH * k), PARAMS.GRID_WIDTH * 8 + (PARAMS.TILE_WIDTH * l)));
			if (k == 3 && l == 3) {
				shop = new StartMission(gameEngine, PARAMS.GRID_WIDTH * 9 + (PARAMS.TILE_WIDTH * k), PARAMS.GRID_WIDTH * 8 + (PARAMS.TILE_WIDTH * l));
			}
		}
	}
	

	// NPCs
	var npccars = [];
	// List of possible starting points
	var starting = 0;
	var ending = (1280 * 5);

	// (StraightHorizontalLeft1) Y
	var SHL1 = [415, 925, 1695, 2205, 2975, 3485, 4255, 4765, 5535, 6045];

	//(StraightHorizontalRight1) Y
	var SHR1 = [350, 860, 1630, 2104, 2910, 3420, 3930, 4700, 5210, 5980];

	// (StraightVerticalUp2) X
	var SVU2 = [415, 925, 1695, 2205, 2975, 3485, 4255, 4765, 5535, 6045];

	// // (StraightVerticalDown2) X
	var STD2 = [350, 860, 1630, 2104, 2910, 3420, 3930, 4700, 5210, 5980];

	for (var i = 0; i < SHL1.length-1; i++) {
		npccars.push(new Car(gameEngine, starting, SHL1[i], Math.floor(Math.random() * 5), 0, 1));
		npccars.push(new Car(gameEngine, ending, SHR1[i], Math.floor(Math.random() * 5), 180, 1));
		npccars.push(new Car(gameEngine, SVU2[i], ending, Math.floor(Math.random() * 5), 180, 2));
		npccars.push(new Car(gameEngine, STD2[i], starting, Math.floor(Math.random() * 5), 0, 2));
	}


	// // (HorizontalToVerticalforward3) --> y = 480, 990, 1760, 2270, 3040, 3550
	// npccars.push(new Car(gameEngine, 0, 480, Math.floor(Math.random() * 5), 0, 3));
	// npccars.push(new Car(gameEngine, 0, 990, Math.floor(Math.random() * 5), 0, 3));
	// npccars.push(new Car(gameEngine, 0, 1760, Math.floor(Math.random() * 5), 0, 3));
	// npccars.push(new Car(gameEngine, 0, 2270, Math.floor(Math.random() * 5), 0, 3));
	// npccars.push(new Car(gameEngine, 0, 3040, Math.floor(Math.random() * 5), 0, 3));
	// npccars.push(new Car(gameEngine, 0, 3550, Math.floor(Math.random() * 5), 0, 3));
	// // // (HorizontalToVerticalbackward3) --> y = 285, 795, 1565, 2075, 2845, 3355
	// npccars.push(new Car(gameEngine, 3840, 285, Math.floor(Math.random() * 5), 180, 3));
	// npccars.push(new Car(gameEngine, 3840, 795, Math.floor(Math.random() * 5), 180, 3));
	// npccars.push(new Car(gameEngine, 3840, 1565, Math.floor(Math.random() * 5), 180, 3));
	// npccars.push(new Car(gameEngine, 3840, 2075, Math.floor(Math.random() * 5), 180, 3));
	// npccars.push(new Car(gameEngine, 3840, 2845, Math.floor(Math.random() * 5), 180, 3));
	// npccars.push(new Car(gameEngine, 3840, 3355, Math.floor(Math.random() * 5), 180, 3));
	// // // (VerticalToHorizontalDown4) --> X = 480, 990, 1760, 2270, 3040, 3550
	// npccars.push(new Car(gameEngine, 480, 0, Math.floor(Math.random() * 5), 180, 4));
	// npccars.push(new Car(gameEngine, 990, 0, Math.floor(Math.random() * 5), 180, 4));
	// npccars.push(new Car(gameEngine, 1760, 0, Math.floor(Math.random() * 5), 180, 4));
	// npccars.push(new Car(gameEngine, 2270, 0, Math.floor(Math.random() * 5), 180, 4));
	// npccars.push(new Car(gameEngine, 3040, 0, Math.floor(Math.random() * 5), 180, 4));
	// npccars.push(new Car(gameEngine, 3550, 0, Math.floor(Math.random() * 5), 180, 4));
	// // // (VerticalToHorizontalbackward4) --> X = 285, 795, 1565, 2075, 2845, 3355
	// npccars.push(new Car(gameEngine, 285, 3840, Math.floor(Math.random() * 5), 0, 4));
	// npccars.push(new Car(gameEngine, 795, 3840, Math.floor(Math.random() * 5), 0, 4));
	// npccars.push(new Car(gameEngine, 1565, 3840, Math.floor(Math.random() * 5), 0, 4));
	// npccars.push(new Car(gameEngine, 2075, 3840, Math.floor(Math.random() * 5), 0, 4));
	// npccars.push(new Car(gameEngine, 2845, 3840, Math.floor(Math.random() * 5), 0, 4));
	// npccars.push(new Car(gameEngine, 3355, 3840, Math.floor(Math.random() * 5), 0, 4));

	var npcs = [];
	var population = 10;//100 Anything larger than 20 stops the game somehow
	var i = 0;
	for (i = 0; i < population; i++) {
		var randomX = Math.floor(Math.random() * 3000) + 0;
		var randomY = Math.floor(Math.random() * 3000) + 0;
		var randomMovementPattern = Math.floor(Math.random() * 4) + 1;
		npcs.push(new Pedestrian(gameEngine, randomX, randomY, 1, 0, randomMovementPattern));
	}
	
	// Player
	var driver = new Driver(gameEngine, 1856, 2020, 270);
	var drivercar = new DriverCar(gameEngine, 1472, 2020, 0);
	
	var shopArrow = new Arrow(gameEngine, driver.x, driver.y, shop.x, shop.y, 0);
	gameEngine.shopArrow = shopArrow;

	///// Draw all entities 
	gameEngine.init(ctx);
	for (var i = 0; i < bgTiles.length; i++) {
		gameEngine.addEntity(bgTiles[i]);
	}
	for (var i = 0; i < goals.length; i++) {
		gameEngine.addEntity(goals[i]);
	}
	gameEngine.goals = goals;
	gameEngine.addEntity(shop);
	
	
	// NPCs
	for (var i = 0; i < npcs.length; i++)
	{
		gameEngine.addEntity(npcs[i]);
	}
	for (var i = 0; i < npccars.length; i++)
	{
		gameEngine.addEntity(npccars[i]);
	}
	
	// Player
	gameEngine.addEntity(driver);
	gameEngine.addEntity(drivercar);
	gameEngine.addEntity(shopArrow);
	
	// Obstacles
	for (var i = 0; i < buildings.length; i++) {
		gameEngine.addEntity(buildings[i]);
	}
	
	new SceneManager(gameEngine);
	new AudioManager(gameEngine);
	
	gameEngine.start();
});
