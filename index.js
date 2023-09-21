// to import dependencies
const express = require("express");
require("dotenv").config();
const ejs = require("ejs");
const bodyParser = require('body-parser');
const session = require("express-session");
const {v4: uuidv4 } = require('uuid');

//express app
const app = express();

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false}
}));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({extended:false}));

const routes = require("./routes/univRoutes");

app.use("/", routes);

app.listen(process.env.PORT, () => {
    console.log(`The server is listening at http://${process.env.HOSTNAME}:${process.env.PORT}`);
})