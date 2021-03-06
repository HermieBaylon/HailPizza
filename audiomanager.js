class AudioManager {
	constructor(game) {
		Object.assign(this, { game });
		
		this.game.audio = this;
		this.isPlaying = false;
		
		// Populate songs list
		this.songs = [];
		this.songs.push(new Audio('music/chicnstu.mp3'));
		this.songs.push(new Audio('music/crippledbypizza.mp3'));
		this.songs.push(new Audio('music/piratepizzaparty.mp3'));
		this.songs.push(new Audio('music/pizzaparty.mp3'));
		this.songs.push(new Audio('music/forkboy.mp3'));
		this.songs.push(new Audio('music/pepperoni.mp3'));
		this.selection = Math.floor(Math.random() * this.songs.length);
	}
	
	update() {
		if (document.getElementById("myMusic").checked) {
			PARAMS.AUDIO = true;
			//if (this.songs[this.selection].paused) this.songs[this.selection].play();
			if (this.songs[this.selection].currentTime == this.songs[this.selection].duration) this.selection = (this.selection + 1) % this.songs.length;
		} else {
			PARAMS.AUDIO = false;
			this.songs[this.selection].pause();
		}
	}
	
	play() {
		if (PARAMS.AUDIO) {
			/*
			if (this.isPlaying) {
				this.songs[this.selection].pause();
			} else {
				this.isPlaying = true;
				//this.selection = Math.floor(Math.random() * this.songs.length);
			}*/
			if (this.songs[this.selection].paused) this.songs[this.selection].play();
		}
	}
	
	pause() {
		this.songs[this.selection].pause();
		this.isPlaying = false;
	}
	
	lowerVolume() {
		this.songs[this.selection].volume = 0.03;
	}
	
	returnVolume() {
		this.songs[this.selection].volume = 0.5;
	}
	
	setVolume(vol) {
		this.songs[this.selection].volume = vol;
	}
};