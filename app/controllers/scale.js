
var Scale = require('./../models').Scale;

/* Add scale
============================= */
module.exports.add = function (req, res, next) {
  Scale.add(req.body, function (err, scale) {
    if (err) return next(err);
    res.send(200);
  });
};

/* Return all scales
============================= */
module.exports.all = function (req, res) {
  Scale.find(null, null, {sort : {'order' : 1}}, function (err, scales) {
    if (err) res.send(err);
    res.send(200, scales);
  });
};

/* Update me a scale
============================= */
module.exports.update = function (req, res, next) {
  Scale.findOne({ name : req.scale.id }, function (err, scale) {
    if (err) res.send(err);
    for(var key in req.body) {
      scale[key] = req.body[key];
    }
    scale.save(function (err, scale) {
      if (err) res.send(err);
      res.send(200, scale);
    });
  });
};

/* Delete scale
============================= */
module.exports.delete = function (req, res, next) {
  Scale.findOne({ _id : req.body._id }, function (err, scale) {
    Scale.findByIdAndRemove(scale.id, function (err) {
      if (err) res.send(err);
      res.send(200, {message : 'Deleted'});
    });
  });
};