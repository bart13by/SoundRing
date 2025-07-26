const fetchUrl = `https://dickinsonsbirds.org/project/digital-object/birdring/fetch`;
const fs = require('node:fs');

var jsonData;
const resp = fetch(fetchUrl)
.then(response => {
	  if (!response.ok) {
	    throw new Error('Network response was not ok');
	  }
	  return response.json();
	})
.then(data => {
	fs.writeFile('./Birds.json', JSON.stringify(data), err => {
		if (err) console.error(err);
		})	
	})
.catch(error => {
	  console.error('Error:', error);
});

