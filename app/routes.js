var yelpAPI = require('./api/yelp.js');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('main', {title : 'Angora boys'});
    });
    app.get('/api/stylists/get'), function(req, res) {
        var location = {};
        if (req.data.location != null) {
            location = {'location': req.data.location};
        }
        yelpAPI.searchRequest(location, function(error, response, body) {
            res.json(response);
        });
    }
};