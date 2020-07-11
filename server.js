const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.get('/projects', (req, res) => {
    res.redirect('/library');
});

app.get('/work', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/work.html'));
});

app.get('/tagpro', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/tagpro.html'));
});

app.get('/library', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/library.html'));
});

app.get('/fun', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/fun.html'));
});

app.get('/cluedo', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/cluedo.html'));
});

app.get('/img/*', (req, res) => {
  console.log("image hit");
});

app.get('*', (req, res) => {
  console.log("404 hit");
  res.sendFile(path.join(__dirname+'/views/404.html'));
});

app.listen(3000, () => {
    console.log('running running');
});