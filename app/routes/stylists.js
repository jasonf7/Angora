var express = require('express');
var router = express.Router();

var url = require('url');
var _ = require('lodash');
var Yelp = require('yelp');

var yelp = new Yelp({
    consumer_key: '4he8dUZYmwbAiTYat4wFlQ',
    consumer_secret: 'hmhE0IT3y3wsTQPQjbQ_3cDDBsY',
    token: 'ueU6Je8iKlI1clKwH6KCcsQzd946RrTw',
    token_secret: 'Y8NCamiusYCjWiUADvBX6OH6lHc',
});

var default_parameters = {
    location: 'San+Francisco',
    category_filter: 'hair',
    offset: '0',
    sort: '1'
};

router.get('/get', function(req, res) {
    var location = {};
    var query = url.parse(req.url, true).query;
    if (query.location != null) {
        location = {'location': query.location};
    }
    var parameters = _.assign(default_parameters, location);
    yelp.search(parameters)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            console.error(err);
        });
});

module.exports = router;