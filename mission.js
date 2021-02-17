// Glorified struct to handle mission text and timers.
class Mission {
	// Constructor. Must call a fill function for this to be useful.
	constructor(game) {
		// Assignments
		this.game = game;
		this.key = "";
		this.startText = "";
		this.finishText1 = "";
		this.finishText2 = "";
		this.numOrders = 0;
		this.time = 0;
	}
	
	// Fill based on given key. Generates random if fail to find.
	keyFill(key) {
		// keys
		var keys = ["tut1", "tut2"];
		var startText = ["Ya got an order, bud. 30 minutes... 29 minutes ago.", 
							"I got 2 for ya this time. Don't come back until they're both done."];
		var finishText1 = ["Damn, I was banking on your drunk ass being late again.", "Who the fu... oh right."];
		var finishText2 = ["Fine, I'll pay this time. Tip? fuck outta here.", "Whatever, took long enough."];
		var numOrders = [1, 2];
		// Search for key
		let flag = false;
		for (var i = 0; i < keys.length; i++) {
			if (key == keys[i]) {
				flag = true;
				// Start text
				this.startText = startText[i];
				// End text
				this.finishText1 = finishText1[i];
				this.finishText2 = finishText2[i];
				// Time/Orders
				this.numOrders = numOrders[i];
				this.time = 60 + (this.numOrders - 1) * 45;
			}
		}
		// if Key not found, generate a random mission.
		if (!flag) {
			console.log("INVALID KEY");
			randomFill();
		}
	};
	
	// Fill for random missions. bulk of missions played.
	randomFill() {
		// Random responses
		var startText = ["Ya got orders, bud.", "Was wonderin' where the hell ya were. Get goin."];
		var finishText1 = ["It better not be cold.", "Hell yeah, Pizza!"];
		var finishText2 = ["Tip? You think I'm made of money?", "Alright, here's a $5."];
		// Assign Stuff
		this.key = "Random";
		this.numOrders = Math.random() * 3;
		this.time = 60 + (this.numOrders - 1) * 45;
		
		let ver = Math.floor(Math.random() * startText.length);
		
		// Start text
		this.startText = startText[ver];
		// End text
		this.finishText1 = finishText1[ver];
		this.finishText2 = finishText2[ver];
	};
	
	// Fill for custom missions. if specific start/Finish text is wanted.
	customFill(key, startText, finishText1, finishText2, numOrders, time) {
		this.key = key;
		this.time = time;
		this.numOrders = numOrders;
		
		// Start text
		this.startText = startText;
		
		// End text
		this.finishText1 = finishText1;
		this.finishText2 = finishText2;
	};
}