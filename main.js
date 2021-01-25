var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/bgproto.png");
ASSET_MANAGER.queueDownload("./assets/driver.png");
ASSET_MANAGER.queueDownload("./assets/drivercar.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	var bg = new Background(gameEngine, 0, 0);
	var driver = new Driver(gameEngine, 462, 384);
	var drivercar = new DriverCar(gameEngine, 562, 384);

	gameEngine.init(ctx);
	
	gameEngine.addEntity(bg);
	gameEngine.addEntity(driver);
	gameEngine.addEntity(drivercar);

	gameEngine.start();
});
