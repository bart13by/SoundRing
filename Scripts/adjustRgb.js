//adjustRgb.js

function adjustRgb(base, hhmm){
	let [a,r,g,b,x] = base.split(/[(),]/);
	const increase_factor = .03;

	const adjust = ((strToMins(hhmm) - strToMins('09:18'))/60) * increase_factor;
	const calc = (c) => {
		return (c * (1 + adjust)).toFixed(3);
	};
	const red = calc(r);
	const green = calc(g);
	const blue = calc(b);
	return `rgb(${red},${green},${blue})`;
	
}

function strToMins(t) {
  var s = t.split(":");
  return Number(s[0]) * 60 + Number(s[1]);
}

colors = {
'DEC': 'rgb(214, 214, 232)',
'JAN': 'rgb(214, 214, 232)',
'FEB': 'rgb(214, 214, 232)',
'MAR': 'rgb(206, 224, 243)',
'APR': 'rgb(206, 224, 243)',
'MAY': 'rgb(254, 249, 229)',
'JUN': 'rgb(254, 249, 229)',
'JUL': 'rgb(251, 231, 217)', 
'AUG': 'rgb(251, 231, 217)',
'SEP': 'rgb(254, 249, 229)',
'OCT': 'rgb(228, 241, 237)',
'NOV': 'rgb(206, 224, 243)',
'FIN': 'rgb(214, 214, 232)',
}
times = {
'DEC': '09:18',
'JAN': '09:09',
'FEB': '10:00',
'MAR': '11:15',
'APR': '12:44',
'MAY': '14:05',
'JUN': '15:05',
'JUL': '15:13',
'AUG': '14:26',
'SEP': '13:08',
'OCT': '11:43',
'NOV': '10:19',
'FIN': '09:18'
}
pcts = {
'DEC': '0%',
'JAN': '8.3%',
'FEB': '16.6%',
'MAR': '25%',
'APR': '34.3%',
'MAY': '42.6%',
'JUN': '50%',
'JUL': '58.3%',
'AUG': '66.6%',
'SEP': '75%',
'OCT': '83.3%',
'NOV': '91.6%',
'FIN': '100%'
}


for (const mon of Object.keys(times)){
	const adjustedColor = adjustRgb(colors[mon], times[mon]);
	console.log(`${pcts[mon]} {fill:  ${adjustedColor}}`);

}
/*
DEC 9:18
JAN 9:09  +0
FEB 10:00 +1
MAR 11:15 +2
APR 12:44 +3.5
MAY 14:05 +5
JUN 15:05
JUL 15:13
AUG 14:26
SEP 13:08
OCT 11:43
NOV 10:19
    9:20
*/
/*
rgb(214, 214, 232)
Dec, Jan, Feb

rgb(206, 224, 243)
Mar, Apr, Nov

rgb(254, 249, 229)
May, Jun, Sep

rgb(251, 231, 217)
Jul, Aug		

rgb(228, 241, 237)
Oct
*/