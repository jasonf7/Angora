/**
 * Created by jasonf7 on 09/01/16.
 */

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('main', {title : 'Angora boys'});
    })
};