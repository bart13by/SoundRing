// events.js

function toggleLayer(e){
	const containerIds = {
		'show-spectrogram': '#chyron-container',
		'show-climograph' : '#weather-graphs-container',
		'show-birds' : '.bird-data',
		'show-poems' : '.poem-data',
		'show-phenomena' : '#phenomena img'
	};
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

var DELAY_PLAY = 0; // will use to fix timing issue in doSeeked
function doSeeked(e){
  /* When audio scrubber is changed, sync the animations to the new audio time 
   * Warning: called repeatedly while scrubber in use. 
   */
	clearTimeout(DELAY_PLAY);
	DELAY_PLAY = 0;
	// console.log(e);
	document.querySelector('#svg-container').setCurrentTime(e.target.currentTime);
	for (const css_anim of document.getAnimations())
	{
		css_anim.currentTime = e.target.currentTime * 1000;
	}
	// shim because waveform is weird.
	if (e.target.currentTime < 1435){
		document.querySelector('#chyron-container').style.opacity = 1;	
	}
	

}
function resetFirmament(e){
	console.log("resetting");
	doPause(e);
	document.querySelector('#wheel-group').style.opacity = 0;
	document.querySelector('#clouds').style.opacity = 0;
	document.querySelector('#chyron-container').style.opacity = 0;
	document.querySelector('#weather-graphs-container').style.opacity = 0;
	setTimeout(()=>{
		e.target.currentTime = 0;
		document.querySelector('#wheel-group').style.opacity = 1;

		setTimeout(()=>{ 
			document.querySelector('#clouds').style.opacity = 1;
			document.querySelector('#chyron-container').style.opacity = 1;
			document.querySelector('#weather-graphs-container').style.opacity = 1;
			e.target.play();
			},100)
	}, 3000);
	
}
function doLoaded(e){
	/* 
	Called when 'canplaythrough' event fires on media element (which means 
	the browser thinks enough data is present to play without buffering).
	Removes the "load screen" element.
	 */
	pauseAllAnimations(); // don't burn cycles before audio plays
	setTimeout(() => { // outer timeout is to fade original loading screen
		setTimeout(() => { 
			document.querySelector('#loading').className = 'loaded';
			}, (PROPERTIES.loadscreen_fade_seconds + PROPERTIES.load_pause_add_seconds) * 1000);
				document.querySelector('#loading').style.opacity = 0;
				e.target.play();
		}, 100);
	
	 /*     Taking this out, since autoplay gets out of sync with the player */	
	// const playPromise = e.target.play();	
	// if (playPromise !== undefined) {
  //   playPromise.then(_ => {
  //     // Automatic playback started!
  //     document.querySelector('#audioplayer-play').click();
  //     console.log("auto-play worked");
      
  //   })
  //   .catch(NotAllowedError => {
  //     // Auto-play was prevented
  //     console.log("Auto-play prevented; stopping animations but starting app anyway");
  //   });
  // }
}