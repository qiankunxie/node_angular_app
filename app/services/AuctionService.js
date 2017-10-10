var Auction = require("../models/Auction"),
    User = require("../models/User"),
    Inventory = require("../models/Inventory"),
    InventoryService = require('./InventoryService'),
    SocketService = require('./SocketService');

function AuctionService() {
    var self = this;

    function fullfileAuction() {
        Auction.findOne({status: 'Active'}, function (error, auction) {
            if (error || !auction) {
                return;
            }
            if (auction.finishdate > Date.now()) {
                return;
            }
            Auction.update({status: 'Active'}, {$set: {status: "Closed"}}, function (error) {
                if (error) {
                    return;
                }
                if (!auction.winnername) {
                    auction.status = "Closed"
                    SocketService.FinishAuction(auction);
                    return;
                }
                // update coins
                var sellerName = auction.sellername,
                    buyerName = auction.winnername;
                User.update({
                    name: buyerName
                }, {
                    $inc: { coins: -auction.winnerbid }
                }, function (error) {
                    User.update({
                        name: sellerName
                    }, {
                        $inc: { coins: auction.winnerbid }
                    }, function () {
                        var params = {
                            username: sellerName
                        };
                        params["delta" + auction.product] = -auction.quantity;
                        InventoryService.ChangeInventory(params, function () {
                            var params = {
                                username: buyerName
                            };
                            params["delta" + auction.product] = auction.quantity;
                            InventoryService.ChangeInventory(params, function () {
                                auction.status = "Closed"
                                SocketService.FinishAuction(auction);
                            });
                        });
                    })
                });
            });
        });
    }

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
                minbid: params.minbid,
                finishdate: Date.now() + 20 * 1000
            });
            auction.save(function (error) {
                if (error) {
                    return callback(error);
                }
                SocketService.UpdateAuction(auction);
                setTimeout(function () {
                    fullfileAuction();
                }, 20 * 1000 + 10);
                callback(null, auction);
            });
		});
    };

    this.BidAuction = function (params, callback) {
        var updateFinishDate = false;
        Auction.findOne({status: 'Active'}, function (error, auction) {
			if (error) {
				return callback(error);
			}
            if (!params.username || params.bid < auction.winnerbid) {
                return callback("Bid amount should larger then winner bid");
            }
            auction.winnerbid = params.bid;
            auction.winnername = params.username;
            if (auction.finishdate - Date.now() < 10 * 1000) {
                updateFinishDate = true;
                auction.finishdate = Date.now() + 10 * 1000;
            }
            auction.save(function () {
                if (updateFinishDate) {
                    setTimeout(function () {
                        fullfileAuction();
                    }, 10 * 1000 + 10);
                }
                SocketService.UpdateAuction(auction);
                callback();
            })
        });
    }

    this.ClearAuction = function () {
        Auction.update({}, {$set: {status: 'Closed'}}, {multi: true}, function (error) {
            console.log("clear old auctions");
        });
    }
}

module.exports = new AuctionService();
