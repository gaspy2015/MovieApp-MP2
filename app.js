const express = require('express');
require('dotenv').config();
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.render('login', {title: 'Log In'});
});

app.get('/login', (req, res) => {
    res.render('login', {title: 'Log In'});
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {title:'Dashboard', user:'Name', userRevenue: 'Php 10,000.00', allRevenue:'Php 100,000.00'}); //change revenue to var
});

app.get('/movieInfo', (req, res) => {
    res.render('movieInfo', {title:'Movie Info'});
});

app.listen(process.env.PORT, () => {
    console.log(`The server is listening at http://${process.env.HOSTNAME}:${process.env.PORT}`);
});