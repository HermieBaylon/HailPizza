var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/bgproto.png");
ASSET_MANAGER.queueDownload("./assets/driver.png");
ASSET_MANAGER.queueDownload("./assets/drivercar.png");
ASSET_MANAGER.queueDownload("./assets/streetlight.png");
ASSET_MANAGER.queueDownload("./assets/streetlight02.png");
ASSET_MANAGER.queueDownload("./assets/fence.png");
//ASSET_MANAGER.queueDownload("./assets/pedestrian01.png");
//ASSET_MANAGER.queueDownload("./assets/pedestrian02.png");
//ASSET_MANAGER.queueDownload("./assets/pedestrian03.png");
//ASSET_MANAGER.queueDownload("./assets/car01.png");
//ASSET_MANAGER.queueDownload("./assets/car02.png");
//ASSET_MANAGER.queueDownload("./assets/car03.png");
//ASSET_MANAGER.queueDownload("./assets/building01.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	// Environment
	var bg = new Background(gameEngine, 0, 0);	
	var fence = new Fence(gameEngine, 128, 110);	
	var streetlight = new Streetlight(gameEngine, 116, 104);	

	// NPCs
	
	// Player
	var driver = new Driver(gameEngine, 462, 384);
	var drivercar = new DriverCar(gameEngine, 562, 384);

	gameEngine.init(ctx);
	
	// Envoronment
	gameEngine.addEntity(bg);
	gameEngine.addEntity(fence);
	gameEngine.addEntity(streetlight);
	
	// NPCs
	
	// Player
	gameEngine.addEntity(driver);
	gameEngine.addEntity(drivercar);

	gameEngine.start();
});
