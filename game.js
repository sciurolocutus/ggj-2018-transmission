var drawSquare = function(x,y,w,ctx) {
	ctx.beginPath();
	ctx.rect(x,y,w,w);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.closePath();
}

/**
 * A wheel has an outer radius and an inner radius.
 * Later, it may have a rotation angle, if we want the wheel to show motion
 * (it will, of course, have to no longer have perfect rotational symmetry, which it has for now).
 */
var drawWheel = function(x, y, r, theta, ctx) {
	var innerRadius = 0.6*r;
	//Draw the tire
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2.0, false);
	ctx.lineWidth = 15;
	//ctx.strokeStyle = 'black';
	//ctx.stroke();
	ctx.fillStyle = "#121212";
	ctx.fill();
	ctx.closePath();

	//Draw the wheel
	ctx.beginPath();
	ctx.arc(x, y, innerRadius, 0, Math.PI * 2.0, false);
	ctx.lineWidth = 5;
	ctx.fillStyle = '#6F6F6F';
	ctx.fill();
	ctx.closePath();

	//Draw a line to indicate angle
	drawLineAtAngle(x, y, r, theta, ctx);
}

var drawLineAtAngle = function(x, y, r, theta, ctx)  {
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x+r*Math.cos(theta), y+r*Math.sin(theta));
	ctx.strokeStyle = 'rgb(50, 50, 50)';
	ctx.lineWidth = 3;
	ctx.stroke();
	ctx.closePath();
}

var drawCarBody = function(x, y, scale, ctx) {
	ctx.beginPath();
	ctx.rect(x,y,scale*3,scale);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.arc(x+scale*1.5, y, scale, Math.PI, Math.PI * 2.0, false);
	ctx.fill();
	ctx.closePath();
}

var Car = function (x, y, theta, scale) {
	this.wheelTheta = theta;
	this.x = x;
	this.y = y;
	this.scale = scale;
}

Car.prototype.setTheta = function(theta) {
	this.wheelTheta = theta;
}

Car.prototype.draw = function(ctx) {
	drawCarBody(this.x+this.scale*1.5, this.y - this.scale, this.scale, ctx);
	drawWheel(this.x+this.scale, this.y, this.scale, this.wheelTheta, ctx);
	drawWheel(this.x+5*this.scale, this.y, this.scale, this.wheelTheta, ctx);
}

function animateTheCar(car, i, maxIt, animSpeed, ctx) {
	//console.log('Drawing that car at i=' + i);
	var theta = animSpeed * i * Math.PI * 2 / maxIt;
	car.setTheta(theta);
	car.draw(ctx);
	if(i<maxIt) {
		i++;
	} else {
		i=0;
	}
		requestAnimFrame(function() { animateTheCar(car, i+1, maxIt, animSpeed, ctx); });
		//setTimeout(function() { /* ctx.clearRect(0, 0, canvas.width, canvas.height); */ animateTheCar(car, i+1, maxIt, ms, animSpeed, ctx); }, ms);
	//}
}

var requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		}
})();

var displayGame = function() {
	var canvas = document.getElementById("theCanvas");
	canvas.width = window.innerWidth * 0.9;
	canvas.height = window.innerHeight * 0.9;
	var w = canvas.width;
	var h = canvas.height;
	var ctx = canvas.getContext("2d");

	//Draw Testing code
	for(var i=4; i<14; i++) {
		var theta = i * Math.PI * 2 / 10;
		//drawWheel(40 * i  + 10, 10 * i + 10, 20, theta, ctx);
		var car = new Car(20 * i + 10, Math.pow(i, 1.3) * 15, theta, i * 1.3);
		car.draw(ctx);
	}


	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var maxIters = 10;

	var car = new Car(w / 20, h / 5, theta, w / 20);
	animateTheCar(car, 0, maxIters, 1, ctx);

	var audioLibrary = {
		'engineStart' : 'vroomvroom.mp3',
		'errrk' : new RandomAudio(['errrk.mp3', 'vlabrakesqueal1.mp3', 'vlabrakesqueal2.mp3', 'vlabrakesqueal3.mp3']),
		'crash' : 'crash.mp3',
		'juke' : 'jukebox.mp3',
		'intro' : 'whydidithinkiwasahuman.mp3',
		'intro2' : 'whateverimacarnow.mp3',
		'squirrel' : 'onosqrl.mp3',
		'late' : 'runninglate.mp3',
		'yellow' : 'yellowmeansgo.mp3'
	}

	var as = new AudioState (audioLibrary, './audio');

	var keyMap = {
		'ArrowDown': function(event) {
			as.startPlaying('errrk', true);
		},
		'ArrowUp': function(event) {
			as.startPlaying('engineStart', false);
		},
		'Escape': function(event) {
			as.startPlaying('crash', true);
		},
		'Shift': function(event) {
			console.log(JSON.stringify(event));
			as.startPlaying('juke', false);
		}
	};


	var kl = new KeyListener(document, keyMap);
}

/**
 * doc is meant to be "the document" (which can observe keypresses)
 * keyMap is an object mapping keys ('h', 'j', 'k', 'l', 'ArrowDown', 'ArrowLeft') onto behaviors
 */
var KeyListener = function(doc, keyMap) {
	this.keyMap = keyMap;
	document.addEventListener('keydown', function(event) {
		var k = event.key;
		console.log('key down: ' + k);
		if(keyMap[k]) {
			keyMap[k](event);
		}
	});
}


var gameState = function() {
	this.playerLocation = 0;
	this.playerSpeed = 0;
	this.crashed = false;
}

//TODO: generate obstacles sometimes
gameState.prototype.addObstacles = function() {

}
