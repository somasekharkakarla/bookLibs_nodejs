const mongoose = require('mongoose');

var BookModel = new mongoose.Schema({
    title:{type: String, unique : true, required : true},
    summary:String,
    createdBy:String,
    createdOn:{
        type: Date,
        default: Date.now
    }
})
module.exports = new mongoose.model("Books",BookModel)