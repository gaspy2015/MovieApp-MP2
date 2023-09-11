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

app.get('/login', (req, res) => {
    res.render('login', {title: 'Log In'});
});



app.listen(process.env.PORT, () => {
    console.log(`The server is listening at http://${process.env.HOSTNAME}:${process.env.PORT}`);
});