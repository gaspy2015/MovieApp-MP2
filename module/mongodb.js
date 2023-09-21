const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogInSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const collection = new mongoose.model("UserCollection", LogInSchema)

module.exports = collection;