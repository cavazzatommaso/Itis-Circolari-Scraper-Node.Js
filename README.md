# Itis Circolari Scraper

## Description:
This software was developed in Node Js and allows the printing of a json file containing the title and url of the 
circulars obtained from the site: http://www.iis-silva-ricci.gov.it/documenti/cat_view/1-circolari.html 

## How it work?
Is a simple scraper created with Cheerio Module. After loading the website, we search for each one element using the class ".dm_row"
after doing it the program push into an arrey the variable.

```sh
$('.dm_row').each(function(i,elem){
            var data = $(this);
            var titolo = data.children().first().text();
            var href = data.children().first().children().get(1).attribs['href'];
            //Delete from the title \n or \t
            titolo = titolo.replace(/(\r\n\t|\n|\r\t|\t)/gm,"");
            json.push({title: titolo,url: "http://www.iis-silva-ricci.gov.it"+href});
            ct++;
        });
```

You can use and see this from [![Heroku](https://www.herokucdn.com/deploy/button.png)](https://itiscircolari.herokuapp.com/)

## Use it
You are free to use this, all you have to do is an http.get request.
### For the first page:
```sh
https://itiscircolari.herokuapp.com/
//this will return the content for default page (1)
```
### For Other page:
```sh
https://itiscircolari.herokuapp.com/?page=3
//this will return the content for page 3
//just change the number for other result
```

### Error:
```sh
//The Json if would happen some error is:
[{error:"404", details:"Page not found (MIN = 1) (MAX = 28)}]
//For fix this just pay attention to ne number of page
```

### :memo: To Do:
- request for more pages
