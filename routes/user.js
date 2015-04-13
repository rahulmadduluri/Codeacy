//redirect to main page for logout
exports.logout = function(req, res, next) {
	req.logout();
	res.redirect('/');
}

exports.admin = function(req, res, next) {
	res.render('admin', { user: req.user});
};