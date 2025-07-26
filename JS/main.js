//main.js
// see init.js for startup stuff



/* Kick-off all processes -- called from HTML on load event */
const runFirmament = () => {
	console.log(`starting`);
	try 
	{
		if (PROPERTIES) 1;
		
	} catch (error) {
		/* Make sure init.js has loaded */
		console.error(error);
		console.error("init.js may not be loaded! Exiting");
		return;
	}

	
	if (RUNTIME.app_started) return; // bail out if we were already started
	RUNTIME.app_started = true;
	/* Async method parses the JSON data and populates the in-memory structures */
	populateDataFromJSON() // Returns a response with ok or error
		.then(response => { 
			if (!response.ok) {
				throw new Error(`Failed to populate data. ${response.error}`);
			}
			// if response is 'ok' proceed with adding all birds and poems to the DOM
			/*  ++++++  restrain the bird div to the daylight, use relative pos +++++  */
			const daylight = document.querySelector('#daylight');
			const darkness = document.querySelector('#darkness');
			for (const id of getAllBirdIds()){
				daylight.appendChild(getBirdById(id).asDOM.firstElementChild);
			}

			
			for (const frId of getAllPoemIds()){
				const poemObj = getPoemById(frId);
				if (poemObj.darkness == "darkness"){
					darkness.appendChild(poemObj.asDOM.firstElementChild);
				}
				else {
					daylight.appendChild(poemObj.asDOM.firstElementChild);
				}
				
			}
			// Hoping to fix caching bug by always setting birds and poems for December/Winter
			showBirdsForMonth(MONTHSARRAY[0]);
			showPoemsForSeason(SEASONS[MONTHSARRAY[0]]);
			// startApp is called now and whenever audio plays, initiating the main timer loop
			startApp();
		})
		.catch(error => {
			console.error('Error:', error);
	});
}
/************** DISPATCH TIMER EVENTS ************/
function dispatchTimerEvents(event){

	/* Called every second and on any time change; manages all the timer-based actions
	 * This is really where all the magic happens.
	 */
	
	// const actualTime = getCurrentTime();
	const actualTime = event.target.currentTime;
	const seconds = Math.floor(actualTime);
	// we start the month early for the sake of arrive/depart and graph change
	const shiftedTime = actualTime + PROPERTIES.preload_seconds; 
	const currentMonth = MONTHSARRAY[Math.floor(shiftedTime / 120)];
	const currentSeason = SEASONS[MONTHSARRAY[Math.floor(actualTime / 120)]]; // but don't start seasons early
	
	// begin time-based events
	updateClouds(actualTime); // update every second

	// check every second
	if (PHENOMENA_TIMES_SECS[seconds] !== undefined) { 
		doNightSkyPhenomena(PHENOMENA_TIMES_SECS[seconds]);
	}
	const darkenProps = DARKEN_SKY_TIMES_SECS[seconds - PROPERTIES.darken_fade_seconds];
	if (darkenProps !== undefined) {
		darkenSky(darkenProps);

	}
	// shim for audiowave (chyron)
	if (seconds == 1435) document.querySelector('#chyron-container').style.opacity = 0;
	// update every drift_interval_seconds
	if (seconds % PROPERTIES.drift_interval_seconds == 0){
		doDrift(); 
	}
	// We start departing at PROPERTIES.depart_start_seconds of each month
	if (seconds % PROPERTIES.month_duration_seconds == PROPERTIES.depart_start_seconds) 
	{
		doDeparting(currentMonth);
	}
	
	// Check for new month
	if (currentMonth != RUNTIME.current_month) { // If month has changed ...
		// reset the birds
		showBirdsForMonth(currentMonth);
		// change-out the weather graph
		changeWeatherGraph(currentMonth);
		// update RUNTIME
		RUNTIME.current_month = currentMonth;	

		// Check for new season (only do if month has changes)
		if (currentSeason != RUNTIME.current_season){
			// update the poems 
			showPoemsForSeason(currentSeason);
			// update RUNTIME
			RUNTIME.current_season = currentSeason;
		}
		// Now that current birds and poems have visibility props, check proximity to the edge.
		setEdgeProperties();
	} 
}

