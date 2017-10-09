var Auction = require("../models/Auction");

function AuctionService() {
    var self = this;
    this.GetCurrentAuction = function (params, callback) {
        Auction.findOne({status: 'Active'}, function (error, auction) {
			if (error) {
				return callback(error);
			}
			callback(null, auction);
		});
    };

/**
 * [CreateAuction description]
 * @param {Object}   params   requires: {username: "", quantity:"", product: "", minbid: ""}
 * @param {Function} callback [description]
 */
    this.CreateAuction = function  (params, callback) {
        Auction.findOne({status: 'Active'}, function (error, auction) {
			if (error) {
				return callback(error);
			}
			if (auction) {
                return callback("There is a running auction, you can create after this auction finsished");
            }
            auction = new Auction({
                sellername: params.username,
                quantity: params.quantity,
                product: params.product,
                minbid: params.minbid
            });
            auction.save(function (error) {
                if (error) {
                    return callback(error);
                }
                callback(null, auction);
            });
		});
    };
}

module.exports = new AuctionService();
