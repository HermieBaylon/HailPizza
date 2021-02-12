class AudioManager {
	constructor(game) {
		Object.assign(this, { game });
		
		this.game.audio = this;
		this.selection = 0;
		
		// Populate songs list
		this.songs = [];
		this.songs.push(new Audio('music/chicnstu.mp3'));
		this.songs.push(new Audio('music/crippledbypizza.mp3'));
		this.songs.push(new Audio('music/piratepizzaparty.mp3'));
		this.songs.push(new Audio('music/pizzaparty.mp3'));
		this.songs.push(new Audio('music/forkboy.mp3'));
		this.songs.push(new Audio('music/pepperoni.mp3'));
	}
	
	update() {
		if (document.getElementById("myMusic").checked) {
			PARAMS.AUDIO = true;
			//if (this.songs[this.selection].paused) this.songs[this.selection].play();
		} else {
			PARAMS.AUDIO = false;
			this.songs[this.selection].pause();
		}
	}
	
	play() {
		if (PARAMS.AUDIO) {
			this.songs[this.selection].pause();
			this.selection = Math.floor(Math.random() * this.songs.length);
			this.songs[this.selection].play();
		}
	}
	
	pause() {
		this.songs[this.selection].pause();
	}
	
	lowerVolume() {
		this.songs[this.selection].volume = 0.03;
	}
	
	returnVolume() {
		this.songs[this.selection].volume = 0.1;
	}
};