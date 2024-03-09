const sqlite3 = require('sqlite3').verbose();

let season = 'winter';
let sent = 1;
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
AND sent IS ${sent}
ORDER BY franklin_id;`;


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

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function PoemMS(query_row){
  
  this.franklin_id = query_row.franklin_id;
  this.name = query_row.name;
  this.circulation = query_row.sent == 0 ? "retained" : "sent";
  this.recipient = query_row.recipient;
  this.x = getRandomIntInclusive(15,85);
  this.y = getRandomIntInclusive(5, 45);
  this.toHTML = function(){
    return `
    <div style="top: ${this.y}vh; left: ${this.x}vw" class="tooltip poem-ms circulation-${this.circulation}">[+]
      <span class="tooltiptext poem-ms-data">
        <div class="tooltiptext-line">${this.franklin_id}</div>
        <div>"${this.name}"</div>
        <div class="tooltiptext-line">Sent to ${this.recipient}</div>
      </span>
    </div>
    `;
  }
}