function startApp() {return 1;}
function __startApp(){ // called on audio.play event and on initial start up
	console.log(`startApp; interval_id == ${RUNTIME.interval_id}`);
	// RUNTIME.app_started = true;
	if (RUNTIME.interval_id > 0){
		// If setInterval has already been called, stop it running so we can restart
		clearInterval(RUNTIME.interval_id);
	}
	
	if (RUNTIME.audio_playing){ // necessary to prevent the app burning cycles before play or during pause
		// start/restart the timer loop
		RUNTIME.interval_id = setInterval(dispatchTimerEvents, 1000);		
	}
	
}
function pauseApp(){ // called on pause event
	clearInterval(RUNTIME.interval_id);
	RUNTIME.audio_playing = false;
}

function getCurrentTime(){ // utility method to get the current time from the media player
	return document.querySelector('#audio').currentTime;
}

function doDrift(){
	/* Manage the "drift" of visible birds in the DOM; called every three seconds */
	
	// Get birds with "showing" class AND all resident birds (which are always showing)
	const currentlyVisibleBirds = Array.from(document.querySelectorAll(".bird-data.showing, .residence-Resident"));
	if (currentlyVisibleBirds.length == 0) return;

	// Randomly select a few birds to start drifting
	for (let i = 0; i < PROPERTIES.drift_birds_per_drift; i++){
		const randomIndex = Math.floor(Math.random() * currentlyVisibleBirds.length);
		const driftBird = currentlyVisibleBirds[randomIndex];
		// if this fella is already drifting, just leave him alone
		if (driftBird.classList.contains("drift")) return;
		// FWD Drift is a style transition
		driftBird.style.transition = `transform ${PROPERTIES.drift_fwd_period_seconds}s ease`;
		// outer timer is waits random interval up to drift_start_wait_seconds
		setTimeout(() => {
				driftBird.classList.add("drift"); // adding "drift" class initiates transform
				// inner timeout initiates return to original position by removing drift class
				setTimeout(() => {
					driftBird.style.transition = `transform ${PROPERTIES.drift_back_period_seconds}s ease-out`;
					driftBird.classList.remove("drift");
					
				}, Math.random() * (PROPERTIES.drift_start_wait_seconds * 2 * 1000));

			}, Math.random() * (PROPERTIES.drift_start_wait_seconds * 1000));	
	}
	
}

function updateClouds(currentTime){
	/*Called every second from dispatchTimerEvents */
	const secondOfMonth = Math.floor(currentTime % 120);
	const monthIndex = Math.floor(currentTime / 120);
	const monthName = MONTHNAMES[MONTHSARRAY[monthIndex]];
	const cloudType = CLOUDDATA[monthName][secondOfMonth];
	if (cloudType == RUNTIME.current_cloud_type)
	{
		return;	
	} 
	else
	{
		RUNTIME.current_cloud_type = cloudType;
	}

	// console.log(`Cloud Type for ${monthName} at ${secondOfMonth} secs is ${cloudType}`);
	doCloudTransition(cloudType);
	function doCloudTransition(cloudType)
	{
		// embedded method to handle switching cloud types
		// first start fading out all clouds
		if (cloudType === undefined) return;
		const hideList = document.querySelectorAll('.cloud-group');
		for (cloud of hideList)
		{
			cloud.classList.remove("fade-in");
			cloud.classList.add("fade-out");
		}
		// if 'none' we're done
		if (cloudType === 'none') return;
		// Otherwise, fade-in the selected type
		const show = document.querySelector(`#${cloudType}-group`);	
		show.classList.add("fade-in");
	}

}

function changeWeatherGraph(month){
	
	console.log(`Weather Change for #wg${month}`);
	const newMonth = document.querySelector(`#wg${month} img`);
	// rest all before turning on
	for (const wg of document.querySelectorAll('.weather-graph img'))
	{
		wg.style.opacity = 0;
	}
	newMonth.style.opacity = 1;
}

function doNightSkyPhenomena(phenom){
	const phenom_img = document.querySelector(`#${phenom} img`);
	const duration = PHENOMENA_DURATIONS_SECS[phenom];
	phenom_img.style.opacity = 1;
	setTimeout(() => {
		phenom_img.style.opacity = 0;
	}, duration * 1000);
	
}

function darkenSky(parms){
	/* remove inner/outer if we don't want */
	const outer = document.querySelector('#svg-daylight');
	const inner = document.querySelector('#svg-arc');
	inner.style.opacity = 0;
	outer.style.opacity = (1 - parms.amount);
	setTimeout(() => {
		outer.style.opacity = 1;
		inner.style.opacity = 1;
	}, parms.duration * 1000);

}


