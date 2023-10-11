// app.js
function fastForward(){
	const motion = document.getElementById("motion");
	const rotation = document.getElementById("rotation");
	motion.setAttribute("dur", "24s");
	rotation.setAttribute("dur", "24s");
}

function doPause(s){
	document.getElementById('svg-container').pauseAnimations();
}

function doPlay(e){
	document.getElementById('svg-container').unpauseAnimations();
}

function doSeek(e){
	const t = e.target;
	document.getElementById('svg-container').setCurrentTime(t.currentTime);
}