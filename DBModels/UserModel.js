const mongoose = require('mongoose');

var UserModel = new mongoose.Schema({
    name:String,
    userName:{type: String, unique : true, required : true},
    is_creator:{type: Boolean, default: false},
    is_viewer:{type: Boolean, default: false},
    is_viewAll:{type: Boolean, default: false}
})
module.exports = new mongoose.model("Users",UserModel)