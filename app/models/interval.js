
var mongoose = require('mongoose');

var IntervalSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  notes : {
    type : String
  },
  description: {
    type : String
  }
});

IntervalSchema.statics.add = function (fields, callback) {
  var interval = new IntervalModel(fields);
  interval.save(callback);
};

mongoose.model('interval', IntervalSchema);
var IntervalModel = mongoose.model('interval');
module.exports = IntervalModel;