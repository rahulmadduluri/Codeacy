exports.user = require('./user');


exports.index = function(req, res, next) {
	//check for authenticated -- if so load game
	if (req.user && req.isAuthenticated()) {
		res.render('game', { user: req.user});
	}
	else {
		res.render('index');
	}
};