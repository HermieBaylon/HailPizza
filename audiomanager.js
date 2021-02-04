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
	
	play() {
		if (document.getElementById("myCheck").checked) {
			this.songs[this.selection].pause();
			this.selection = (this.selection + 1) % this.songs.length;
			this.songs[this.selection].play();
		}
	}
	
	pause() {
		this.songs[this.selection].pause();
	}
	
	lowerVolume() {
		this.songs[this.selection].volume = 0.2;
	}
	
	returnVolume() {
		this.songs[this.selection].volume = 1;
	}
};