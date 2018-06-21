var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/', function(req, res){

urlSito = 'http://www.iis-silva-ricci.gov.it/documenti/cat_view/1-circolari.html';

request(urlSito, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);
        var json =[]; 
        var ct=0;
        $('.dm_row').each(function(i,elem){
            var data = $(this);
            var titolo = data.children().first().text();
            var href = data.children().first().children().get(1).attribs['href'];
            json.push({title: titolo,url: "http://www.iis-silva-ricci.gov.it"+href});
            ct++;
        });
    
}

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('Scritto il file json');

})

res.send('Scritto il file json')

    }) ;
})

app.listen('8081')
console.log('Porta 8081');
exports = module.exports = app;