function doDeparting(monthIndex){
	/* Called when elapsedTime for monthIndex is 105 seconds (1:45) */	
	// get the list of birds departing this month
	const departingBirdIds = getMigrantBirdIdsByMonthAndStatus(monthIndex, "departing");
	for (const id of departingBirdIds){
		// A random integer between 0 and 19 seconds tells us how long to wait
		const tTime = getRandom(0, 19);
		const birdDOMObject = document.getElementById(id);
		birdDOMObject.classList.add('isDeparting');
		birdDOMObject.firstElementChild.style.transition = `opacity 2s linear`;	
		setTimeout(()=> { // outer timeout is tTime seconds
			birdDOMObject.firstElementChild.style.opacity = '0%';	
			setTimeout(()=>{ // inner fires a few seconds after outer to fully remove bird from DOM
				birdDOMObject.classList.remove('isDeparting');
				birdDOMObject.classList.remove('showing');
				birdDOMObject.classList.add('hidden');	
			}, 3000);
		}, tTime * 1000);
	}
	
}
function setEdgeProperties(){
	/* Objects placed to close to edges need to be adjusted */
	const allVisibleObjects = Array.from(document.querySelectorAll(".showing, .residence-Resident"));
	for (const domObj of allVisibleObjects){
		const edgeClass = getPositionClassPerEdge(domObj);
		if (edgeClass.length > 0) domObj.classList.add(edgeClass);	
	}
	
}
function showPoemsForSeason(season){
	/* Called when time dispatcher determines we're in a new season */
	console.log(`showPoemsForSeason: ${season}`);

	// First remove all showing poems
	const currentlyVisiblePoems = Array.from(document.querySelectorAll("#poems .showing"));
	for (const domPoem of currentlyVisiblePoems){
		domPoem.classList.remove('showing');
		domPoem.classList.add('hidden');
		domPoem.style.top = null;
		domPoem.style.left = null;
	}
	// Then get a list of the poems for this season and light 'em up'
	for (const id of getPoemIdsBySeason(season).concat(getPoemIdsBySeason('Unknown')))
	{
		const poem = getPoemById(id);
		const domPoem = document.getElementById(id);
		domPoem.style.left = `${poem.left}vw`;
		domPoem.style.top = `${poem.top}%`;
		domPoem.classList.remove('hidden');
		domPoem.classList.add('showing');
	}
	
}
function showBirdsForMonth(monthIndex){
	/* Called whenever the time dispatcher decides the month has changed */
	console.log("showBirdsForMonth");
	// We want to remove all visible birds first . . .
	const currentlyVisibleBirds = Array.from(document.querySelectorAll("#daylight .bird-data.showing"));
	for (const domBird of currentlyVisibleBirds){
		if (domBird.classList.contains('isDeparting')){
			// ... unless they're actively departing
			continue;
		} 
		domBird.classList.remove('showing');
		domBird.classList.add('hidden');
		domBird.style.top = null;
		domBird.style.left = null;
	}	


	// Now turn on the birds for this month	 
	for (const id of getMigrantBirdIdsByMonthAndStatus(monthIndex, "arriving")){
		const birdDOMObject = document.getElementById(id);
	    setVisibleStyle(birdDOMObject, "arriving");
	}
	for (const id of getMigrantBirdIdsByMonthAndStatus(monthIndex, "staying")){
		const birdDOMObject = document.getElementById(id);
		setVisibleStyle(birdDOMObject, "staying");
	}
	for (const id of getMigrantBirdIdsByMonthAndStatus(monthIndex, "departing")){
		// the "isDeparting" birds we skipped were departing from the last month
		// Departing birds for this month are treated the same as "staying"
		const birdDOMObject = document.getElementById(id);
		setVisibleStyle(birdDOMObject, "departing");
	}
	function setVisibleStyle(birdDOMObject, status){
		/* private to enclosing function. */
		// We need the JS bird object to get the x,y coordinates
		const birdObject = getBirdById(birdDOMObject.id);
		birdDOMObject.style.left = `${birdObject.left}vw`;
		birdDOMObject.style.top = `${birdObject.top}%`; //switched to relative/pct
		birdDOMObject.classList.remove("hidden");
	    birdDOMObject.classList.add("showing");
	    if (status != 'arriving'){
		    birdDOMObject.firstElementChild.style.opacity = '70%'
		    return;	
	    }// treat arriving separately, cause we need to do the animation
	    const tTime = getRandom(1, 20); // delay time before "turning on" 
		const bImage = birdDOMObject.firstElementChild;
		bImage.style.transition = `opacity .75s ease-out`;	
		setTimeout(() => {
			bImage.style.opacity = "70%";
		},  tTime * 1000); // wait tTime seconds before transitioning
	}
}
	

