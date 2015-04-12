var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
	fb: {
		id: String,
		access_token: String,
		firstName: String,
		lastName: String,
		email: String
	}
});

module.exports = mongoose.model('User', userSchema);