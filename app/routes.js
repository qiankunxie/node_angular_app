var AuthService = require("./services/AuthService"),
	InventoryService = require("./services/InventoryService"),
	AuctionService = require("./services/AuctionService");

module.exports = function(app) {

	app.post('/login', function (req, res) {
		AuthService.AuthUser({
			username: req.body.username
		}, function (error, user) {
			if (error) {
				return res.send(error);
			}
			if (user) {
				res.json(user);
			} else {
				AuthService.CreateUser({
					username: req.body.username
				}, function (error, user) {
					if (error) {
						return res.send(error);
					}
					res.json(user);
				});
			}
		});
	});

	app.get('/inventory', function (req, res) {
		InventoryService.GetMyInventory({
			username: req.query.username
		}, function (error, inventory) {
			if (error) {
				return res.send(error);
			}
			res.json(inventory);
		});
	});

	app.post('/createAuction', function (req, res) {

	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};
