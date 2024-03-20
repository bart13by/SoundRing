// poemsToJson.js
const sqlite3 = require('sqlite3').verbose();
const fs = require('node:fs');

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
let db = new sqlite3.Database('../Data/birds_3.sqlite', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the bird database.');
});

let poems = [];

db.serialize(() => {
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    
    console.log(JSON.stringify(rows));
	fs.writeFile('./Poems.json', JSON.stringify(rows), err => {
		if (err) console.error(err);
	});
    

  });

});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});



function PoemMS(query_row){
  /*
   * franklin_id, name, season, sent, recipient
   */
  for (const [key, value] of Object.entries(query_row)){
    this[key] = value;
  }
  
  this.circulation = query_row.sent == 0 ? "retained" : "sent";
  
  }
