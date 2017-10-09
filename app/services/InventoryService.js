var Inventory = require("../models/Inventory");

function InventoryService() {
    var self = this;
    this.GetMyInventory = function (params, callback) {
        if (!params.username) {
            callback("Need username!");
        }
        Inventory.findOne({name: params.username}, function (error, inventory) {
			if (error || !inventory) {
				return callback(error || 'No inventory found');
			}
			callback(null, inventory);
		});
    };

    this.ChangeInventory = function (params, callback) {
        self.GetMyInventory(params, function (error, inventory) {
            if (error) {
                return callback(error);
            }
            inventory.breads += params.deltaBreads || 0;
            inventory.carrots += params.deltaCarrotss || 0;
            inventory.diamond += params.deltaDiamond || 0;
            inventory.save(function (error) {
                if (error) {
                    retun callback(error);
                }
                callback(inventory);
            });
        });
    }
}

module.exports = new InventoryService();
