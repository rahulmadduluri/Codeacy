//get login
exports.login = function(req, res, next) {
	res.render('login');
}

//redirect to main page for logout
exports.logout = function(req, res, next) {
	res.redirect('/');
}

//authenticate user
exports.authenticate = function(req, res, next) {
	res.redirect('/admin');
};