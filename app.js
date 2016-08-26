var express = require('express');

var app = express();

app.use(express.static(__dirname));

app.listen(10002, function () {
    console.log('Slider example listening to port 10002!');
});