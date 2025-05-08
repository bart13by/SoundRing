// events.js

function toggleLayer(e){
	const containerIds = {
		'show-spectrogram': '#chyron-container',
		'show-climograph' : '#weather-graphs-container',
		'show-birds' : '.bird-data',
		'show-poems' : '.poem-data',
		'show-phenomena' : '#phenomena img'
	};
	console.log(e.target.checked);
	for (const hideNode of document.querySelectorAll(containerIds[e.target.id])) {
		if (e.target.checked){
			hideNode.style.visibility = 'visible';	
		}
		else {
			hideNode.style.visibility = 'hidden';	
		}
		
	}
	
	
}

function pauseAllAnimations(){
	document.getElementById('svg-container').pauseAnimations();
	for (const css_anim of document.getAnimations())
	{
		css_anim.pause();
	}
	
}
function unpauseAllAnimations(){
	document.getElementById('svg-container').unpauseAnimations();
	for (const css_anim of document.getAnimations())
	{
		css_anim.play();
	}
	
}
function doPause(e){
	/*
	When the audio pauses, pause the animations 
	*/
	console.log("paused");
	RUNTIME.audio_playing = false;
	pauseAllAnimations();
	
	pauseApp();
}

function doPlay(e){
	/*
	When the audio plays, play the animations 
	*/
	console.log("playing");
	RUNTIME.audio_playing = true;
	unpauseAllAnimations();
	startApp();
}

function doSeeked(e){
	// /* This is supposed to be called when seeking is over, but it gets called repeatedly while seeking  */
	
	document.querySelector('#svg-container').setCurrentTime(e.target.currentTime);
	for (const css_anim of document.getAnimations())
	{
		css_anim.currentTime = e.target.currentTime * 1000;
	}
	
}

function doLoaded(e){
	/* 
	Called when 'canplaythrough' event fires on media element (which means 
	the browser thinks enough data is present to play without buffering).
	Removes the "load screen" element.
	 */

	setTimeout(() => {
		setTimeout(() => { 
			document.querySelector('#loading').className = 'loaded';
			}, 6000);
				document.querySelector('#loading').style.opacity = 0;
		}, 500);

	const playPromise = e.target.play();	
	if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Automatic playback started!
      console.log("auto-play worked");
      
    })
    .catch(error => {
      // Auto-play was prevented
      console.error(error);
      console.log("starting app anyway");
      startApp();
    });
  }

	
	
		

}