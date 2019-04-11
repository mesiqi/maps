'use strict'
var topojson = require('topojson');
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'kommuner_med_hav.topojson');


fs.readFile(filePath, 'utf8', function (err, data) {

  var norge = JSON.parse(data);

  var kommuner = topojson.feature(norge, norge.objects.kommuner_med_hav);
  var neighbors = topojson.neighbors(norge.objects.kommuner_med_hav.geometries);

  var csv = 'nr, navn, naboer\r\n';

  kommuner.features.forEach(function(county, i) {
    county.neighbors = neighbors[i].map(function(j) { return kommuner.features[j].properties.nr; })
    csv += county.properties.nr + ',' + county.properties.name +',' + county.neighbors.join("|")  + '\r\n';
  });

  //skriv ut en csv-liste med kommunenummer, kommunenavn og en pipe (|)-separert liste over kommunenummer til nabokommuner.
  console.log(csv);

});