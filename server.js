var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var pagine;

app.get('/', function(req, res){
    if(req.query.pag > 28 || req.query.pag < 1 ){
        json = {error:"404",details:"Page not found (MIN = 1) (MAX = 28)"};
        res.send(json);
    }else{
        pagine = 15*(req.query.pag-1);

urlSito = 'http://www.iis-silva-ricci.gov.it/documenti/cat_view/1-circolari.html'+'?start='+pagine;

request(urlSito, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);
        var json =[]; 
        var ct=0;
        $('.dm_row').each(function(i,elem){
            var data = $(this);
            var titolo = data.children().first().text();
            var href = data.children().first().children().get(1).attribs['href'];
            titolo = titolo.replace(/(\r\n\t|\n|\r\t|\t)/gm,"");
            json.push({title: titolo,url: "http://www.iis-silva-ricci.gov.it"+href});
            ct++;
        });
    
}

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('Scritto il file json');  

})

res.send(json)

    }) ;
    }
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
exports = module.exports = app;