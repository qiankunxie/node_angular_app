var mongoose = require('mongoose'),
    statusEnum = {
        Active: 0,
        Expired: 0,
        Closed: 0
    },
    productEnum = {
        breads: 0,
        carrots: 0,
        diamond: 0
    }

module.exports = mongoose.model('Auction', {
	sellername : {type : String, default: ''},
    quantity: {type: Number, default: 0},
    product: {type : String, enum: Object.keys(statusEnum)},
	minbid: {type: Number, default: 0},
    winnername: {type : String, default: ''},
    winnerbid: {type: Number, default: 0},
    status: {type: String, enum: Object.keys(statusEnum), default: 'Active'},
    finishdate: {type: Number}
});
