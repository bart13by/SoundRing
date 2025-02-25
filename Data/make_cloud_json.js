//make_cloud_json.js

const csv = require('csv-parser')
const fs = require('fs')
const records = {};
let month_header;
const c_map = {
	//St = stratus; N = Nimbus; Ci = Cirrus; Cu = Cumulous
	'st': 'stratus',
	'nim': 'nimbus',
	'cir': 'cirrus',
	'cu' : 'cumulus',
	'CLOUDLESS' : 'none'
}

fs.createReadStream('cloud_data.csv')
  .pipe(csv())
  .on('headers', (headers) => month_header = headers[0])
  .on('data', (data) => processRow(data))
  .on('end', () => {
    console.log(JSON.stringify(records));
  });

 function processRow(data){
	const month = data[month_header];
  	delete data[month_header]; // remove the extraneous month record\
  	const temp = {};
  	for (const key in data){
  		try {
	  		temp[key] = c_map[data[key]];	
  		}
  		catch (ReferenceError){
  			console.error(`No such thingy: ${data[key]}`);
  			continue;
  		}
  		
  	}
  	records[month] = new Object(temp);
 }