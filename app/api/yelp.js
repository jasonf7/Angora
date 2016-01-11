var oauthSignature = require('oauth-signature');
var nonce = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');

var YelpAPI = {};
YelpAPI.searchRequest = function(set_parameters, callback) {
    var httpMethod = 'GET';
    var url = 'http://api.yelp.com/v2/search';
    var default_parameters = {
        location: 'San+Francisco',
        category_filter: 'hair',
        offset: '0',
        sort: '1'
    };
    var required_parameters = {
        oauth_consumer_key : process.env.oauth_consumer_key,
        oauth_token : process.env.oauth_token,
        oauth_nonce : nonce(),
        oauth_timestamp : nonce().toString().substr(0,10),
        oauth_signature_method : 'HMAC-SHA1',
        oauth_version : '1.0'
    };
    var parameters = _.assign(default_parameters, set_parameters, required_parameters);

    var consumerSecret = process.env.consumerSecret;
    var tokenSecret = process.env.tokenSecret;

    var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

    parameters.oauth_signature = signature;

    var paramURL = qs.stringify(parameters);

    var apiURL = url+'?'+paramURL;

    request(apiURL, function(error, response, body){
        return callback(error, response, body);
    });
};

module.exports = YelpAPI;
