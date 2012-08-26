
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
    title: 'Express',
    info: req.flash('info'),
    error: req.flash('error'),
  });
};
