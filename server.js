var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var pagina;
var json = [];


app.get('/', function(req, res){
    if(req.query.page > 28 || req.query.page < 1 ){
        json = {error:"404",details:"Page not found (MIN = 1) (MAX = 28)"};
        res.send(json);
    }else{
        if(req.query.page > 0){
            pagina(req,res);
        }else {
            console.log("Più pagine");
            pagine(req,res);
        }
        
    }
})

//Funzione richiesta pagina singola
function pagina(req,res){
    pagina = 15*(req.query.page-1);
    urlSito = 'http://www.iis-silva-ricci.gov.it/documenti/cat_view/1-circolari.html'+'?start='+pagina;
        request(urlSito, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
                var json =[]; 
                    $('.dm_row').each(function(){
                        var data = $(this);
                        var titolo = data.children().first().text();
                        var href = data.children().first().children().get(1).attribs['href'];
                            titolo = titolo.replace(/(\r\n\t|\n|\r\t|\t)/gm,"");
                            json.push({title: titolo,url: "http://www.iis-silva-ricci.gov.it"+href});
                    });
            
            }
            console.log("Pagina caricata");
            
    res.send(json)
    }) ;
}

//Funzione più pagine
function pagine(req,res){
    for(var ct=0;ct<=15*(req.query.end-1);ct+=15){
        urlSito = 'http://www.iis-silva-ricci.gov.it/documenti/cat_view/1-circolari.html'+'?start='+ct;
        console.log(urlSito);
        
        request(urlSito, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html); 
                    $('.dm_row').each(function(){
                        var data = $(this);
                        var titolo = data.children().first().text();
                        var href = data.children().first().children().get(1).attribs['href'];
                            titolo = titolo.replace(/(\r\n\t|\n|\r\t|\t)/gm,"");
                            json.push({title: titolo,url: "http://www.iis-silva-ricci.gov.it"+href});
                    });
            } 
    }) ;
    }
    setTimeout(send, 1500, res);
    
}

function send(res){
    res.send(json);
    json = [];
}

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
exports = module.exports = app;