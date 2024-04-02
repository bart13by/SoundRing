var makeItRain = function() {
  //clear out everything
  for (const el of Array.from(document.querySelectorAll('.rain'))){
  	el.innerHTML = "";
  } 
  

  var increment = 0;
  var drops = "";
  var backDrops = "";

  while (increment < 100) {
    //couple random numbers to use for various randomizations
    //random number between 98 and 1
    var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
    //random number between 5 and 2
    var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
    //increment
    increment += randoFiver;
    //add in a new raindrop with various randomizations to certain CSS properties
    drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
  }

  document.querySelector('.front-row').innerHTML = drops;
  document.querySelector('.back-row').innerHTML = backDrops;
}
function Drop(props){
	for (const [key, value] of Object.entries(props)){
		    this[key] = value;
	 }
}

// document.querySelector('.splat-toggle.toggle').onClick = function() {
//   document.querySelector('#daylight').toggleClass('splat-toggle');
//   document.querySelector('.splat-toggle.toggle').toggleClass('active');
//   makeItRain();
// };

// document.querySelector('.back-row-toggle.toggle').onClick = function() {
//   document.querySelector('#daylight').toggleClass('back-row-toggle');
//   document.querySelector('.back-row-toggle.toggle').toggleClass('active');
//   makeItRain();
// };

// document.querySelector('.single-toggle.toggle').onClick = function() {
//   document.querySelector('#daylight').toggleClass('single-toggle');
//   document.querySelector('.single-toggle.toggle').toggleClass('active');
//   makeItRain();
// };

//makeItRain();