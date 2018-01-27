var audioLibrary = {
	'engineStart' : 'engineStart.mp3',
	'errrk' : 'errrk.mp3',
	'beep' : 'beep.mp3'
}

var AudioState = function(audioLibrary) {
	this.currentlyPlaying = [];
	this.audioLibrary = audioLibrary;
}

AudioState.prototype.startPlaying = function(soundName, interrupting) {
	if(this.audioLibrary[soundName ]) {
		var audio = new Audio(this.audioLibrary[soundName]);
		console.log('Adding ' + audio.toString());
		if(interrupting) {
			for(i in this.currentlyPlaying) {
				var a = this.currentlyPlaying[i];
				console.log('Removing ' + a.toString());
				//stop it
				a.pause();
			}
			this.currentlyPlaying = [audio];
		} else {
			this.currentlyPlaying.push(audio);
		}
		audio.play();
	}
}

Audio.prototype.toString = function() {
	return [this.src, this.currentTime].join('/');
}

var playBeep = function() {
	//var audio = new Audio('beep.ogg');
	var audio = new Audio('hwg.mp3');
	audio.play();
}
