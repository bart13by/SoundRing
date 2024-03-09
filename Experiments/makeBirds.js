//makeBirds.js

const vWidth = 100;
const vHeight = 50;
const bmDiv = 500;
const fColor = {
	"Common": "#544B32",
	"Uncommon": "#847653",
	"Rare": "#D7D1C4"
}
const month = 'december';
const fetchUrl = `https://dickinsonsbirds.org/project/digital-object/birdring/fetch?chrono=${month}`;


const resp = fetch(fetchUrl)
.then(response => {
	  if (!response.ok) {
	    throw new Error('Network response was not ok');
	  }
	  return response.json();
	})
.then(jsonData => {
	makeBirds(jsonData);
})
.catch(error => {
	  console.error('Error:', error);
});

//const jBirds = resp.json;
let sBirds = [];
function makeBirds(jsonData){
	for (obj in jsonData){
		jBird = jsonData[obj];
		let bird = new htmlBird(jBird);
		//sBirds.append(bird);
		console.log(bird.toHTML());
		
	}	
}

function htmlBird(bird){
  /* May need to refactor to be a "monthBird"? */
	this.id = bird.id;
	this.name = bird['name'];
	this.scientificName = bird['scientificName'];
	this.bodymass = bird.bodymass;
	this.appearance = bird.appearance;
	
	// need to parse presence and make migratoryStatus "year-round" if present all nine months.

	this.migratory_status = bird.arrival == null ? "resident" : bird.migratoryStatus;
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
		  id=${this.id} style="top: ${this.y}vh; left: ${this.x}vw">V
		
		<div class="bird-data tooltiptext">
		  <div class="tooltiptext-line">
		    <span class="commonName">${this.name}</span>
		    <span class="scientificName">${this.scientificName}</span>

		  </div>
		  <div class="tooltiptext-line">Avg Bodymass: ${this.bodymass}</div>
		  <div class="tooltiptext-line">Migratory Status: ${this.migratory_status}</div>
		</div>
		</div>
		`;
	}

}

function svgBird(bird){

	this.id = bird.id;
	this.name = bird['name'];
	let radius = Math.max(.25, bird.bodymass / bmDiv);
	this.r = Math.min(2.0, radius);
	this.fill = fColor[bird.appearance];
	// Calculate the center X coord
	let rxShift = getRandomInt(vWidth/3 - 1);
	let ryShift = getRandomInt(vHeight/2 - 1);
	let xStart = 0;
	let yStart = 0;
	switch (bird.migratoryStatus){
		case 'arriving':
			xStart == this.r;
			break;
		case 'departing':
			xStart = ((vWidth / 3) * 2) - this.r;
			break;
		case null:
			xStart = vWidth / 3;
			break;
	}
	if (bird.arrival == null){
		yStart = (vHeight / 2) + this.r;
	} else {
		yStart = this.r + 1;
	}
	this.cx = xStart + rxShift;
	this.cy = yStart + ryShift; // Refactor to accomodate arch

	this.toSvg = function(){
		return `<circle class="bird" id=${this.id} r="${this.r}" fill="${this.fill}" cx="${this.cx}" cy="${this.cy}" />`;
	}

}
function getRandom(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}