var User = require("../models/User"),
    Inventory = require("../models/Inventory");

function AuthService() {

    this.AuthUser = function (params, callback) {
        if (!params.username) {
            callback("Need username!");
        }
        User.findOne({name: username}, function (error, user) {
			if (error) {
				return callback(error);
			}
			callback(null, user);
		});
    };

    this.CreateUser = function (params, callback) {
        if (!params.username) {
            callback("Need username!");
        }
        var user = new User({
                name: params.username
            }),
            inventory = new Inventory({
                name: params.username
            });

        user.save(function (error) {
            if (error) {
                return callback(error);
            }
            inventory.save(function (error) {
                if (error) {
                    return callback(error);
                }
                callback(user);
            });
        });
    };
}

module.exports = new AuthService();
