// app.js


function doPause(e){
	/*
	When the audio pauses, pause the animations 
	*/
	document.getElementById('svg-container').pauseAnimations();
}

function doPlay(e){
	/*
	When the audio plays, play the animations 
	*/
	document.getElementById('svg-container').unpauseAnimations();
}

function doSeek(e){
	/*
	When the audio seeks, set the animation currentTime to the audio currentTime
	*/
	
	const t = e.target; // event target is the HTMLMediaElement playing the audio
	document.getElementById('svg-container').setCurrentTime(t.currentTime);
}

function doLoaded(e){
	/* 
	Called when 'canplaythrough' event fires on media element (which means 
	the browser thinks enough data is present to play without buffering).
	Removes the "load screen" element.
	 */
	const loadScreen = document.getElementById('loading');
	// setTimeout executes in a thread, waiting a full execution cycle. 
	// Which is virtually 0 time so probably not necessary.
	setTimeout(() => {
		console.log(e.target.readyState);
		// "loaded" class is hidden via CSS
		loadScreen.className = "loaded";

		// Ring starts hidden, but that didn't fix the bug in Safari :-(
		document.getElementById('wheel').style.display = 'flex';

		// We may need to force-trigger the play event to make sure the animation starts. 
		e.target.play();
	}, "1");
}