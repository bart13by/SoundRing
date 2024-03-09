const fetchUrl = `https://dickinsonsbirds.org/project/digital-object/birdring/fetch`;
/* 
 * Maybe do month: {arriving: [], staying: [], departing: []}
 * like, "getArrivingBirdsForMonth", "getDepartingBirdsForMonth"
 * So we can also get last month's leaving (as in, remove for this month)
 *
 * basically, thinking about capturing the transition between months -- 
 * we want to update rather than recreate wherever possible. 
 * Also, for fast-forward, just remove everything and start over from the new month?
 * Will need a "getMonth" method based on the time code!

 * USE CSS. Generate CSS for each birdId per month

 */


let allBirdsById = {};
let residentBirdIds = new Array();
const migrantBirdIdsByMonth = {
	1: {arriving: new Array(), staying: new Array(), departing: new Array()},
	2: {arriving: new Array(), staying: new Array(), departing: new Array()},
	3: {arriving: new Array(), staying: new Array(), departing: new Array()},
	4: {arriving: new Array(), staying: new Array(), departing: new Array()},
	5: {arriving: new Array(), staying: new Array(), departing: new Array()},
	6: {arriving: new Array(), staying: new Array(), departing: new Array()},
	7: {arriving: new Array(), staying: new Array(), departing: new Array()},
	8: {arriving: new Array(), staying: new Array(), departing: new Array()},
	9: {arriving: new Array(), staying: new Array(), departing: new Array()},
	10: {arriving: new Array(), staying: new Array(), departing: new Array()},
	11: {arriving: new Array(), staying: new Array(), departing: new Array()},
	12: {arriving: new Array(), staying: new Array(), departing: new Array()},
};

const resp = fetch(fetchUrl)
.then(response => {
	  if (!response.ok) {
	    throw new Error('Network response was not ok');
	  }
	  return response.json();
	})
.then(jsonData => {
	for (obj in jsonData){
		let birdRecord = jsonData[obj];
		allBirdsById[birdRecord.id] = new Bird(birdRecord);
		doPresence(birdRecord);
	}
	//console.log(JSON.stringify(residentBirdIds));
	//console.log(JSON.stringify(migrantBirdIdsByMonth));
	//console.log(JSON.stringify(allBirdsById['3105	']));
  //console.log(JSON.stringify(getAllBirdsForMonth(12)));
  console.log(allBirdsById['2986'].toHTMLForMonth(9));


/* Need to decide whether we're creating HTML for one month only
 * creating all bird objects then generating/updating HTML per month with toHTML(month)?
 * Or creating HTML for all months and updating properties each month?  
 */
})
.catch(error => {
	  console.error('Error:', error);
});


const MonthNames = {
	1: 'January',
	2: 'February',
	3: 'March',
	4: 'April',
	5: 'May',
	6: 'June',
	7: 'July',
	8: 'August',
	9: 'September',
	10: 'October',
	11: 'November',
	12: 'December'
};
function doPresence(bird){
	const id = bird.id;
	const presence = bird.presence;
	let monthsPresent = presence.split(/[\s\n]?[;,.]\s?/);
	if (monthsPresent.length == 12){
		residentBirdIds.push(id);
		return;
	}
	for (month of monthsPresent){
		let m = month.trim();
		//console.log(`Bird is ${id}; month is ${m}; presense is ${presence.trim()}`);
		try {
			  let status = "staying";
			  const arrival = bird.arrival.split(/\s?[,;]\s?/);
			  const departure = bird.departure.split(/\s?[,;]\s?/);
			  if (arrival.includes(m)) { status = "arriving"; }
			  else if (departure.includes(m)) { status = "departing"; }
			  //console.log(`Arrival: ${JSON.stringify(arrival)}; departure: ${departure}; Status: ${status}`);
				migrantBirdIdsByMonth[m][status].push(id);
			}
			catch (TypeError){
				console.log(`No month found for ${m}`);
			}
		}
	}

