
var Interval = require('./../models').Interval;

/* Add interval
============================= */
module.exports.add = function (req, res, next) {
  Interval.add(req.body, function (err, interval) {
    if (err) return next(err);
    res.send(200, interval);
  });
};

/* Return all intervals
============================= */
module.exports.all = function (req, res) {
  Interval.find(null, null, {sort : {'order' : 1}}, function (err, intervals) {
    if (err) res.send(err);
    res.send(200, intervals);
  });
};

/* Update me a interval
============================= */
module.exports.update = function (req, res, next) {
  Interval.findOne({ name : req.interval.id }, function (err, interval) {
    if (err) res.send(err);
    for(var key in req.body) {
      interval[key] = req.body[key];
    }
    interval.save(function (err, interval) {
      if (err) res.send(err);
      res.send(200, interval);
    });
  });
};

/* Delete interval
============================= */
module.exports.delete = function (req, res, next) {
  Interval.findOne({ _id : req.body._id }, function (err, interval) {
    Interval.findByIdAndRemove(interval.id, function (err) {
      if (err) res.send(err);
      res.send(200, interval);
    });
  });
};