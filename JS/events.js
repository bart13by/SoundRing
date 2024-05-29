// app.js

function pauseAllAnimations(){
	document.getElementById('svg-container').pauseAnimations();
	document.querySelector("#svg-daylight").getAnimations()[0].pause(); 
	for (const node of document.querySelectorAll('.rotate img'))
    {
        for (const animation of node.getAnimations())
            {
                animation.pause();
            }
    }
}
function unpauseAllAnimations(){
	document.getElementById('svg-container').unpauseAnimations();
	document.querySelector("#svg-daylight").getAnimations()[0].play();
	for (const node of document.querySelectorAll('.rotate img'))
    {
        for (const animation of node.getAnimations())
            {
                animation.play();
            }
    }
}
function doPause(e){
	/*
	When the audio pauses, pause the animations 
	*/
	console.log("paused");
	RUNTIME.audio_playing = false;
	pauseAllAnimations();
	// document.getElementById('svg-container').pauseAnimations();
	// const css_anim = document.querySelector("#svg-daylight").getAnimations()[0];
	// css_anim.pause();

	pauseApp();
}

function doPlay(e){
	/*
	When the audio plays, play the animations 
	*/
	console.log("playing");
	RUNTIME.audio_playing = true;
	// document.getElementById('svg-container').unpauseAnimations();
	// const css_anim = document.querySelector("#svg-daylight").getAnimations()[0];
	// css_anim.play();
	unpauseAllAnimations();
	startApp();
}

function doSeeked(e){
	// /* This is supposed to be called when seeking is over, but it gets called repeatedly while seeking  */
	
	const svg_anim = document.querySelector('#svg-container');
	const css_anim = document.querySelector("#svg-daylight").getAnimations()[0];
	svg_anim.setCurrentTime(e.target.currentTime);
	css_anim.currentTime = e.target.currentTime * 1000;
	
	
	
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