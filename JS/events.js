// app.js

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
	const loadScreen = document.querySelector('#loading');
	loadScreen.className = "loaded";
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