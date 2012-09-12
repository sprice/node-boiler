var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../models/user');

// Setup Passport authentication
passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Unknown username or password' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Unknown username or password' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findOne(id, function (err, user) {
    done(err, user);
  });
});

module.exports = function (app) {
  // Login user
  app.post(
    '/sessions',
    passport.authenticate('local', {
      failureRedirect: '/',
      failureFlash: true
    }),
    function (req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` property contains the authenticated user.
      req.session.user = req.user;
      res.redirect('/');
    }
  );

  app.get('/logout', function (req, res) {
    req.logOut();
    req.session.regenerate(function (err) {
      res.redirect('/');
    });
  });
};
