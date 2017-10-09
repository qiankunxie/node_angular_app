var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	name : {type : String, default: ''},
	coins: {type: Number, default: 1000}
});
