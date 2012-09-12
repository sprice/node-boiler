module.exports = function (app) {
  app.post('/sessions', function (req, res) {
    if (('user' === req.body.user) && ('pass' === req.body.password)) {
      req.session.currentUser = req.body.user;
      req.flash('info', 'Hi ' + req.session.currentUser + '.');
      res.redirect('/');
      return;
    }
    req.flash('error', 'Those credentials were incorrect. Please login again.');
    res.redirect('/');
  });

  app.del('/sessions', function (req, res) {
    req.session.regenerate(function (err) {
      res.redirect('/');
    });
  });

  app.get('/logout', function (req, res) {
    req.session.regenerate(function (err) {
      res.redirect('/');
    });
  });
};
