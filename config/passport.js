var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;  //It's requiring the passport for our local database authentication.
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(function(username, password, done) { //This password is called from password.authenticate, from user routes.
  User.findOne({username: username}) //find the username in the model from where it's being called.
	.exec(function(err, user) {
		if(err) return done(err);
		if(!user) return done(err);
		if(!user.checkPassword(password)) return done(err);
    return done(null, user);
	});
}));