function Bird(birdRecord){
	for (const [key, value] of Object.entries(birdRecord)){
	    this[key] = value;
	  }
	this.monthsPresent = getMonthsPresent(this.presence);
	this.size = getSizeForMass(this.bodymass);
	this.asHTML = `
		<div id="${this.id}"
		class="bird-data tooltip appearance-${this.appearance} size-${this.size}">
		<!-- IMAGE HERE -->
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
		</div>
		`;
}
/* 
 * setStyleForMonth"
	let status = getStatusForMonth(this.id, monthIndex);
		
		switch (status){
			case 'arriving':
				this.x = getRandom(5, 35);
				this.y = getRandom(5, 30);
				break;
			case 'departing':
				this.x = getRandom(65, 95);
				this.y = getRandom(5, 30);
				break;
			case 'staying':
				this.x = getRandom(30, 70);
				this.y = getRandom(5, 30);
				break;
			case 'resident':
				this.x = getRandom(20, 80);
				this.y = getRandom(45, 90);
		}
style="top: ${this.y}vh; left: ${this.x}vw"
*/
	
//}

function getMonthsPresent(presence){
		let monthSpans = [];
		const stints = presence.split(/;\s?/);
		for (const stint of stints){
			const months = stint.trim().split(/\s?[,.]\s?/);
			const last =  MonthNames[months.at(-1).trim()];
			const first = MonthNames[months.at(0).trim()];
			if (last === first) {
				monthSpans.push(`${first}`);
			} else {
				monthSpans.push(`${first} - ${last}`);
			}
		}
		return monthSpans.join('; ');
}
	
function getStatusForMonth(birdId, monthIndex){
	if (residentBirdIds.includes(birdId)) return 'resident';
	for (status of ['arriving', 'departing', 'staying'])
	{
		if (migrantBirdIdsByMonth[monthIndex][status].includes(birdId)) return status;
	}	
	return undefined;
}
function getArrivingBirdsForMonth(monthIndex){ return _getBirdsByTypeForMonth(monthIndex, 'arriving'); }	
function getDepartingBirdsForMonth(monthIndex){ return _getBirdsByTypeForMonth(monthIndex, 'departing'); }	
function getStayingBirdsForMonth(monthIndex){ return _getBirdsByTypeForMonth(monthIndex, 'staying'); }
function getResidentBirds(){ return _getBirdsByTypeForMonth(0, 'resident'); }
function getAllBirdsForMonth(monthIndex){
	
	const ar = _getBirdsByTypeForMonth(monthIndex, 'arriving');
	const dp = _getBirdsByTypeForMonth(monthIndex, 'departing');
	const st = _getBirdsByTypeForMonth(monthIndex, 'staying');
	const rs = _getBirdsByTypeForMonth(0, 'resident');
  let ret = new Array().concat(ar, dp, st, rs);
  return ret;
}

function _getBirdsByTypeForMonth(monthIndex, type='resident'){
	// valid types are resident, arriving, departing, staying
	let ret = new Array();
	if (type == 'resident'){
		for (let id of residentBirdIds){
			ret.push(allBirdsById[id]);
		}	
		return ret;
	}
	try {

		for (let id of migrantBirdIdsByMonth[monthIndex][type]){
			ret.push(allBirdsById[id]);
		}	
		return ret;		
	}
	catch (TypeError){
		console.log(`Invalid type argument: ${type}`);
	}

}

function OBSOLETE(){

}
function makeBirds(jsonData){
	for (obj in jsonData){
		jBird = jsonData[obj];
		allBirdsById[jBird.id] = jBird;
		let bird = new htmlBird(jBird);
		console.log(bird.toHTML());
		
	}	
}


/*. Helpers */
function getSizeForMass(mass){
	if (mass <= 9.7) return 'XS';
	if (9.8 <= mass && mass <= 27.8) return 'S';
	if (28 <= mass && mass <= 178) return 'M';
	if (212 <= mass && mass <= 5974) return 'L';
	if (11800 <= mass) return 'XL';
	return undefined;
}

function getRandom(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