function getMonthsPresent(presence){
	/* Returns "presence" as a string of month names  */
		let monthSpans = [];
		const stints = presence.split(/;\s?/);
		for (const stint of stints){
			const months = stint.trim().split(/\s?[,.]\s?/);
			const last =  MONTHNAMES[months.at(-1).trim()];
			const first = MONTHNAMES[months.at(0).trim()];
			if (last === first) {
				monthSpans.push(`${first}`);
			} else {
				monthSpans.push(`${first} - ${last}`);
			}
		}
		return monthSpans.join('; ');
}
function getSizeForMass(mass){
	/* converts mass (grams) to "t-shirt" size */
	if (mass <= 9.7) return 'XS';
	if (9.8 <= mass && mass <= 27.8) return 'S';
	if (28 <= mass && mass <= 178) return 'M';
	if (212 <= mass && mass <= 5974) return 'L';
	if (11800 <= mass) return 'XL';
	return undefined;
}

function getPositionClassPerEdge(domObj){
	/* 
	 * Determine how close the domObj is to the edge and return the correct classname
	 * Empty string means not near left, right, or bottom edge
	 * Other values are "left-edge" "right-edge" "left-bottom-edge" and "right-bottom-edge"
	 */
    // convert w and h to vw/vh 
	const w = (domObj.offsetWidth / window.innerWidth) * 100;
	const h = (domObj.offsetHeight / window.innerHeight) * 100;
	// left and top are in vw/vh
	const left = parseInt(domObj.style.left);
	const top = parseInt(domObj.style.top);
	let left_right = new String();
	let bottom = new String();
	let ret = new String();
	if (left <= 12) left_right = 'left-';
	if (left + w >= 82) left_right = 'right-';
	if (top + h >= 65) bottom = 'bottom-';
	let prefix = `${bottom}${left_right}`;
	if (prefix.length > 0) ret = `${prefix}edge`;
	return ret;
}
function getRandomPlacementValues(position){
	/* 
	 * Get top/left values for inside and outside the arch. 
	 * Objects should be placed higher near the middle, lower by the edges. 
	 */
	
	const ret = {left: null, top: null};
	let arcCeiling = 0;
	let arcFloor = 0;

	switch (position){
		case 'inner': 
			ret.left = getRandom(14, 84); // cheat a little short of the right edge
			arcCeiling = 20; // middle 
			if (ret.left < 18 || ret.left > 80) arcCeiling = 58; // wider/lower
			else if (ret.left < 28 || ret.left > 70) arcCeiling = 45; 
			else if (ret.left < 34 || ret.left > 78) arcCeiling = 32; 
			ret.top = getRandom(arcCeiling, 90); 
			break;
		case 'outer':
			ret.left = getRandom(2, 98);
			arcFloor = 14; // middle
			if (ret.left < 8 || ret.left > 92) arcFloor = 88; // extreme outer
			else if (ret.left < 12 || ret.left > 88) arcFloor = 72; // band two
			else if (ret.left < 18 || ret.left > 82) arcFloor = 40; // band one
			ret.top = getRandom(5, arcFloor);
			break;
		case 'inner_darkness':
			ret.left = getRandom(15, 85);
			arcCeiling = 75; // Lower is inside, higher is outside 
			if (ret.left < 35 || ret.left > 65) arcCeiling = 50; 
			ret.top = getRandom(10, arcCeiling); 
			// y >= 90; < 150
			break;
		case 'outer_darkness':
			ret.left = getRandom(1, 98); // can afford a little wider than daylight
			arcFloor = 95;
			if (ret.left < 28 || ret.left > 72) arcFloor = 80;
			if (ret.left < 18 || ret.left > 82) arcFloor = 55; // outside the arch, nearer the edges
			ret.top = getRandom(arcFloor, 130);
			break;
		default:
			break;
	}
	return ret;
}
/* helper for random numbers; alias old names to new */
const getRandom = getRandomNumber;
const getRandomFloat = getRandomNumber;
function getRandomInteger(min, max){ return getRandomNumber(min, max, 0, false); }

