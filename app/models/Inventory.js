var mongoose = require('mongoose');

module.exports = mongoose.model('Inventory', {
	name : {type : String, default: ''},
	breads: {type: Number, default: 30},
    carrots: {type: Number, default: 18},
    diamond: {type: Number, default: 1}
});
