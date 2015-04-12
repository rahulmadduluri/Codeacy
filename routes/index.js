exports.user = require('./user');


exports.index = function(req, res, next) {
	res.render('index');
};