function getRandomNumber(min, max, precision=4, float=true ) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	if (float)
	{
		return parseFloat(Math.random() * (maxFloored - minCeiled + 1) + minCeiled).toFixed(precision); 	
	}
	return parseInt(Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled));	
}



/* 
 * Utility accessor methods for in-memory data structures 
 * (some of these are probably not needed and can be removed at some point.)
 */

function getBirdById(birdId){
	const bird = ALL_BIRDS_BY_ID[birdId];
	if (typeof bird === 'undefined'){
		throw new Error(`Cannot find ${birdId}`);
	}
	return bird;
}
function getAllBirdIds(){
	return Object.keys(ALL_BIRDS_BY_ID);
}
function getAllBirdIdsForMonth(monthIndex){
	let migrantIds = new Array();
	for (const status of ['arriving', 'staying','departing']){
		migrantIds = migrantIds.concat(getMigrantBirdIdsByMonthAndStatus(monthIndex, status));
	}
	return migrantIds;
}
function getMigrantBirdIdsByMonthAndStatus(monthIndex, status){
	try {
		return MIGRANT_IDS_BY_MONTH_AND_STATUS[monthIndex][status];
	}
	catch (ReferenceError) {
		console.error(`Either ${monthIndex} is not a month or ${status} is not a status`);
	}
	
}

function getAllPoemIds(){
	return Object.keys(ALL_POEMS_BY_ID);
} 
function getPoemById(id){
		return ALL_POEMS_BY_ID[id];
}
function getPoemIdsForSeasonByMonth(monthIndex){
	const season = SEASONS[monthIndex];
	return POEM_IDS_BY_SEASON[season];
}
function getPoemIdsBySeason(season){
	return POEM_IDS_BY_SEASON[season];
}



/* 
 * Constructors for Bird and Poem objects 
 * Sets properties from the data record, then calculates additional neccessary fields.
 * Finally, provide an HTML template for the object (obj.toHTML()) AND create a DOM object
 * from the HTML (obj.asDOM()).
 *
*/
class FirmamentObject {
	constructor(record){
		for (const [key, value] of Object.entries(record)){
		    this[key] = value;
		}
		
		
	}
	asDOM(html){
		return document.createRange().createContextualFragment(html);	
	} 

}
class Bird extends FirmamentObject{
	constructor(birdRecord){ 
		super(birdRecord);
		this.monthsPresent = getMonthsPresent(this.presence);
		this.size = getSizeForMass(this.bodymass);
		if (this.appearance === null) this.appearance = "Common"; // do something about this!
		// If present all 12 months, it's resident; otherwise, migrant
		this.residenceStatus = this.presence.split(/[\s\n]?[;,.]\s?/).length == 12 ? "Resident" : "Migrant";

		// Compute locations and save for later retrieval
		let coords = {left: null, top: null};
		coords = this.residenceStatus == 'Resident' ? getRandomPlacementValues('inner') 
													: getRandomPlacementValues('outer');
		this.left = coords.left;
		this.top = coords.top;
		const xyStyle = this.residenceStatus == 'Resident' ?
							 `style="top: ${this.top}%; left: ${this.left}vw"`: "";
		this.asDOM = super.asDOM(
		`<div id="${this.id}"
		${xyStyle}
		class="tooltip bird-data hidden  size-${getSizeForMass(this.bodymass)}
		       residence-${this.residenceStatus} appearance-${this.appearance} bodymass-${this.bodymass}">
		<img src="SVG/${this.appearance}.svg" />
		<div class="tooltiptext">
		  <div class="tooltiptext-line">
		    <span class="commonName">${this.name}</span>
		    <span class="scientificName">(${this.scientificName})</span>;
		    <span class="bodymass">${this.bodymass} grams</span>
		  </div>
		  <div class="tooltiptext-line">
		  <span class="monthsPresent">${this.monthsPresent}</span>
		  </div>
		</div>
		</div>`);
		
	 }

}

