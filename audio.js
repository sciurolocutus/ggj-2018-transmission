var audioLibrary = {
	'engineStart' : 'engineStart.mp3',
	'errrk' : 'errrk.mp3',
	'beep' : 'beep.mp3'
}

var AudioState = function(audioLibrary, basePath) {
	this.currentlyPlaying = [];
	this.audioLibrary = audioLibrary;
	this.basePath = (!!basePath ? basePath : '.');
}

AudioState.prototype.startPlaying = function(soundName, interrupting) {
	if(this.audioLibrary[soundName]) {
		var audio = new Audio([this.basePath, this.audioLibrary[soundName]].join('/'));
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
	return [this.src, this.currentTime].join('@');
}

var RandomAudio = function(fileList) {
	this.fileList = fileList;
}

RandomAudio.prototype.toString = function() {
	return this.fileList[Math.floor(Math.random() * (this.fileList.length))];
}
