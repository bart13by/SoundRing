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
	setTimeout(() => {
		console.log(e.target.readyState);
		loadScreen.className = "loaded";
		//e.target.play();
	}, "0");
}