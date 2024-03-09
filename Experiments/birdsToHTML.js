const sqlite3 = require('sqlite3').verbose();
const monthQueries = {
	'January' : `LIKE '1,%' OR LIKE '% 1,%`,
	'February':  `LIKE '%2,%`,
	'March' : `LIKE '%3%'`,
  'April' : `LIKE '%4%'`,
  'May' : `LIKE '%5%'`,
  'June': `LIKE '%6%'`,
  'July': `LIKE '%7%'`,
  'August': `LIKE '%8%`,
	'September': `LIKE '%9%'`,
	'October': `LIKE '%10%'`,
	'November': `LIKE '%11%'`,
	'December': `LIKE '%12%'`
};
const query = `
SELECT bird.id, bird.common_name, bird.scientific_name, bird.body_mass_grams, br.value as presence 
FROM birds as bird, bird_records as br 
WHERE br.bird_id = bird.id 
  AND br.source='Baggs'
  AND br.key='Presence';
  `;

function birdPresenceRecord(month, bird_id, migratory_status){
	this.month = month;
	this.bird_id = bird_id;
	this.migratory_status = migratory_status;
}
let birds_by_month = {};
let all_birds = {};

function savePresenceData(bird){

	let range = bird.presence.split(';');
	for (let i = 0; i < range.length; i++){
		for (const month of range[i].split(',') ){
			let migratory_status = 'present';
			if (i == 0){ 
				migratory_status = 'arriving';
			 }
			 if (i == (range.length - 1)){
			 	migratory_status = 'departing';
			 }

			let bpr = birdPresenceRecord(month, bird.id, migratory_status);
			if (birds_by_month[month]){
					birds_by_month[month].push(bpr);
			} else {
				birds_by_month[month] = new Array(bpr);
			}
		  
		}
	}
}

function Bird(query_row){
	/*
	 *. id, common_name, scientific_name, body_mass_grams, presence
	 */
	for (const [key, value] of Object.entries(query_row)){
	    this[key] = value;
	  }
	}
	  


let db = new sqlite3.Database('./Data/birds_3.sqlite', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('============ Connect ============');
});


db.serialize(() => {
  db.each(query, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    // each row 
    let bird = new Bird(row);
    all_birds[bird.id] = bird;
    savePresenceData(bird);
    console.log(JSON.stringify(bird));


    //console.log(poem.toHTML());
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  //console.log(JSON.stringify(birds_by_month));
  console.log('=========== Close ===============');
});

function htmlBird(query_row){
	/*
	 *. id, common_name, scientific_name, body_mass_grams, appearance, arrival, migratoryStatus
	 */
	for (const [key, value] of Object.entries(query_row)){
	    this[key] = value;
	  }
	this.id = bird.id;
	this.name = bird['name'];
	this.bodymass = bird.bodymass;
	this.appearance = bird.appearance;
	this.migratory_status = bird.arrival == null ? "resident" : 
									(bird.migratoryStatus == null ? "present" : bird.migratoryStatus);
	this.size = getSizeForMass(this.bodymass);

	// Calculate the x and y coords based on migration (top) arriving/departing (left/right) and resident (bottom)
	switch (this.migratory_status){
	case 'arriving':
		this.x = getRandom(5, 48);
		this.y = getRandom(5, 30);
		break;
	case 'departing':
		this.x = getRandom(52, 95);
		this.y = getRandom(5, 30);
		break;
	case 'resident':
		this.x = getRandom(20, 80);
		this.y = getRandom(45, 90);
		break;
	default:
		this.x = getRandom(20, 80);
		this.y = getRandom(45, 90);
	}

	this.toHTML = function(){
		return `
		<div class="bird-data tooltip appearance-${this.appearance}" 
		  id=${this.id} style="top: ${this.y}vh; left: ${this.x}vw">
		  <span class="marker size-${this.size}">V</span>
		  <div class="bird-data tooltiptext">
		    <div class="tooltiptext-line">${this.name}</div>
		    <div class="tooltiptext-line">Avg Bodymass: ${this.bodymass}</div>
		    <div class="tooltiptext-line">Migratory Status: ${this.migratory_status}</div>
		  </div>
		</div>
		`;
	}

}
/* Helpers */

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

