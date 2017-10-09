module.exports = function(app) {

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

	app.post('/login', function (req, res) {
		var username = req.body.username,
			User = require("./models/User");
		if (!username) {
			return res.send('You need send your user name to server');
		}
		User.findOne({name: username}, function (error, user) {
			if (error) {
				return res.send("")
			}
			console.log(user);
			if (!user) {
				//register user
				user = new User({
					name: username
				});
				user.save(function (error) {
					res.send("dsadsadsa");
				});
			} else {
				res.send("dsadsadsa");
			}
		});
	});
};
