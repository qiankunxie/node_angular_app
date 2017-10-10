var AuthService = require("../app/services/AuthService"),
    User = require("../app/models/User"),
    mongoose = require("mongoose"),
    db = require('../config/db');
mongoose.connect(db.url);

describe('User', function() {
  describe('#login()', function() {
    it('should login', function(done) {
        AuthService.AuthUser({username: 'qiankun'}, function (err, doc) {
            if (err) done(err);
            else done();
        });
    });
  });
});
