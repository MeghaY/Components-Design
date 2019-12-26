'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'src')));
app.set('views', __dirname + '/src/views');
app.engine('html', require('ejs').renderFile);


const flickrApiKey = "YOUR_API_KEY"; //replace this string with your flickr api key
app.get('/getPhotos', function(req, res) {

    const url = "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key="
        + flickrApiKey
        + "&gallery_id=72157695356899955&format=json&nojsoncallback=1";

    request.get(url, function (error, response, body) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        }

        let json = JSON.parse(body);
        res.status(201).send(json);
    });
});

app.get('/getProducts', function (req, res) {
    fs.readFile('products.json', (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).send(data);
    });
});

const port = 8000;
app.listen(port, function () {
    console.log('app listening to port: ', port);
});
