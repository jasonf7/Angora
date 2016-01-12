var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : String,
    profileImage : String,
    googleID : String,
    fbID : String,
    haircuts : Array
});

var User = mongoose.model('User', userSchema);

module.exports = User;