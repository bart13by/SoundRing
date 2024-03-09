const sqlite3 = require('sqlite3').verbose();

let season = 'winter';
let query = `
SELECT franklin_id, ms.name AS name, season, 
  (circ.id IS NOT NULL) AS sent,
  people.name AS recipient
FROM manuscripts AS ms 
LEFT JOIN manuscript_circulations AS circ 
     ON circ.manuscript_id=ms.id 
LEFT JOIN people 
     ON people.id=circ.person_id
WHERE ms.season IS '${season}' 

ORDER BY franklin_id;`;
//AND sent IS ${sent}

// open the database file
let db = new sqlite3.Database('./Data/birds_3.sqlite', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the bird database.');
});


db.serialize(() => {
  db.each(query, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    // each row 
    let poem = new PoemMS(row);
    console.log(poem.toHTML());
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});

function getRandom(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function PoemMS(query_row){
  /*
   * franklin_id, name, season, sent, recipient
   */
  for (const [key, value] of Object.entries(query_row)){
    this[key] = value;
  }
  
  this.circulation = query_row.sent == 0 ? "retained" : "sent";
  

  if (this.circulation == "sent"){
    this.x = getRandom(15,85);
    let expr = Math.abs(50 - this.x);
    if (expr <= 15) { this.y = getRandom(5, 25) }
    else if (expr <= 30) { this.y = getRandom(5, 30) }
    else { this.y = getRandom(5, 45) }
    
  }else{
    this.x = getRandom(25,75);
    let expr = Math.abs(50 - this.x);
    if (expr <= 15) { this.y = getRandom(75, 90) }
    else if (expr <= 30) { this.y = getRandom(70, 90) }
    else { this.y = getRandom(50, 90) }
    
  }
  
  this.toHTML = function(){
    let ret = `
    <div style="top: ${this.y}vh; left: ${this.x}vw" class="tooltip poem-ms circulation-${this.circulation}">
      <span class="marker">+</span>
        <div class="tooltiptext poem-ms-data">
        <div class="tooltiptext-line">${this.franklin_id}</div>
        <div class="tooltiptext-line">"${this.name}"</div>`;
        if (this.recipient != null){
          ret += `<div class="tooltiptext-line">Sent to ${this.recipient}</div>`;
        }
        ret += `
      </div>
    </div>`;
    return ret;
    
  }
}