const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/blogFront'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+
        '/dist/blogFront/index.html'));}
);

app.listen(process.env.PORT || 3000);