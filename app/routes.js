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

	app.get('/auction', function (req, res) {
		AuctionService.GetCurrentAuction({}, function (error, auction) {
			if (error) {
				return res.send(error);
			}
			res.json(auction || '');
		});
	});

	app.post('/createauction', function (req, res) {
		AuctionService.CreateAuction({
			username: "qiankunxie",
			quantity:10,
			product: "breads",
			minbid: 100
		}, function (error) {
			if (error) {
				return res.send(error);
			}
			res.send("Successful");
		});
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};
