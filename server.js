var express = require('express');
var engine  = require('ejs-locals');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var http    = require('http');
var path    = require('path');
var router  = express.Router();

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(router);
app.use(function(req, res, next) {
    res.header('X-XSS-Protection', 0);
    next();
});


app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://www.imdb.com/title/tt0944947/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

      $('.title_wrapper').filter(function(){
        var data = $(this);
        console.log(data);
        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.title = title;
        json.release = release;
      })

      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send(JSON.stringify(json, null, 4))
  })
});

app.get('/', function(req, res){
  // res.sendFile(path.join(__dirname+'/index.html'));
  res.render('index', { title: 'Home' });
});

// URL not found
app.get('/*', function(req, res, next){
  // res.sendFile(path.join(__dirname+'/404.html'));
  res.render('error', { title: '404 - Page not found' });
});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