class Poem extends FirmamentObject {
	constructor(birdRecord){
		 super(birdRecord);
		 if (this.season === null) this.season = "Unknown";
		 this.circulation = this.sent == 0 ? "Retained" : "Sent";
		 // compute locations and save for later
		 let coords = {left: null, top: null};
		 if (this.season == "Unknown"){
		 	this.darkness = "darkness";
		 	// coordinates for "the darkness" will be set here
		 	if (this.circulation == 'Sent'){
		 		coords = getRandomPlacementValues("outer_darkness"); 
			 	
			 }else{
			 	coords = getRandomPlacementValues("inner_darkness"); 
			 }
		 	
			this.left = coords.left;
			this.top = coords.top;
		 } else {
		 	this.darkness = "";
			coords = this.circulation == 'Retained' ? getRandomPlacementValues('inner') 
													: getRandomPlacementValues('outer');
			this.left = coords.left;
			this.top = coords.top;
		 }
		// some conditional HTML template stuff
		const xyStyle = this.circulation == 'Retained' ?
			 `style="top: ${this.top}%; left: ${this.left}vw"`: "";
		const recipientLine = this.circulation == 'Sent' ? 
		`<div class="tooltiptext-line poem-recipient">${this.recipient}</div>`: "";
		const yearText = this.year.includes("unknown") ? "" : `(${this.year})`;
		this.asDOM = super.asDOM(`
			 <div id="${this.id}" class="tooltip poem-data hidden ${this.darkness} circulation-${this.circulation}" ${xyStyle} >
		      <span class="poem-marker">+</span>
		        <div class="tooltiptext">
		        <div class="tooltiptext-line"><span class="poem-firstline">${this.name}</span> 
		        <span class="poem-year">${yearText}</span>
		        </div>
		        ${recipientLine}
		      </div>
		    </div>`
			);

		}	
}

/* Called at start-up parse JSON and load in-memory data structures. */
async function populateDataFromJSON(){
	console.log("populating Data");
	try {
		const poemJson = JSON.parse(JSONPOEMDATA);
		for (const poemRecord of poemJson){
			const poemObj = new Poem(poemRecord);
			ALL_POEMS_BY_ID[poemObj.id] = poemObj;
			POEM_IDS_BY_SEASON[poemObj.season].push(poemObj.id);

		}
		const birdJson = JSON.parse(JSONBIRDDATA);
		for (const item in birdJson){
			// First, go through the bird records from JSON
			const birdRecord = birdJson[item];
			let bird = new Bird(birdRecord);
			ALL_BIRDS_BY_ID[birdRecord.id] = bird;
			
			/* Populate resident array */
			if (bird.residenceStatus == "Resident"){
				RESIDENT_BIRD_IDS.push(bird.id);
				// If bird is year-round resident, exit the loop
				continue;
			} 
			/* If still in loop, this bird is a migrant.
			 * For migrants, we need to know status for each month
			 * "status" will be one of . . .
			    arriving -- first month present 
			    leaving -- last month present
			    staying -- still present, neither arriving nore leaving
			 */  
			 
			for (const m of bird.presence.split(/[\s\n]?[;,.]\s?/)){
				/* Iterate through each month liste in bird.presence for this record.
				 * Add bird to [month][status] in MIGRANT_IDS_BY_MONTH_AND_STATUS				
				 */
				
				const month = parseInt(m.trim()); 
				// month should be an int 1 -- 12. If parseInt fails, a TypeError will throw
				try {
					  let status = "staying";
					  try {
						  const arrival = bird.arrival.split(/\s?[,;]\s?/);
						  const departure = bird.departure.split(/\s?[,;]\s?/);
						  if (arrival.includes(month)) { status = "arriving"; }
						  else if (departure.includes(month)) { status = "departing"; }	
					 } catch (TypeError) { // inner "try"
					 	/* This happens if arrival and departure are null. We keep going. */
						console.log(`Leaving status as ${status} for ${bird.name}`);
					 }
					  
					  // Add the ID to the array for this month and status:	  
					  MIGRANT_IDS_BY_MONTH_AND_STATUS[month][status].push(bird.id);
				}
				catch (TypeError){ // Outer try -- malformed month from bird.presence
					console.log(TypeError);
					console.error(`No month found for ${month} -- looking at birdID ${bird.id} and presence ${bird.presence}`);
				}
			}
			
			
		}
		// everything looks good; return ok.
		return { ok: true, error: null }
	}
	catch (e) {
		// If anything went wrong, return not ok with error
		return {ok: false, error: e }
	}
}



