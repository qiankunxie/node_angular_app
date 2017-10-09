// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Inventory', {
	name : {type : String, default: ''},
	breads: {type: Number, default: 30},
    carrots: {type: Number, default: 18},
    diamond: {type: Number, default: 1}
});
