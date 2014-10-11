
var mongoose = require('mongoose');

var ScaleSchema = new mongoose.Schema({
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

ScaleSchema.statics.add = function (fields, callback) {
  var scale = new ScaleModel(fields);
  scale.save(callback);
};

mongoose.model('scale', ScaleSchema);
var ScaleModel = mongoose.model('scale');
module.exports = ScaleModel;