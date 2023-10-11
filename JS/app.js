// app.js


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

function doLoaded(e){
	const loadScreen = document.getElementById('loading');
	//loadScreen.style.display = "none";
	setTimeout(() => {loadScreen.className = "loaded"}, "1000");
}