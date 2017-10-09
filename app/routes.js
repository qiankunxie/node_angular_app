var AuthService = require("./service/AuthService");

module.exports = function(app) {

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

	app.post('/login', function (req, res) {
		console.log(req)
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
};
