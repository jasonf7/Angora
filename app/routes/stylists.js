var express = require('express');
var router = express.Router();

var url = require('url');
var _ = require('lodash');
var Yelp = require('yelp');

var yelp = new Yelp({
    consumer_key: '4he8dUZYmwbAiTYat4wFlQ',
    consumer_secret: 'hmhE0IT3y3wsTQPQjbQ_3cDDBsY',
    token: 'ueU6Je8iKlI1clKwH6KCcsQzd946RrTw',
    token_secret: 'Y8NCamiusYCjWiUADvBX6OH6lHc'
});

router.get('/get', function(req, res) {
    var geocoord_param = [
        req.query.latitude,
        req.query.longitude
    ];

    if (req.query.accuracy !== undefined) {
        geocoord_param.push(req.query.accuracy);
    }

    if (req.query.altitude !== undefined) {
        geocoord_param.push(req.query.altitude);
    }

    if (req.query.altitudeAccuracy !== undefined) {
        geocoord_param.push(req.query.altitudeAccuracy);
    }

    var parameters = {
        ll: geocoord_param.join(),
        category_filter: 'hair',
        offset : '0',
        sort : '1'
    };

    yelp.search(parameters)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            console.error(err);
        });
});

module.exports = router;