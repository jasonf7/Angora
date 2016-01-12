var express = require('express');
var router = express.Router();

var User = require('../models/user');

// Test api
router.get('/', function(req, res) {
    User.find({}, function(err, users) {
        users.forEach(function(user) {
            console.log(user);
        });
        res.send('test');
    });
});

router.post('/login/google', function(req, res) {

    var googleUser = {
        name : req.body.name,
        profileImage : req.body.profileImage,
        googleID : req.body.id,
        fbID : undefined,
        haircuts : []
    };

    User.findOneAndUpdate({googleID: req.body.id}, googleUser, {upsert: true}, function(err){
        if (err) return res.send(500, { error: err });
        return res.json(googleUser);
    });
});

router.post('/login/fb', function(req, res) {

    var fbUser = {
        name : req.body.name,
        profileImage : req.body.profileImage,
        googleID : undefined,
        fbID : req.body.id,
        haircuts : []
    };

    User.findOneAndUpdate({fbID: req.body.id}, fbUser, {upsert: true}, function(err){
        if (err) return res.send(500, { error: err });
        return res.json(fbUser);
    });
});

module.exports = router;